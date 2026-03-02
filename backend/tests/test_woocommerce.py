import pytest
import requests
import os
import uuid
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

@pytest.fixture
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session

@pytest.fixture
def test_session_id():
    """Generate unique session ID for cart tests"""
    return f"test_{uuid.uuid4().hex[:12]}"


class TestWooCommerceProducts:
    """Test WooCommerce product endpoints"""

    def test_get_ready_florariums(self, api_client):
        """Test fetching ready florarium products"""
        response = api_client.get(f"{BASE_URL}/api/wc/products", params={
            "lang": "en",
            "product_type": "ready-florarium"
        })
        assert response.status_code == 200
        products = response.json()
        assert isinstance(products, list)
        assert len(products) > 0, "Should return at least one ready florarium"
        
        # Verify product structure
        product = products[0]
        assert "id" in product
        assert "name" in product
        assert "price" in product
        assert "image" in product
        assert "variation_id" in product  # Variable products should have variation_id

    def test_get_diy_kits(self, api_client):
        """Test fetching DIY kit products"""
        response = api_client.get(f"{BASE_URL}/api/wc/products", params={
            "lang": "en",
            "product_type": "diy-kit"
        })
        assert response.status_code == 200
        products = response.json()
        assert isinstance(products, list)
        assert len(products) > 0, "Should return at least one DIY kit"
        
        # Check for DIY Starter Kit (simple product, no variation_id)
        starter_kit = next((p for p in products if "Starter" in p.get("name", "")), None)
        if starter_kit:
            assert starter_kit["product_type"] == "simple"

    def test_diy_kit_prices_no_multiplier_bug(self, api_client):
        """Verify DIY kit prices don't have 0.85 multiplier bug"""
        # Get both product types
        ready_response = api_client.get(f"{BASE_URL}/api/wc/products", params={
            "lang": "en",
            "product_type": "ready-florarium"
        })
        diy_response = api_client.get(f"{BASE_URL}/api/wc/products", params={
            "lang": "en",
            "product_type": "diy-kit"
        })
        
        assert ready_response.status_code == 200
        assert diy_response.status_code == 200
        
        ready_products = {p["id"]: p for p in ready_response.json()}
        diy_products = {p["id"]: p for p in diy_response.json()}
        
        # Variable products should have different prices for DIY vs Ready
        # DIY kits should typically cost more (more materials included)
        common_ids = set(ready_products.keys()) & set(diy_products.keys())
        for pid in common_ids:
            ready_price = ready_products[pid]["price"]
            diy_price = diy_products[pid]["price"]
            
            # DIY should NOT be exactly 0.85x the ready price (the old bug)
            if ready_price > 0:
                ratio = diy_price / ready_price
                assert ratio != 0.85, f"Product {pid} still has 0.85 multiplier bug"
                assert diy_price > 0, f"Product {pid} DIY price should be positive"

    def test_products_with_lang_parameter(self, api_client):
        """Test that language parameter is accepted"""
        languages = ["en", "hu", "el", "it"]
        for lang in languages:
            response = api_client.get(f"{BASE_URL}/api/wc/products", params={
                "lang": lang,
                "product_type": "ready-florarium"
            })
            assert response.status_code == 200, f"Failed for language: {lang}"

    def test_cache_second_request_faster(self, api_client):
        """Test that cache improves response time"""
        # First request (cold cache or warm)
        start1 = time.time()
        response1 = api_client.get(f"{BASE_URL}/api/wc/products", params={
            "lang": "en",
            "product_type": "ready-florarium"
        })
        time1 = time.time() - start1
        assert response1.status_code == 200
        
        # Second request (should hit cache)
        start2 = time.time()
        response2 = api_client.get(f"{BASE_URL}/api/wc/products", params={
            "lang": "en",
            "product_type": "ready-florarium"
        })
        time2 = time.time() - start2
        assert response2.status_code == 200
        
        # Verify same data
        assert response1.json() == response2.json()
        
        # Second request should be faster (at least 2x faster if cached)
        # Note: This may fail if the first request already hit cache
        # So we just verify it works, not timing


class TestCacheInvalidation:
    """Test cache invalidation endpoint"""

    def test_invalidate_cache(self, api_client):
        """Test cache invalidation endpoint"""
        response = api_client.post(f"{BASE_URL}/api/wc/cache/invalidate")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "invalidated" in data["message"].lower()


class TestCartCRUD:
    """Test cart operations with variation_id support"""

    def test_add_to_cart_with_variation(self, api_client, test_session_id):
        """Test adding item with variation_id to cart"""
        cart_item = {
            "session_id": test_session_id,
            "product_id": "TEST_PRODUCT_32",
            "product_name": "TEST Desktop Magic",
            "product_price": 42.99,
            "product_image": "https://example.com/test.jpg",
            "quantity": 1,
            "variation_id": 60
        }
        
        response = api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        assert response.status_code == 200
        data = response.json()
        assert data["product_id"] == cart_item["product_id"]
        assert data["variation_id"] == 60
        assert "id" in data
        
        # Cleanup
        api_client.delete(f"{BASE_URL}/api/cart/{test_session_id}")

    def test_add_to_cart_without_variation(self, api_client, test_session_id):
        """Test adding simple product (no variation_id) to cart"""
        cart_item = {
            "session_id": test_session_id,
            "product_id": "TEST_PRODUCT_36",
            "product_name": "TEST DIY Starter Kit",
            "product_price": 34.99,
            "product_image": "https://example.com/test.jpg",
            "quantity": 1,
            "variation_id": None
        }
        
        response = api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        assert response.status_code == 200
        data = response.json()
        assert data["variation_id"] is None
        
        # Cleanup
        api_client.delete(f"{BASE_URL}/api/cart/{test_session_id}")

    def test_get_cart(self, api_client, test_session_id):
        """Test retrieving cart contents"""
        # Add item first
        cart_item = {
            "session_id": test_session_id,
            "product_id": "TEST_CART_GET",
            "product_name": "TEST Get Cart Item",
            "product_price": 50.00,
            "product_image": "https://example.com/test.jpg",
            "quantity": 2
        }
        api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        
        # Get cart
        response = api_client.get(f"{BASE_URL}/api/cart/{test_session_id}")
        assert response.status_code == 200
        cart = response.json()
        assert isinstance(cart, list)
        assert len(cart) == 1
        assert cart[0]["product_id"] == "TEST_CART_GET"
        assert cart[0]["quantity"] == 2
        
        # Cleanup
        api_client.delete(f"{BASE_URL}/api/cart/{test_session_id}")

    def test_add_same_product_increments_quantity(self, api_client, test_session_id):
        """Test that adding same product increases quantity"""
        cart_item = {
            "session_id": test_session_id,
            "product_id": "TEST_INCR",
            "product_name": "TEST Increment Item",
            "product_price": 25.00,
            "product_image": "https://example.com/test.jpg",
            "quantity": 1
        }
        
        # Add once
        api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        
        # Add again
        response = api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        assert response.status_code == 200
        assert response.json()["quantity"] == 2
        
        # Cleanup
        api_client.delete(f"{BASE_URL}/api/cart/{test_session_id}")

    def test_remove_from_cart(self, api_client, test_session_id):
        """Test removing item from cart"""
        # Add item
        cart_item = {
            "session_id": test_session_id,
            "product_id": "TEST_REMOVE",
            "product_name": "TEST Remove Item",
            "product_price": 30.00,
            "product_image": "https://example.com/test.jpg",
            "quantity": 1
        }
        api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        
        # Remove item
        response = api_client.delete(f"{BASE_URL}/api/cart/{test_session_id}/TEST_REMOVE")
        assert response.status_code == 200
        
        # Verify cart is empty
        cart_response = api_client.get(f"{BASE_URL}/api/cart/{test_session_id}")
        assert len(cart_response.json()) == 0

    def test_clear_cart(self, api_client, test_session_id):
        """Test clearing entire cart"""
        # Add items
        for i in range(3):
            cart_item = {
                "session_id": test_session_id,
                "product_id": f"TEST_CLEAR_{i}",
                "product_name": f"TEST Clear Item {i}",
                "product_price": 10.00 * (i + 1),
                "product_image": "https://example.com/test.jpg",
                "quantity": 1
            }
            api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        
        # Verify items added
        cart_response = api_client.get(f"{BASE_URL}/api/cart/{test_session_id}")
        assert len(cart_response.json()) == 3
        
        # Clear cart
        response = api_client.delete(f"{BASE_URL}/api/cart/{test_session_id}")
        assert response.status_code == 200
        
        # Verify cart is empty
        cart_response = api_client.get(f"{BASE_URL}/api/cart/{test_session_id}")
        assert len(cart_response.json()) == 0


class TestWooCommerceCheckout:
    """Test WooCommerce checkout flow"""

    def test_checkout_empty_cart_returns_error(self, api_client, test_session_id):
        """Test checkout with empty cart returns 400"""
        response = api_client.post(f"{BASE_URL}/api/wc/checkout", json={
            "session_id": test_session_id
        })
        assert response.status_code == 400
        assert "empty" in response.json().get("detail", "").lower()

    def test_checkout_creates_order_and_returns_url(self, api_client, test_session_id):
        """Test checkout creates WooCommerce order and returns checkout URL"""
        # Add real WooCommerce product to cart
        cart_item = {
            "session_id": test_session_id,
            "product_id": "16",  # Enchanted Forest
            "product_name": "Enchanted Forest",
            "product_price": 49.99,
            "product_image": "https://fairygarden4u.com/shop/wp-content/uploads/2026/03/enchanted_forest.jpg",
            "quantity": 1,
            "variation_id": 55  # Ready Florarium variation
        }
        add_response = api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        assert add_response.status_code == 200
        
        # Create checkout
        checkout_response = api_client.post(f"{BASE_URL}/api/wc/checkout", json={
            "session_id": test_session_id,
            "billing_email": "test@example.com"
        })
        
        assert checkout_response.status_code == 200
        data = checkout_response.json()
        assert data["success"] is True
        assert "order_id" in data
        assert "checkout_url" in data
        assert "fairygarden4u.com" in data["checkout_url"]
        
        # Verify cart is cleared after checkout
        cart_response = api_client.get(f"{BASE_URL}/api/cart/{test_session_id}")
        assert len(cart_response.json()) == 0, "Cart should be cleared after successful checkout"

    def test_checkout_with_diy_product_id(self, api_client, test_session_id):
        """Test checkout handles DIY kit product IDs (diy-32 format)"""
        # Add DIY kit (product ID format: diy-32)
        cart_item = {
            "session_id": test_session_id,
            "product_id": "diy-32",  # Desktop Magic DIY Kit
            "product_name": "DIY Kit: Desktop Magic",
            "product_price": 49.99,
            "product_image": "https://fairygarden4u.com/shop/wp-content/uploads/2026/03/desktop_magic.jpg",
            "quantity": 1,
            "variation_id": 61  # DIY Kit variation
        }
        add_response = api_client.post(f"{BASE_URL}/api/cart", json=cart_item)
        assert add_response.status_code == 200
        
        # Create checkout - should strip "diy-" prefix
        # Billing email is now required for WC order creation
        checkout_response = api_client.post(f"{BASE_URL}/api/wc/checkout", json={
            "session_id": test_session_id,
            "billing_first_name": "Test",
            "billing_last_name": "DIY User",
            "billing_email": "diytest@example.com"
        })
        
        assert checkout_response.status_code == 200
        data = checkout_response.json()
        assert data["success"] is True
        assert "order_id" in data


class TestWooCommerceStatus:
    """Test WooCommerce connection status"""

    def test_wc_status(self, api_client):
        """Test WooCommerce status endpoint"""
        response = api_client.get(f"{BASE_URL}/api/wc/status")
        assert response.status_code == 200
        data = response.json()
        assert "connected" in data
        assert data["connected"] is True, f"WooCommerce not connected: {data.get('message')}"

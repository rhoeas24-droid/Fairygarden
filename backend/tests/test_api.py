import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

@pytest.fixture
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session

class TestAPIHealth:
    """Test API health and basic endpoints"""
    
    def test_api_root(self, api_client):
        """Test that API root is accessible"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Fairygarden For You API"
    
    def test_get_products(self, api_client):
        """Test getting products list"""
        response = api_client.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        products = response.json()
        assert isinstance(products, list)
        if len(products) > 0:
            product = products[0]
            assert "id" in product
            assert "name" in product
            assert "price" in product


class TestContactEndpoint:
    """Test /api/contact endpoint"""
    
    def test_submit_contact_form_success(self, api_client):
        """Test successful contact form submission"""
        unique_id = str(uuid.uuid4())[:8]
        contact_data = {
            "name": f"TEST_User_{unique_id}",
            "email": f"test_{unique_id}@example.com",
            "company": "TEST_Company",
            "message": "This is a test message for API testing"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == contact_data["name"]
        assert data["email"] == contact_data["email"]
        assert "id" in data
        assert "created_at" in data
    
    def test_submit_contact_form_invalid_email(self, api_client):
        """Test contact form with invalid email"""
        contact_data = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "Test message"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 422  # Validation error
    
    def test_submit_contact_form_missing_required(self, api_client):
        """Test contact form with missing required fields"""
        contact_data = {
            "email": "test@example.com"
            # Missing name and message
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 422


class TestWorkshopRegistration:
    """Test /api/workshop/register endpoint"""
    
    def test_register_workshop_success(self, api_client):
        """Test successful workshop registration"""
        unique_id = str(uuid.uuid4())[:8]
        registration_data = {
            "name": f"TEST_User_{unique_id}",
            "email": f"test_workshop_{unique_id}@example.com",
            "phone": "+1234567890",
            "workshop_type": "beginner"
        }
        response = api_client.post(f"{BASE_URL}/api/workshop/register", json=registration_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == registration_data["name"]
        assert data["email"] == registration_data["email"]
        assert data["workshop_type"] == "beginner"
        assert "id" in data
    
    def test_register_workshop_all_types(self, api_client):
        """Test all workshop types"""
        workshop_types = ["beginner", "intermediate", "group", "private"]
        for wtype in workshop_types:
            unique_id = str(uuid.uuid4())[:8]
            registration_data = {
                "name": f"TEST_User_{unique_id}",
                "email": f"test_{wtype}_{unique_id}@example.com",
                "workshop_type": wtype
            }
            response = api_client.post(f"{BASE_URL}/api/workshop/register", json=registration_data)
            assert response.status_code == 200, f"Workshop type {wtype} failed"


class TestNewsletterSubscription:
    """Test /api/newsletter/subscribe endpoint"""
    
    def test_subscribe_newsletter_success(self, api_client):
        """Test successful newsletter subscription"""
        unique_id = str(uuid.uuid4())[:8]
        subscription_data = {
            "email": f"test_newsletter_{unique_id}@example.com"
        }
        response = api_client.post(f"{BASE_URL}/api/newsletter/subscribe", json=subscription_data)
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == subscription_data["email"]
        assert "id" in data
    
    def test_subscribe_newsletter_duplicate(self, api_client):
        """Test duplicate newsletter subscription returns 400"""
        unique_id = str(uuid.uuid4())[:8]
        subscription_data = {
            "email": f"test_dup_{unique_id}@example.com"
        }
        # First subscription
        response1 = api_client.post(f"{BASE_URL}/api/newsletter/subscribe", json=subscription_data)
        assert response1.status_code == 200
        
        # Duplicate subscription
        response2 = api_client.post(f"{BASE_URL}/api/newsletter/subscribe", json=subscription_data)
        assert response2.status_code == 400
        assert "already subscribed" in response2.json().get("detail", "").lower()
    
    def test_subscribe_newsletter_invalid_email(self, api_client):
        """Test newsletter subscription with invalid email"""
        subscription_data = {
            "email": "not-an-email"
        }
        response = api_client.post(f"{BASE_URL}/api/newsletter/subscribe", json=subscription_data)
        assert response.status_code == 422


class TestBlogPosts:
    """Test /api/blog/posts endpoint"""
    
    def test_get_blog_posts(self, api_client):
        """Test getting blog posts list"""
        response = api_client.get(f"{BASE_URL}/api/blog/posts")
        assert response.status_code == 200
        posts = response.json()
        assert isinstance(posts, list)

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    let sid = localStorage.getItem('sessionId');
    if (!sid) {
      sid = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sid);
    }
    setSessionId(sid);
    fetchCart(sid);
  }, []);

  const fetchCart = async (sid) => {
    try {
      const response = await axios.get(`${API}/cart/${sid}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post(`${API}/cart`, {
        session_id: sessionId,
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image,
        quantity: 1
      });
      await fetchCart(sessionId);
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${API}/cart/${sessionId}/${productId}`);
      await fetchCart(sessionId);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API}/cart/${sessionId}`);
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
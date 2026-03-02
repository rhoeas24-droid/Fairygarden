import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('customerToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/wc/customers/me`, { params: { token } });
      setCustomer(res.data);
    } catch {
      localStorage.removeItem('customerToken');
      setToken(null);
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API}/wc/customers/login`, { email, password });
    const data = res.data;
    localStorage.setItem('customerToken', data.token);
    setToken(data.token);
    setCustomer({
      customer_id: data.customer_id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      billing: data.billing,
      shipping: data.shipping,
    });
    return data;
  };

  const register = async (email, password, firstName, lastName) => {
    const res = await axios.post(`${API}/wc/customers/register`, {
      email, password, first_name: firstName, last_name: lastName,
    });
    return res.data;
  };

  const logout = async () => {
    if (token) {
      try { await axios.post(`${API}/wc/customers/logout`, null, { params: { token } }); } catch {}
    }
    localStorage.removeItem('customerToken');
    setToken(null);
    setCustomer(null);
  };

  const updateProfile = async (data) => {
    const res = await axios.put(`${API}/wc/customers/me`, data, { params: { token } });
    await fetchProfile();
    return res.data;
  };

  const getOrders = async () => {
    const res = await axios.get(`${API}/wc/customers/orders`, { params: { token } });
    return res.data;
  };

  return (
    <AuthContext.Provider value={{
      customer, token, loading,
      isLoggedIn: !!customer,
      login, register, logout, updateProfile, getOrders, fetchProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

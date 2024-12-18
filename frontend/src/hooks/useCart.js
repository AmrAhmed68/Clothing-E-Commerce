import { useState } from 'react';
import axios from 'axios';

const useCart = (userId) => {
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState([]);


  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${userId}/cart`);
      setCart(response.data);
    } catch (err) {
      setError(err.response?.data || 'Error fetching cart');
    }
  };
  const fetchTotal = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${userId}/price`);
      setPrice(response.data.totalPrice);
    } catch (err) {
      setError(err.response?.data || 'Error fetching cart');
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/${userId}/cart`, {
        productId,
        quantity,
      });
      setCart(response.data.cart);
      localStorage.setItem(`inCard_${userId}_${productId}`, JSON.stringify(true));
    } catch (err) {
      setError(err.response?.data || 'Error adding to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/${userId}/cart/${productId}`);
      setCart(response.data.cart);
      localStorage.setItem(`inCard_${userId}_${productId}`, JSON.stringify(true));
    } catch (err) {
      setError(err.response?.data || 'Error removing from cart');
    }
  };

  const minsQuantityCart = async (productId, quantity) => {
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/${userId}/minscart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      setCart(response.data.cart); 
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating cart');
    }
  };

  const addQuantityCart = async (productId, quantity) => {
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/${userId}/addcart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      setCart(response.data.cart); 
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating cart');
    }
  };
  
  const getInCardStatus = (productId) => {
    const inCardStatus = localStorage.getItem(`inCard_${userId}_${productId}`);
    return inCardStatus ? JSON.parse(inCardStatus) : false;
  };

  return {price,  fetchTotal , cart, fetchCart, addToCart, removeFromCart, minsQuantityCart , addQuantityCart, error, getInCardStatus };
};

export default useCart;

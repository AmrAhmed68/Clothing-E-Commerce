import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://e-commerce-data-one.vercel.app/api/${userId}/cart`);
      setCart(response.data);
      calculateTotalPrice(response.data);
    } catch (err) {
      setError(err.response?.data || 'Error fetching cart');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);
    setTotalPrice(total);
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(`https://e-commerce-data-one.vercel.app/api/${userId}/cart`, {
        productId,
        quantity,
      });
      setCart(response.data.cart);
      calculateTotalPrice(response.data.cart);
    } catch (err) {
      setError(err.response?.data || 'Error adding to cart');
    }
  };
  
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`https://e-commerce-data-one.vercel.app/api/${userId}/cart/${productId}`);
      setCart(response.data.cart);
      calculateTotalPrice(response.data.cart);
    } catch (err) {
      setError(err.response?.data || 'Error removing from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    try {
      const response = await axios.put(
        `https://e-commerce-data-one.vercel.app/api/${userId}/cart`,
        { productId, quantity }
      );
      setCart(response.data.cart);
      calculateTotalPrice(response.data.cart);
    } catch (err) {
      setError(err.response?.data || 'Error updating cart');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

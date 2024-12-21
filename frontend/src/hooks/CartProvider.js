import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    if(!userId){
      return <p className="no-favourites">You are not logged in!</p>;
    }
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

  const showLoginPrompt = () => {
    Swal.fire({
      title: 'You are not logged in!',
      text: 'Please log in to perform this action.',
      icon: 'warning',
      confirmButtonText: 'Login',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login'; // Redirect to login page
      }
    });
  };

  const addToCart = async (productId, quantity) => {
    if (!userId) {
      showLoginPrompt();
      return;
    }
    
    try {
      const response = await axios.post(`https://e-commerce-data-one.vercel.app/api/${userId}/cart`, {
        productId,
        quantity,
      });
      setCart(response.data.cart);
      calculateTotalPrice(response.data.cart);
      fetchCart()
    } catch (err) {
      setError(err.response?.data || 'Error adding to cart');
    }
  };

  const removeFromCart = async (productId) => {
    if (!userId) {
      showLoginPrompt();
      return;
    }
    setLoading(true)
    try {
      const response = await axios.delete(`https://e-commerce-data-one.vercel.app/api/${userId}/cart/${productId}`);
      setCart(response.data.cart);
      calculateTotalPrice(response.data.cart);
      fetchCart()
    } catch (err) {
      setError(err.response?.data || 'Error removing from cart');
    } finally{
      setLoading(false)
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!userId) {
      showLoginPrompt();
      return;
    }

    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }
    setLoading(true)
    try {
      const response = await axios.put(
        `https://e-commerce-data-one.vercel.app/api/${userId}/cart`,
        { productId, quantity }
      );
      setCart(response.data.cart);
      calculateTotalPrice(response.data.cart);
      fetchCart()
    } catch (err) {
      setError(err.response?.data || 'Error updating cart');
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        cart,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

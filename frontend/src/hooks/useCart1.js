import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/${children.id}/cart`);
        dispatch({ type: 'SET_CART', payload: response.data });
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (item) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/${children.id}/cart`, item);
      dispatch({ type: 'ADD_TO_CART', payload: response.data });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`/api/cart/${id}`);
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await axios.put(`/api/cart/${id}`, { quantity });
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: response.data.quantity },
      });
    } catch (error) {
      console.error('Failed to update cart quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/cart');
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

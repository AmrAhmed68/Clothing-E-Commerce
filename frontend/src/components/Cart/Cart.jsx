import React, { useEffect } from 'react';
import useCart from '../../hooks/useCart';
import './Cart.css'; // Import the CSS file

const Cart = () => {
  const userId = localStorage.getItem('id');
  const {
    price,
    fetchTotal,
    cart,
    fetchCart,
    removeFromCart,
    minsQuantityCart,
    addQuantityCart,
    loading,
    error,
  } = useCart(userId);

  useEffect(() => {
    if (userId) {
      fetchCart();
      fetchTotal();
    }
  }, [fetchCart, fetchTotal, userId]);

  if (loading) return <p className="cart-loading">Loading cart...</p>; 
  if (error) return <p className="cart-error">{error}</p>; 

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart</h1>
      <h2 className="cart-title">Total Price: ${price}</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.productId} className="cart-item">
            <div className="cart-item-image">
              <img src={item.productId.imageUrl} alt={item.productId.name} />
            </div>
            <div className="cart-item-details">
              <h2>{item.productId.name}</h2>
              <p>Price: ${item.productId.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Price: ${item.quantity * item.productId.price}</p>
              <div className="cart-item-actions">
                <button
                  className="cart-button"
                  onClick={() => minsQuantityCart(item.productId._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button
                  className="cart-button"
                  onClick={() => addQuantityCart(item.productId._id, item.quantity + 1)}
                  disabled={item.quantity >= item.productId.stock}
                >
                  +
                </button>
                <button
                  className="cart-remove-button"
                  onClick={() => removeFromCart(item.productId._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

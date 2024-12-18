import React, { useEffect } from 'react';
import {useCart} from '../../hooks/CartProvider';
import './Cart.css'; // Import the CSS file

const Cart = () => {
  const { cart , totalPrice, fetchCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    fetchCart();
  }, [cart]);  

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart</h1>
      <h2 className="cart-title">Total Price: ${totalPrice}</h2>
      <ul className="cart-list">

        {cart.map((item) => (
          <li key={item.productId._id} className="cart-item">
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
                  onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button
                  className="cart-button"
                  onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
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

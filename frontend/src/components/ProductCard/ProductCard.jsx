import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../hooks/CartProvider';
import useFavourite from '../../hooks/useFavourite';
import ProductReviews from "../Rating/ProductReviews";
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductCard(props) {
  const id = localStorage.getItem("id");
  const { addFavourite, removeFavourite } = useFavourite(id);
  const { addToCart, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);  
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!id) return;

    const checkProductInFavourite = async () => {
      try {
        const response = await axios.get(`https://e-commerce-data-one.vercel.app/api/${id}/favourite/${props.data._id}`);
        setIsFavourite(response.data.exists);
      } catch (error) {
        console.error('Error checking product in favourites', error);
      }
    };

    const checkProductInCart = async () => {
      try {
        const response = await axios.get(`https://e-commerce-data-one.vercel.app/api/${id}/cart/${props.data._id}`);
        setIsInCart(response.data.exists);
      } catch (error) {
        console.error('Error checking product in cart', error);
      }
    };

    checkProductInCart();
    checkProductInFavourite();
  }, []);

  const showLoginAlert = () => {
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

  const handleDetailsClick = () => {
    navigate(`/details/${props.data._id}`);
  };

  const handleAddToCart = () => {
    if (!id) {
      showLoginAlert();
      return;
    }
    addToCart(props.data._id, 1);
    setIsInCart(true);
  };

  const handleAddToFavourite = () => {
    if (!id) {
      showLoginAlert();
      return;
    }
    addFavourite(props.data._id);
    setIsFavourite(true); 
  };

  const handleRemoveFromCart = () => {
    removeFromCart(props.data._id); 
    setIsInCart(false);
  };

  const handleRemoveFavourite = () => {
    removeFavourite(props.data._id); 
    setIsFavourite(false); 
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={props.data.imageUrl}
          alt={props.data.name}
          onClick={handleDetailsClick}
          className="product-image"
        />
        <button
          className={`heart-button ${isFavourite ? 'favourited' : ''}`}
          onClick={isFavourite ? handleRemoveFavourite : handleAddToFavourite}
        >
          <FontAwesomeIcon icon={faHeart} size="2x" />
        </button>
      </div>
      <div className="card-details">
        <h2 className="product-name">{props.data.name}</h2>
        <p className="product-description">{props.data.brand}</p>
        <p className="product-price">${props.data.price}</p>
        <button
          className="cart-button"
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
        >
          <FontAwesomeIcon icon={isInCart ? faCartArrowDown : faCartShopping} size="1x" />
        </button>

        <ProductReviews productId={props.data._id} key={refresh} />
      </div>
    </div>
  );
}

export default ProductCard;

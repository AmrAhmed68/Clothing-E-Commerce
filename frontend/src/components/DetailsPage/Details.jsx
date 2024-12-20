import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Details.css";
import useProduct from "../../hooks/useProduct";
import ProductReviews from "../Rating/ProductReviews";
import AddReview from "../Rating/ReviewForm";
import Review from "../Rating/Review";
import {useCart} from '../../hooks/CartProvider'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping , faCartArrowDown , faHeart} from '@fortawesome/free-solid-svg-icons';

function Details() {
  const { id } = useParams();
  const userId = localStorage.getItem("id")
  const { loading, fetchProductById } = useProduct();
  const [product, setProduct] = useState({});
  const [refresh, setRefresh] = useState(false);
  const {addToCart  , removeFromCart} = useCart();    
  const [isInCart, setIsInCart] = useState(false);  
  

  const handleReviewAdded = () => setRefresh(!refresh);

  useEffect(() => {

      const checkProductInCart = async () => {
        try {
          const response = await axios.get(`https://e-commerce-data-one.vercel.app/api/${userId}/cart/${id}`);
          if (response.data.exists) {
            setIsInCart(true);
          } else {
            setIsInCart(false);
          }
        } catch (error) {
          console.error('Error checking product in cart', error);
        }
      };
  
      fetchProductById(id).then((data) => setProduct(data));
      checkProductInCart();
  }, [id , userId]);

  const handleAddToCart = () => {
    addToCart(id , 1);
    setIsInCart(true)
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id); 
    setIsInCart(false)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="details-container">
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} />
        <p>Brand: <span>{product.brand}</span></p>
        <p>Price: <span>${product.price}</span></p>

        <p>Colors: <span>{product.color?.join(" , ")}</span></p>
        <p>Sizes: <span>{product.size?.join(" , ")}</span></p>
        <p>Stock: <span>{product.stock > 0 ? product.stock : "Out of Stock"}</span></p>
        <ProductReviews productId={id} key={refresh} />
      <button onClick={isInCart ? handleRemoveFromCart : handleAddToCart}>
           {isInCart? "Added To Card" : "Add To Card"} 
            </button>
      </div>

      <div className="add-review-container">
        <h2>Add Your Review</h2>
        <AddReview productId={id} onReviewAdded={handleReviewAdded} />
      </div>

      <div className="product-reviews-container">
        <h2>All Reviews</h2>
        <Review productId={id} />
      </div>
    </>
  );
}

export default Details;

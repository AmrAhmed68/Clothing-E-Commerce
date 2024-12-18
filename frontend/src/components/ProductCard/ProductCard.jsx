import React , {useState , useEffect} from 'react'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping , faCartArrowDown , faHeart} from '@fortawesome/free-solid-svg-icons';
import {useCart} from '../../hooks/CartProvider'
import useFavourite from '../../hooks/useFavourite';
import ProductReviews from "../Rating/ProductReviews";
import axios from 'axios';

function ProductCard(props) {
  const id = localStorage.getItem("id")
    const {addFavourite , removeFavourite} = useFavourite(id)
    const {addToCart  , removeFromCart} = useCart()
    const [isInCart, setIsInCart] = useState(false);  
    const [isFavourite, setIsFavourite] = useState(false);
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    

    useEffect(() => {

        const checkProductInFavourite = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/${id}/favourite/${props.data._id}`);
            if (response.data.exists) {
              setIsFavourite(true);
            } else {
              setIsFavourite(false);
            }
          } catch (error) {
            console.error('Error checking product in favourites', error);
          }
        };

          const checkProductInCart = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/${id}/cart/${props.data._id}`);
              if (response.data.exists) {
                setIsInCart(true);
              } else {
                setIsInCart(false);
              }
            } catch (error) {
              console.error('Error checking product in cart', error);
            }
          };
      
          checkProductInCart();
          checkProductInFavourite()
      }, [props.data._id , id]);

      const handleDetailsClick = () => {
        navigate(`/details/${props.data._id}`);
      };
      
      const handleAddToCart = () => {
        addToCart(props.data._id , 1);
        setIsInCart(true)
      };

      const handleAddToFavourite = () => {
        addFavourite(props.data._id);
        setIsFavourite(true); 

      };
    
      const handleRemoveFromCart = () => {
        removeFromCart(props.data._id); 
        setIsInCart(false)
      };
      
      const handleRemoveFavourite = () => {
        removeFavourite(props.data._id); 
        setIsFavourite(false); 
      };

  return (
    <div className="product-card">
    <div className="image-container" >
      <img src={props.data.imageUrl} alt={props.data.name} onClick={handleDetailsClick} className="product-image" />
      <button className={`heart-button ${isFavourite ? 'favourited' : ''}`} onClick={isFavourite ? handleRemoveFavourite : handleAddToFavourite}>
        <FontAwesomeIcon icon={faHeart} size="2x" />
      </button>
    </div>
    <div className="card-details">
      <h2 className="product-name">{props.data.name}</h2>
      <p className="product-description">{props.data.brand}</p>
      <p className="product-price">${props.data.price}</p>
      <button className="cart-button" onClick={isInCart ? handleRemoveFromCart : handleAddToCart}>
        <FontAwesomeIcon icon={isInCart? faCartArrowDown : faCartShopping} size="1x" />
      </button>

      <ProductReviews productId={props.data._id} key={refresh} />
    </div>
  </div>
);
}

export default ProductCard

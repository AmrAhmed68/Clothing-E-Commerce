import React , {useState , useEffect} from 'react'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping , faCartArrowDown , faHeart} from '@fortawesome/free-solid-svg-icons';
import useCart from '../../hooks/useCart'
import useFavourite from '../../hooks/useFavourite';

function ProductCard(props) {
  const id = localStorage.getItem("id")
    const {addFavourite , removeFavourite , getFavouriteStatus} = useFavourite(id)
    const { addToCart  , removeFromCart , getInCardStatus} = useCart(id)
    const [inCard, setInCard] = useState(false);
    const [isFavourite, setisFavourite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const status = getInCardStatus(props.data._id);
        const status1 = getFavouriteStatus(props.data._id);
        setInCard(status);
        setisFavourite(status1)
      }, [props.data._id, getInCardStatus , getFavouriteStatus]);
    
      const handleDetailsClick = () => {
        navigate(`/details/${props.data._id}`);
      };
    
      const handleAddToCart = () => {
        addToCart(props.data._id);
        setInCard(true); 
      };

      const handleAddToFavourite = () => {
        addFavourite(props.data._id);
        setisFavourite(true); 
      };
    
      const handleRemoveFromCart = () => {
        removeFromCart(props.data._id); 
        setInCard(false); 
      };
      
      const handleRemoveFavourite = () => {
        removeFavourite(props.data._id); 
        setisFavourite(false); 
      };

  return (
        <div className='card'  style={{cursor : "pointer"}}>
            <img src={props.data.imageUrl} alt="" onClick={handleDetailsClick} />
            {isFavourite === false ? 
              <button onClick={handleAddToFavourite}>
              <FontAwesomeIcon icon={faHeart} size="1x" color = "white" />
              </button> 
            :
            <button onClick={handleRemoveFavourite}>
            <FontAwesomeIcon icon={faHeart } size="1x" color = "red" />
            </button> 
            }
            <h2>{props.data.name}</h2>
            <h3>{props.data.description}</h3>
            <p> Price : {props.data.price}</p>
            {inCard === false ? 
                <button onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faCartShopping} size="1x" />
                </button> 
            :
                <button onClick={handleRemoveFromCart}>
                <FontAwesomeIcon icon={faCartArrowDown } size="1x" color = "red" />
                </button> 
            }
        </div>
    )
}

export default ProductCard

import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://e-commerce-data-one.vercel.app/api/favourite';

const useFavourite = (userId) => {
  const [favourite, setFavourite] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFavourite = async () => {
    if(!userId){
      return <p className="no-favourites">You are not logged in!.</p>;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      setFavourite(response.data);

    } catch (err) {
      setError(err.response?.data || 'Error fetching product');
    }finally{
      setLoading(false);
    }
  };

  const addFavourite = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/${userId}`, {productId});
      setFavourite(response.data.favourite);
    } catch (err) {
      setError(err.response?.data || 'Error adding to favourite');
    } 
    finally{
      setLoading(false);
      }
  };

  const removeFavourite = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userId}/${productId}`);
      setFavourite(response.data.favourite);
    } catch (err) {
      setError(err.response?.data || 'Error removing from favourite');
    }
    finally{
      setLoading(false);
      }
  };

  return {
    loading,
    favourite,
    error,
    fetchFavourite,
    addFavourite,
    removeFavourite,
  };
};

export default useFavourite;

import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/favourite';

const useFavourite = (userId) => {
  const [favourite, setFavourite] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavourite = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      setFavourite(response.data);
    } catch (err) {
      setError(err.response?.data || 'Error fetching product');
    }
  };

  const addFavourite = async (productId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${userId}`, {productId});
      setFavourite(response.data.favourite);
      localStorage.setItem(`Favourite_${userId}_${productId}`, JSON.stringify(true));
    } catch (err) {
      setError(err.response?.data || 'Error adding to favourite');
    }
  };

  const removeFavourite = async (productId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userId}/${productId}`);
      setFavourite(response.data.favourite);
      localStorage.setItem(`Favourite_${userId}_${productId}`, JSON.stringify(false));

    } catch (err) {
      setError(err.response?.data || 'Error removing from favourite');
    }
  };
  const getFavouriteStatus = (productId) => {
    const inCardStatus = localStorage.getItem(`Favourite_${userId}_${productId}`);
    return inCardStatus ? JSON.parse(inCardStatus) : false;
  };

  return {
    favourite,
    loading,
    error,
    getFavouriteStatus,
    fetchFavourite,
    addFavourite,
    removeFavourite,
  };
};

export default useFavourite;

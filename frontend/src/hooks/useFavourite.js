import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://e-commerce-data-one.vercel.app/api/favourite';

const useFavourite = (userId) => {
  const [favourite, setFavourite] = useState([]);
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
    } catch (err) {
      setError(err.response?.data || 'Error adding to favourite');
    }
  };

  const removeFavourite = async (productId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userId}/${productId}`);
      setFavourite(response.data.favourite);
    } catch (err) {
      setError(err.response?.data || 'Error removing from favourite');
    }
  };

  return {
    favourite,
    error,
    fetchFavourite,
    addFavourite,
    removeFavourite,
  };
};

export default useFavourite;

import React, { useEffect } from 'react';
import useFavourite from '../../hooks/useFavourite';
import ProductCard from '../ProductCard/ProductCard';// Add styling for spinner or skeleton loader

function Favourite({ userId }) {
  const id = localStorage.getItem('id');
  const { favourite, fetchFavourite, error, loading } = useFavourite(id);

  useEffect(() => {
    fetchFavourite();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your favourites...</p>
      </div>
    );
  }

  if (error) return <p className="error-message">{error}</p>; // Show error message

  if (favourite.length === 0) {
    return <p className="no-favourites">You have no favourite items.</p>;
  }

  const Product = favourite.map((e) => (
    <ProductCard key={e.productId._id} data={e.productId} />
  ));

  return <div className="favourite-container">{Product}</div>;
}

export default Favourite;

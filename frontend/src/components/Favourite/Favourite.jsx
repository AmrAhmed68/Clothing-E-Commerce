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

  if (error) return <div className="no-favourites">
  <p >{error}</p>;
</div>

  if (!id ) {
    return <div className="no-favourites">
    <p>You are not logged in!</p>;
  </div>
  }

  if (favourite.length === 0) {
    return (
      <div className="no-favourites">
        <p>No favourites yet!</p>
      </div>
    );}

  const Product = favourite.map((e) => (
    <ProductCard key={e.productId._id} data={e.productId} />
  ));

  return <div className="favourite-container">{Product}</div>;
}

export default Favourite;

import React, { useEffect } from 'react';
import useFavourite from '../../hooks/useFavourite';
import ProductCard from '../ProductCard/ProductCard';

function Favourite({ userId }) {
  const id = localStorage.getItem('id');
  const { favourite, fetchFavourite, loading, error } = useFavourite(id);

  useEffect(() => {
    fetchFavourite();
  }, [fetchFavourite]);

  if (loading) return <p>Loading favourites...</p>; // Show loading message
  if (error) return <p>{error}</p>; // Show error message

  const Product = favourite.map((e) => (
    <ProductCard key={e.productId._id} data={e.productId} />
  ));

  return <div className="container">{Product}</div>;
}

export default Favourite;

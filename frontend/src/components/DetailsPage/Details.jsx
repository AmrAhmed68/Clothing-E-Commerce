import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Details.css'
import useProduct from '../../hooks/useProduct'


function Details() {
    const {id} = useParams();
    const {loading, fetchProductById} = useProduct();
    const [product, setProduct] = useState({});

    useEffect(() => {
      fetchProductById(id).then(data => setProduct(data));
      }, [id]);
      if (loading) {
        return <div>Loading...</div>;
        }
  
  return (
    <div className="details-container">
    <h1>{product.name}</h1>
    <img src={product.imageUrl} alt={product.title} />
    <p>{product.description}</p>
    <p>Price: ${product.price}</p>
    {/* <p>Rating: {product.rating}</p> */}
  </div>
  )
}

export default Details

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Details.css";
import useProduct from "../../hooks/useProduct";
import ProductReviews from "../Rating/ProductReviews";
import AddReview from "../Rating/ReviewForm";
import Review from "../Rating/Review";

function Details() {
  const { id } = useParams();
  const { loading, fetchProductById } = useProduct();
  const [product, setProduct] = useState({});
  const [refresh, setRefresh] = useState(false);

  const handleReviewAdded = () => setRefresh(!refresh);

  useEffect(() => {
    fetchProductById(id).then((data) => setProduct(data));
  }, [id]);

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
      </div>

      <div className="product-reviews-container">
        <h2>Customer Reviews</h2>
        <ProductReviews productId={id} key={refresh} />
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

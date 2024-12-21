import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

const API_BASE_URL = "https://e-commerce-data-one.vercel.app/api";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${productId}/reviews`);
        setReviews(response.data.reviews);
        setAverageRating(response.data.average);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h3>
        Average Rating: <StarRating rating={averageRating} />
      </h3>
    </div>
  );
};

export default ProductReviews;

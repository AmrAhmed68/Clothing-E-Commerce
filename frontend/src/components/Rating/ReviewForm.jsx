import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import './StarRating.css'


const API_BASE_URL = "https://e-commerce-data-one.vercel.app/api";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const id = localStorage.getItem("id")
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

    const showLoginPrompt = () => {
      Swal.fire({
        title: 'You are not logged in!',
        text: 'Please log in to perform this action.',
        icon: 'warning',
        confirmButtonText: 'Login',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login'; // Redirect to login page
        }
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      showLoginPrompt();
      return;
    }
    try {
      const userId = id; 
      const user = JSON.parse(localStorage.getItem("user")) 
      const userName = user.username
      await axios.post(`${API_BASE_URL}/${productId}/reviews`, {
        userId,
        userName,
        comment,
        rating,
      });
      onReviewAdded();
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add a Review</h4>
      <div className="review-items">
      <input 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        required
        />
        </div>
      <br />
      <label className="review-label">
        Rating:
        <select className="review-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={0}>Select Rating</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star}
            </option>
          ))}
        </select>
      </label>

      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;

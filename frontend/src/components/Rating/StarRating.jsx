import './StarRating.css'
import React from "react";



const StarRating = ({ rating, maxStars = 5 }) => {
  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          style={{
            color: index < rating ? "#ffc107" : "#e4e5e9",
            fontSize: "1.5em",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

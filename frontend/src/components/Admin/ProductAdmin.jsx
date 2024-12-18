import React from "react";
import axios from "axios";

function ProductAdmin ({ product })  {

  const handleUpdateSection = async (section , Id) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8000/api/section`,
        { section : section , productId : Id} ,
        { headers: { Authorization: `Bearer ${token}`} }
      );
      console.log("Section updated:", response.data);
    } catch (err) {
      console.error("Error updating section:", err);
    }
  };

  return (
    <div className="product-admin">
        {product.map((item) => (
            <div key={item._id}>
                <img src={item.imageUrl} alt=""/>
            <h3>{item.name}</h3>
      <p>Current Section: {product.section || "None"}</p>
      <div>
        <button onClick={() => handleUpdateSection("Most Popular" , item._id)}>
          Add to Most Popular
        </button>
        <button onClick={() => handleUpdateSection("Last Added" , item._id)}>
          Add to Last Added
        </button>
        <button onClick={() => handleUpdateSection("Best Offers" , item._id)}>
          Add to Best Offers
        </button>
      </div>
            </div>
    ))}
    </div>
  );
};

export default ProductAdmin;

import React, { useEffect, useState } from 'react';
import './Filter.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Filter() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null); // Track which category is being hovered

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleRoute = (categoryName) => {
    navigate(`category/${categoryName}`);
  };

  return (
    <div className='filter-container'>
      {categories.map((item) => (
        <div
          key={item._id}
          className="category-item"
          onMouseEnter={() => setHoveredCategory(item.category.name)}  // Show subcategories on hover
          onMouseLeave={() => setHoveredCategory(null)}  // Hide subcategories when not hovered
        >
          <button onClick={() => handleRoute(item.category.name)}>
            {item.category.name}
          </button>

          {hoveredCategory === item.category.name && item.category.subcategory.length > 0 && (
            <div className="subcategory-list">
              {item.category.subcategory.map((subcat, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`category/${item.category.name}/${subcat}`)}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Filter;
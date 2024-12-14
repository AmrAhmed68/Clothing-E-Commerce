import React, { useState } from 'react';
import './Search.css'; 
import useProduct from '../../hooks/useProduct';
import { useNavigate } from 'react-router-dom';

function Search(props) {
    const [filter, setFilter] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {products} = useProduct();
    const navigate = useNavigate();
    

    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    const handleInputChange = (e) => {
      setFilter(e.target.value);
      setIsModalVisible(true); 
    };
  
    const handleBlur = () => {
      setTimeout(() => setIsModalVisible(false), 200);
    };
    
    const handleDetailsClick = () => {
      navigate(`/details/${props.data._id}`);
    };
    
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a product..."
        value={filter}
        onChange={handleInputChange}
        onFocus={() => setIsModalVisible(true)} 
        onBlur={handleBlur}
      />
      {isModalVisible && filter && (
        <div className="search-dropdown">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div className="search-item" key={item._id} onClick={handleDetailsClick}>
                <img src = {item.imageUrl} alt={item.name}/>
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
              </div>
            ))
          ) : (
            <div className="no-results">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

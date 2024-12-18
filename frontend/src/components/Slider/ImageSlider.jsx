import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './ImageSlider.css';

function ImageSlider() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch images from backend API
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/slider');
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    fade: true, 
    cssEase: 'linear',
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <div className="image-wrapper">
              <img src={image.image} alt="" className="slider-image" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;

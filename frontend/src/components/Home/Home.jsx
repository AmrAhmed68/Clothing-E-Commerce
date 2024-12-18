import React, { useEffect, useState } from 'react'
import ImageSlider from '../Slider/ImageSlider';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard'


function Home() {
  const [mostPopular, setMostPopular] = useState([]);
  const [lastAdded, setLastAdded] = useState([]);
  const [bestOffers, setBestOffers] = useState([]);

    useEffect(() => {
      const fetchProductsBySection = async (section, setter) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/section/${section}`
          );
          setter(response.data);
        } catch (err) {
          console.error(`Error fetching ${section} products:`, err);
        }
      };
  
      fetchProductsBySection("Most Popular", setMostPopular);
      fetchProductsBySection("Last Added", setLastAdded);
      fetchProductsBySection("Best Offers", setBestOffers);
    }, []);

  return (
    <>
    <div>
      <ImageSlider/>

    </div>
     <div className="home">
     <h2>Most Popular</h2>
     <div className='container'>
       {mostPopular.map((product) => (
         <ProductCard key={product._id} data= {product}/>
       ))}
     </div>

     <h2>Last Added</h2>
     <div className='container'>
       {lastAdded.map((product) => (
         <ProductCard key={product._id} data= {product}/>
       ))}
     </div>

     <h2>Best Offers</h2>
     <div className='container'>
       {bestOffers.map((product) => (
         <ProductCard key={product._id} data= {product}/>
       ))}
     </div>
   </div>
    </>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import ImageSlider from '../Slider/ImageSlider';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard'
import './Home.css'


function Home() {
  const [mostPopular, setMostPopular] = useState([]);
  const [lastAdded, setLastAdded] = useState([]);
  const [bestOffers, setBestOffers] = useState([]);
  const [loading, setLoading] = useState(false);


    useEffect(() => {
      const fetchProductsBySection = async (section, setter) => {
        setLoading(true)
        try {
          const response = await axios.get(
            `https://e-commerce-data-one.vercel.app/api/section/${section}`
          );
          setter(response.data);
        } catch (err) {
          console.error(`Error fetching ${section} products:`, err);
        } finally{
          setLoading(false)
        }
      };
  
      fetchProductsBySection("Most Popular", setMostPopular);
      fetchProductsBySection("Last Added", setLastAdded);
      fetchProductsBySection("Best Offers", setBestOffers);
    }, []);

    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      );
    }

    if (mostPopular.length === 0) {
      return <p className="no-favourites">You have no  items.</p>;
    }
    if (lastAdded.length === 0) {
      return <p className="no-favourites">You have no  items.</p>;
    }
    if (bestOffers.length === 0) {
      return <p className="no-favourites">You have no  items.</p>;
    }

  return (
    <>
    <div style={{marginTop : "40px"}}>
      <ImageSlider/>

    </div>
     <div className="home">
     <h2 style={{textAlign : "center"}}>Most Popular</h2>
     <div className='container'>
       {mostPopular.map((product) => (
         <ProductCard key={product._id} data= {product}/>
       ))}
     </div>

     <h2 style={{textAlign : "center"}}>Last Added</h2>
     <div className='container'>
       {lastAdded.map((product) => (
         <ProductCard key={product._id} data= {product}/>
       ))}
     </div>

     <h2 style={{textAlign : "center"}}>Best Offers</h2>
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

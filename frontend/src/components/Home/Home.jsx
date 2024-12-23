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
      setLoading(true);
      console.log(`Fetching products for section: ${section}`); // Debug log
      try {
        const response = await axios.get(
          `http://localhost:8000/api/section/${encodeURIComponent(section)}`, // Ensure section is encoded
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
        console.log(`Response for ${section}:`, response.data); // Log response data
        setter(response.data);
      } catch (err) {
        console.error(`Error fetching ${section} products:`, err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductsBySection('Most Popular', setMostPopular);
    fetchProductsBySection('Last Added', setLastAdded);
    fetchProductsBySection('Best Offers', setBestOffers);
  }, []);
  

    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      );
    }

    // if (mostPopular.length === 0) {
    //   return <div className="no-favourites">
    //   <p >You have no  items.</p>
    // </div>
    // } 
    // if (lastAdded.length === 0) {
    //   return <div className="no-favourites">
    //   <p >You have no  items.</p>
    // </div>
    // }
    // if (bestOffers.length === 0) {
    //   return <div className="no-favourites">
    //   <p>You have no  items.</p>
    // </div>
    // }

  return (
    <>
    <div style={{marginTop : "40px"}}>
      <ImageSlider/>
    </div>
    <div className="container">
      
    </div>
     <div className="home">
     <h2 style={{textAlign : "center"}}>Most Popular</h2>
     {
      mostPopular.length === 0 ? 
     <div className='container'>
       {mostPopular.map((product) => (
         <ProductCard key={product._id} data= {product}/>
       ))}
     </div> : 
     <div className="no-favourites">
     <p >You have no  items.</p>
   </div>
     }

     <h2 style={{textAlign : "center"}}>Last Added</h2>
      {
      lastAdded.length === 0 ? 
      <div className='container'>
       {lastAdded.map((product) => (
         <ProductCard key={product._id} data= {product}/>
        ))}
     </div>
        :
     <div className="no-favourites">
     <p >You have no  items.</p>
   </div>
     }

     <h2 style={{textAlign : "center"}}>Best Offers</h2>
     {
      bestOffers.length === 0 ? 
      <div className='container'>
       {bestOffers.map((product) => (
         <ProductCard key={product._id} data= {product}/>
       ))}
     </div> : 
     <div className="no-favourites">
     <p >You have no  items.</p>
    </div>
     }
    </div>
    </>
  )
}

export default Home

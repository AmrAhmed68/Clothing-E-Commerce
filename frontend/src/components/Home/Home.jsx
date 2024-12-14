import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const HandleOnClick = () =>{
        navigate(`/product`); 
    }

  return (
    <div>
      <button onClick={HandleOnClick}>Show Product</button>
    </div>
  )
}

export default Home

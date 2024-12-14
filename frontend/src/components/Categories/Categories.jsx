import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ProductCard from '../ProductCard/ProductCard';


function Categories() {
    let {id} = useParams();
    const [product , setProduct] = useState([])

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
    }, [id] )

    const products = product.map((e) => {
        return (
        <ProductCard key={e.id} data={e} />
        )
    })

  return (
    <>
    <h1 style={{textAlign : "center"}}>{id.toUpperCase()}</h1>
    <div className='container'>
        {products}
    </div>
    </>
  )
}

export default Categories

import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import useProduct from '../../hooks/useProduct'
import { useParams } from 'react-router-dom'

function CategoryProduct() {
    const {categoryName} = useParams()
    const {cproduct , fetchCategory} = useProduct()
    const [loading , setLoading] = useState([])
    
    useEffect(() => {
      setLoading(true)
        fetchCategory(categoryName);
        setLoading(false)
    }, [categoryName]);

    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      );
    }
    
    const Product = Array.isArray(cproduct)
    ? cproduct.map((e) => <ProductCard key={e._id} data={e} />)
    : null;
          
    
      return (
        <div className='container'>
          {Product}
        </div>
      )    
}

export default CategoryProduct

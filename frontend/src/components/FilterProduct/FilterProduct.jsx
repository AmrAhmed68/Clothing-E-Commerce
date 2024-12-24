import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import useProduct from '../../hooks/useProduct'
import { useParams } from 'react-router-dom'

function FilterProduct() {
    const {categoryName, subcategoryName} = useParams()
    const {product , loading , fetchSubCategory} = useProduct()
    

    useEffect(() => {
        fetchSubCategory(categoryName, subcategoryName);
        }, [categoryName, subcategoryName]);

        if (loading) {
          return (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          );
        }

        const Product = Array.isArray(product)
        ? product.map((e) => <ProductCard key={e._id} data={e} />)
        : null;
      

  return (
    <div className='container'>
      {Product}
    </div>
  )
}

export default FilterProduct

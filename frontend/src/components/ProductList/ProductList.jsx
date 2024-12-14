import './ProductList.css'
import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import useProduct from '../../hooks/useProduct'
function ProductList() {
    const {products} = useProduct()

    const Product = products.map((e) => {
        return (
            <ProductCard key={e._id} data= {e}/>
        )
    })

    return (
    <div className='container'>
        {Product}
    </div>
  )
}

export default ProductList

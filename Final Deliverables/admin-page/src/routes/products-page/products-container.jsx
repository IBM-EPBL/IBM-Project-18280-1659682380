import React from 'react'
import ProductDetail from '../../component/products/product-detail.component'
const ProductContainer = () => {
  return (
    <>
    <h1>Products details page</h1>
    <div className='d-flex justify-content-start flex-wrap' >
    <ProductDetail />
    <ProductDetail />
    <ProductDetail />
    <ProductDetail />
    </div>
    </>
  )
}

export default ProductContainer

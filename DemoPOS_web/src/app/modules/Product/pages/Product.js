import React from 'react'
import ProductTable from '../components/ProductTable'
import ProductToolbar from '../components/ProductToolbar'

function Product() {
  return (
    <div>
        <ProductToolbar></ProductToolbar> 
        <ProductTable></ProductTable>
    </div>
  )
}

export default Product
import React from 'react'
import { useParams } from "react-router-dom";

function ProductById() {
  let { id } = useParams();
  return (
    <div>ProductById: {id}</div>
  )
}

export default ProductById
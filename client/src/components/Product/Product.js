import ProductImage from 'components/ProductImage';
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className='col-4 mb-3'>
      <div className='card'>
        <div className='card-header'>{product.name}</div>
        <div className='card-body'>
          <ProductImage item={product} url={product} />
          <p className='card-text'>{product.description}</p>
          <p className='card-text'>{product.price}</p>
          <Link to='/'>
            <button className='btn btn-info mt-2 mb-2'>View Product</button>
          </Link>
          <button className='btn btn-dark  mt-2 mb-2 ml-5'>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

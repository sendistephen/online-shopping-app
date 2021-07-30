import ProductImage from 'components/ProductImage';
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, showViewProductButton = true }) => {
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/products/${product._id}`}>
          <button className='btn btn-success  mt-2 mb-2'>
            View Details
          </button>
        </Link>
      )
    );
  };
  return (
    <div className='card'>
      <div className='card-header'>{product.name}</div>
      <div className='card-body'>
        <ProductImage item={product} url='product' />
        <p className='card-text'>{product.description.substring(0, 50)}</p>
        <p className='card-text'>$ {product.price}</p>
        {showViewButton(showViewProductButton)}

        <button className='btn btn-dark  mt-2 mb-2 ml-2'>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;

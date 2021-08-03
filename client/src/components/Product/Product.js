import ProductImage from 'components/ProductImage';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import { addProductToCart } from 'components/Cart/CartHelpers';

const Product = ({ product, showViewProductButton = true }) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/products/${product._id}`}>
          <button className='btn btn-success btn-sm  mt-2 mb-2'>
            View Details
          </button>
        </Link>
      )
    );
  };
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-success badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-danger badge-pill'>Out of Stock</span>
    );
  };
  const addToCart = () => {
    addProductToCart(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = () => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  return (
    <div className='card'>
      <div className='card-header name'>{product.name}</div>
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <ProductImage item={product} url='product' />
        <p className='card-text lead'>{product.description.substring(0, 50)}</p>
        <p className='card-text black-10'>$ {product.price}</p>
        <div className=''>
          <span className='mr-2 block'>Category</span>
          <span className='badge bg-light text-dark'>
            {product.category && product.category.name}
          </span>
        </div>
        <p className='black-8 my-2'>
          Added {moment(product.createdAt).fromNow()}
        </p>
        <div>{showStock(product.quantity)}</div>
        <button
          className='btn btn-sm btn-dark  mt-2 mb-2 mr-2'
          onClick={addToCart}
        >
          Add to Cart
        </button>
        {showViewButton(showViewProductButton)}
      </div>
    </div>
  );
};

export default Product;

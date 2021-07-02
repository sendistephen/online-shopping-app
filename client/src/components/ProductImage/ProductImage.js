import { API } from 'config';
import React from 'react';

const ProductImage = ({ item, url }) => {
  return (
    <div className='product-img'>
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className='mb-3'
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
  );
};

export default ProductImage;

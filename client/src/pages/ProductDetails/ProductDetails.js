import { read } from 'api/product';
import { Layout, Product } from 'components';
import React, { useEffect, useState } from 'react';

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const fetchSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const { productId } = props.match.params;
    fetchSingleProduct(productId);
  }, []);

  return (
    <Layout
      title={product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className='container'
    >
      <div className='row'>
        {product && product.description && (
          <Product product={product} showViewProductButton={false} />
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;

import { fetchAllProducts } from 'api/product';
import { Layout, Product, Search } from 'components';
import React, { useState, useEffect } from 'react';

function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    fetchAllProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    fetchAllProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      className='container'
      title='Home Page'
      description='Shoppers online Ecommerce'
    >
      <Search />
      <div class='row'>
        <h3 className='display-3 mb-4'>Best Sellers</h3>
        {productsBySell.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>

      <div class='row'>
        <h3 className='display-3 mb-4'>New Arrivals</h3>
        {productsByArrival.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </Layout>
  );
}

export default Home;

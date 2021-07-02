import { useEffect, useState } from 'react';
import { getCategories } from 'api/category';
import Layout from 'components/Layout';
import Product from 'components/Product';
import Checkbox from 'components/Checkbox';

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  //   load categories from the api
  const fetchCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFilters = (filters, filterBy) => {
    console.log(filters, filterBy);
  };

  return (
    <Layout
      title='Shop'
      description='Search and find books of your choice.'
      className='container'
    >
      <div className='row'>
        <div className='col-4'>
          <h4 className=''>Filter by Categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>
        </div>
        <div className='col-8'>Right</div>
      </div>
    </Layout>
  );
}
import { useEffect, useState } from 'react';
import { getCategories } from 'api/category';
import Layout from 'components/Layout';
import Product from 'components/Product';
import Checkbox from 'components/Checkbox';
import RadioBox from 'components/RadioBox';
import { prices } from 'utils';

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
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
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
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

          <h4 className=''>Filter by Prices</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            />
          </div>
        </div>
        <div className='col-8'></div>
      </div>
    </Layout>
  );
}

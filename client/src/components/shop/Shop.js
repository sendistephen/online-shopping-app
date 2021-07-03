import { useEffect, useState } from 'react';
import { getCategories } from 'api/category';
import Layout from 'components/Layout';
import Product from 'components/Product';
import Checkbox from 'components/Checkbox';
import RadioBox from 'components/RadioBox';
import { prices } from 'utils';
import { fetchFilteredProducts } from 'api/product';
import { filter } from 'lodash';

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
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
  const loadFilteredResults = (newFilters) => {
    fetchFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
      }
    });
  };

  useEffect(() => {
    fetchCategories();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
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
        <div className='col-8'>
          <h4 className='mb-4'>Products</h4>
          <div className='row'>
            {filteredResults.map((product, i) => (
              <Product key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

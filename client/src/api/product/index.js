import queryString from 'query-string';
import { API } from 'config';

export const createProduct = async (userId, token, product) => {
  try {
    const res = await fetch(`${API}/products/create/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: product,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllProducts = async (sortBy) => {
  try {
    const res = await fetch(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
      {
        method: 'GET',
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchFilteredProducts = async (skip, limit, filters = {}) => {
  const data = { skip, limit, filters };
  try {
    const res = await fetch(`${API}/products/by/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const list = async (params) => {
  try {
    const query = queryString.stringify(params);
    const res = await fetch(`${API}/products/search?${query}`, {
      method: 'GET',
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const read = async (id) => {
  try {
    const res = await fetch(`${API}/products/${id}`, {
      method: 'GET',
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const listRelated = async (productId) => {
  try {
    const res = await fetch(`${API}/products/related/${productId}`, {
      method: 'GET',
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

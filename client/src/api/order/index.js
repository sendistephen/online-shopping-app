import { API } from 'config';

export const createOrder = async (userId, token, createOrderData) => {
  try {
    const res = await fetch(`${API}/order/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: createOrderData }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

import { useState } from 'react';

export default function RadioBox({ prices }) {
  const [value, setValue] = useState(0);
  const handleChange = () => {};
  return (
    <>
      {prices.map((product, index) => (
        <div key={index}>
          <input
            onChange={handleChange}
            value={`${product._id}`}
            type='radio'
            className='me-2 ms-4'
          />
          <label htmlFor='name' className='form-check-label'>
            {product.name}
          </label>
        </div>
      ))}
    </>
  );
}

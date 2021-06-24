import { Layout } from 'components';
import { API } from 'config';
import React, { useState } from 'react';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
  });
  const { name, email, password } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const signup = (user) => {
    fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };

  const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='name' className='text-muted'>
          Name
        </label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='email' className='text-muted'>
          Email
        </label>
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
        />
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='password' className='text-muted'>
          Password
        </label>
        <input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
        />
      </div>
      <button className='btn btn-primary mt-3'>Sign up</button>
    </form>
  );
  return (
    <Layout
      title='Signup'
      description='Register for an account to get started'
      className='container col-md-4 offset-md-4'
    >
      {signupForm()}
    </Layout>
  );
}

export default Signup;

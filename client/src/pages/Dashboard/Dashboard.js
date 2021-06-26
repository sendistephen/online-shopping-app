import { isAuthenticated } from 'api/auth';
import { Layout } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const {
    foundUser: { name, email, role },
  } = isAuthenticated();

  const userLinks = () => (
    <div className='card'>
      <h5 className='card-header'>User Links</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link className='nav-link' to='/cart'>
            Cart
          </Link>
        </li>
        <li className='list-group-item'>
          <Link className='nav-link' to='/profile/update'>
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      className='container'
      title='Dashboard'
      description={`Hey ${name}!`}
    >
      <div className='row'>
        <div className='col-md-3'>{userLinks()}</div>
        <div className='col-md-9'>
          <div className='card mb-5'>
            <h5 className='card-header'>User Information</h5>
            <ul className='list-group'>
              <li className='list-group-item'>{name}</li>
              <li className='list-group-item'>{email}</li>
              <li className='list-group-item'>
                {role === 1 ? 'Admin' : 'Registered User'}
              </li>
            </ul>
          </div>
          <div className='card'>
            <h5 className='card-header'>Purchase history</h5>
            <ul className='list-group'>
              <li className='list-group-item'>history</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

import { AdminRoute, PrivateRoute } from 'components';
import {
  AdminDashboard,
  CreateCategory,
  Dashboard,
  Home,
  Signin,
  Signup,
} from 'pages';

import { Switch, Route } from 'react-router-dom';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/signin' component={Signin} />
      <PrivateRoute exact path='/user/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/admin/dashboard' component={AdminDashboard} />
      <AdminRoute
        exact
        path='/admin/category/create'
        component={CreateCategory}
      />
    </Switch>
  );
};

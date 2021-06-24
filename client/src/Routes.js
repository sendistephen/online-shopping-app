import { Home, Signup } from 'pages';

import { Switch, Route } from 'react-router-dom';

export const Routes = () => {
  return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
  );
};
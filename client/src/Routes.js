import Navbar from 'components/Navbar';
import { Signup } from 'pages';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Navbar />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
};

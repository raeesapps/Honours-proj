import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import NavigationBar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import routes from '../routes/routes';

class Layout extends React.Component {
  static createRouteTag(route) {
    return (
      <Route
        key={route.name}
        exact
        path={route.path}
        render={(props) => <route.component {...props} />}
      />
    );
  }

  render() {
    return (
      <>
        <NavigationBar />
        <br />
        <Switch>
          {routes.map(Layout.createRouteTag)}
        </Switch>
        <br />
        <br />
        <br />
        <br />
        <Footer />

      </>
    );
  }
}

export default withRouter(Layout);

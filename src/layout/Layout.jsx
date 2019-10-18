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
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <div style={{ paddingBottom: '8rem' }}>
          <NavigationBar />
          <br />
          <Switch>
            {routes.map(Layout.createRouteTag)}
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Layout);

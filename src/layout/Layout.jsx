import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

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
      <Switch>
        {routes.map((route) => Layout.createRouteTag(route))}
      </Switch>
    );
  }
}

export default withRouter(Layout);

import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import Footer from '../components/Footer/Footer';
import NavDrawer from '../components/NavDrawer/NavDrawer';
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
    const { classes } = this.props;
    return (
      <div className={classes.appFrame}>
        <NavDrawer routes={routes} />
        <main className={classes.content}>
          <Switch>
            {routes.map(Layout.createRouteTag)}
          </Switch>
          <Footer />
        </main>
      </div>
    );
  }
}

export default withRouter(withStyles({})(Layout));

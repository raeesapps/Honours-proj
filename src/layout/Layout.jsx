import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { withStyles, ThemeProvider } from '@material-ui/core/styles';

import Footer from '../components/Footer/Footer';
import NavDrawer from '../components/NavDrawer/NavDrawer';
import routes from '../routes/routes';

import theme from '../assets/theme';

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

  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { width } = this.state;
    const { classes } = this.props;
    const limitedWidth = (width * 0.0105) > 9 ? 9 : width * 0.0105;
    return (
      <ThemeProvider theme={theme}>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <div style={{ paddingBottom: `${limitedWidth}rem` }}>
            <div className={classes.appFrame}>
              <NavDrawer routes={routes} />
              <main className={classes.content}>
                <Switch>
                  {routes.map(Layout.createRouteTag)}
                </Switch>
                <Footer />
              </main>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(withStyles({})(Layout));

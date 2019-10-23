import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

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
    const limitedWidth = (width * 0.0105) > 9 ? 9 : width * 0.0105;
    return (
      <Container>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <div style={{ paddingBottom: `${limitedWidth}rem` }}>
            <NavigationBar />
            <br />
            <Switch>
              {routes.map(Layout.createRouteTag)}
            </Switch>
          </div>
          <Footer />
        </div>
      </Container>
    );
  }
}

export default withRouter(Layout);

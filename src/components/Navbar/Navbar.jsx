import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { Link } from 'react-router-dom';

import routes from '../../routes/routes';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Soak Up Syllogisms</NavbarBrand>
          <NavbarToggler onClick={(this.toggle)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {
                routes.map((route) => (
                  <NavItem>
                    <NavLink tag={Link} to={route.path}>
                      {route.name}
                    </NavLink>
                  </NavItem>
                ))
              }
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavigationBar;

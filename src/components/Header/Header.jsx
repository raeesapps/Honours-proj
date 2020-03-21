import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styles from '../../assets/components/jss/Header/header_styles';

function Header(props) {
  const { classes, routes, ...rest } = props;

  return (
    <div className={classes.root} {...rest}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap>
            Soak Up Syllogisms
          </Typography>
          {
            routes.map((route) => (
              <Button variant="contained" color="primary" key={route.name} className={classes.link} component={RouterLink} to={route.path}>
                {route.name}
              </Button>
            ))
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(React.memo(Header));

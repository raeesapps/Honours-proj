import React from 'react';
import { NavLink } from 'react-router-dom'

import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import styles from '../../assets/components/jss/NavDrawer/nav_drawer_styles';

class NavDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, routes } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.onOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Soak Up Syllogisms
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {routes.map((prop) => {
              const isCurrPath = window.location.pathname === prop.path;
              return (
                <NavLink
                  to={prop.path}
                  className={classes.links}
                  activeClassName={classes.selected}
                  key={prop.name}
                >
                  <ListItem
                    button
                    key={prop.name}
                    className={clsx({
                      [classes.listItem]: true,
                      [classes.selected]: isCurrPath,
                    })}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        className: isCurrPath ? classes.listItemTextSelected : classes.listItemText
                      }}
                    >
                      {prop.name}
                    </ListItemText>
                  </ListItem>
                </NavLink>
              );
            })}
          </List>

        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        />
      </div>
    );
  }
}

export default withStyles(styles)(NavDrawer);

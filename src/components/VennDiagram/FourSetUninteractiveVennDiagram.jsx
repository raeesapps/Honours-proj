import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createFourSetEllipticVennDiagram,
  ellipses,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/four_set_uninteractive_venn_diagram_styles';
class FourSetUninteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
      d: null,
    };
    this.applyShadings = this.applyShadings.bind(this);
  }

  componentDidMount() {
    this.div = createFourSetEllipticVennDiagram('ellipseVenn', ellipses);
  }

  applyShadings(argument) {
  }

  render() {
    const { classes } = this.props;
    const { a, b, c, d } = this.state;
    return (
      <div className={classes.content}>
        <Typography variant="body1" className={classes.topLeft}>
          {a}
        </Typography>
        <Typography variant="body1" className={classes.topRight}>
          {b}
        </Typography>
        <Typography variant="body1" className={classes.bottomLeft}>
          {c}
        </Typography>
        <Typography variant="body1" className={classes.bottomRight}>
          {d}
        </Typography>
        <div id="ellipseVenn" />
      </div>
    );
  }
}

export default withStyles(styles)(FourSetUninteractiveVennDiagram);
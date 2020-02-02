/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createFourSetEllipticVennDiagram,
  getShadings,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/four_set_interactive_venn_diagram_styles';

class FourSetInteractiveVennDiagram extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
      d: null,
    };
  }

  componentDidMount() {
    const { premises } = this.props;

    this.setState({
      a: premises.terms[0],
      b: premises.terms[1],
      c: premises.terms[2],
      d: premises.terms[3],
    });

    const div = createFourSetEllipticVennDiagram('ellipseVenn', true);
    this.div = div;
  }

  getShadings = () => {
    const {
      a,
      b,
      c,
      d,
    } = this.state;

    return getShadings(this.div, 4, a, b, c, d);
  }

  render() {
    const { classes, ...rest } = this.props;
    const {
      a,
      b,
      c,
      d,
    } = this.state;
    return (
      <div className={classes.content} {...rest}>
        <Typography variant="body1" className={classes.topLeft}>
          {a && a.length === 1 ? a : 'A'}
        </Typography>
        <Typography variant="body1" className={classes.topRight}>
          {b && b.length === 1 ? b : 'B'}
        </Typography>
        <Typography variant="body1" className={classes.bottomLeft}>
          {c && c.length === 1 ? c : 'C'}
        </Typography>
        <Typography variant="body1" className={classes.bottomRight}>
          {d && d.length === 1 ? d : 'D'}
        </Typography>
        <div id="ellipseVenn" />
      </div>
    );
  }
}

export default withStyles(styles)(FourSetInteractiveVennDiagram);

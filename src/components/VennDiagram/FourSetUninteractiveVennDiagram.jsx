/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createFourSetEllipticVennDiagram,
  fourSetEllipses,
  applyShadings,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/four_set_uninteractive_venn_diagram_styles';

class FourSetUninteractiveVennDiagram extends React.PureComponent {
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
    this.div = createFourSetEllipticVennDiagram('ellipseVenn', fourSetEllipses);
  }

  applyShading = (premiseCollection) => {
    const [a, b, c, d] = premiseCollection.terms;

    // eslint-disable-next-line react/destructuring-assignment
    if (!(this.state.a && this.state.b && this.state.c && this.state.d)) {
      this.setState({
        a,
        b,
        c,
        d,
      });
    }

    applyShadings(this.div, premiseCollection);
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
      <div {...rest}>
        <div className={classes.content}>
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
        {
          (a && b && c && d && a.length > 1 && b.length > 1 && c.length > 1 && d.length > 1)
          && (
            <div>
              <Typography variant="h5">
                where A = {a}
              </Typography>
              <Typography variant="h5">
                where B = {b}
              </Typography>
              <Typography variant="h5">
                where C = {c}
              </Typography>
              <Typography variant="h5">
                where D = {d}
              </Typography>
            </div>
          )
        }
      </div>
    );
  }
}

export default withStyles(styles)(FourSetUninteractiveVennDiagram);

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

class FourSetUninteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
      d: null,
    };
    this.applyShading = this.applyShading.bind(this);
  }

  componentDidMount() {
    this.div = createFourSetEllipticVennDiagram('ellipseVenn', fourSetEllipses);
  }

  applyShading(premiseCollection) {
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
    const { classes, ...otherProps } = this.props;
    const {
      a,
      b,
      c,
      d,
    } = this.state;
    return (
      <div {...otherProps}>
        <div className={classes.content}>
          <Typography variant="body1" className={classes.topLeft}>
            A
          </Typography>
          <Typography variant="body1" className={classes.topRight}>
            B
          </Typography>
          <Typography variant="body1" className={classes.bottomLeft}>
            C
          </Typography>
          <Typography variant="body1" className={classes.bottomRight}>
            D
          </Typography>
          <div id="ellipseVenn" />
        </div>
        {
          (a && b && c && d)
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

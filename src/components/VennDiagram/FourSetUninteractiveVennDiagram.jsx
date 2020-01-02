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

    if (!(this.state.a && this.state.b && this.state.c && this.state.d)) {
      this.setState({ a, b, c, d });
    }

    applyShadings(this.div, premiseCollection);
  }

  render() {
    const { classes } = this.props;
    const {
      a,
      b,
      c,
      d,
    } = this.state;
    return (
      <div className={classes.content}>
        {
          (a && b && c && d)
          && (
            <div>
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
            </div>
          )
        }
        <div id="ellipseVenn" />
      </div>
    );
  }
}

export default withStyles(styles)(FourSetUninteractiveVennDiagram);

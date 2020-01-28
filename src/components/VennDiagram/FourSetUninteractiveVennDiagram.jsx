/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createFourSetEllipticVennDiagram,
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
    this.div = createFourSetEllipticVennDiagram('ellipseVenn');
  }

  applyShading = (premiseCollection, mappings) => {
    const [a, b, c, d] = premiseCollection.terms;

    if (mappings) {
      this.setState({
        a: mappings[a],
        b: mappings[b],
        c: mappings[c],
        d: mappings[d],
      });
    } else {
      this.setState({ a, b, c, d });
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
      <div className={classes.content} {...rest}>
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

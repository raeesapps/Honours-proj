/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import * as d3 from 'd3';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  NOT_SHADED,
  createFourSetEllipticVennDiagram,
  fourSetEllipses,
  mapRegion,
  bindMouseEventListeners,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/four_set_interactive_venn_diagram_styles';

class FourSetInteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
      d: null,
    };
    this.getShadings = this.getShadings.bind(this);
  }

  componentDidMount() {
    const { premises } = this.props;

    this.setState({
      a: premises.terms[0],
      b: premises.terms[1],
      c: premises.terms[2],
      d: premises.terms[3],
    });

    const div = createFourSetEllipticVennDiagram('ellipseVenn', fourSetEllipses, bindMouseEventListeners);
    this.div = div;
  }

  getShadings() {
    const {
      a,
      b,
      c,
      d,
    } = this.state;

    const mappings = {};
    this.div.selectAll('path').each(function onEach() {
      const node = d3.select(this);
      const nodeId = node.attr('id');
      const nodeShaded = node.attr('shaded') || NOT_SHADED;
      const mappedId = mapRegion(nodeId, a, b, c, d);

      mappings[mappedId] = nodeShaded;
    });

    return mappings;
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
      <div>
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
    );
  }
}

export default withStyles(styles)(FourSetInteractiveVennDiagram);

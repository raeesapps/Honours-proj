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

    const compartments = premises.getSets();
    const filteredCompartments = compartments.filter((compartment) => {
      const { sets } = compartment;
      return sets.length === 4;
    });

    if (filteredCompartments.length !== 1) {
      throw new Error('Something went wrong!');
    }

    const variables = filteredCompartments[0].sets;

    this.setState({
      a: variables[0],
      b: variables[1],
      c: variables[2],
      d: variables[3],
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

export default withStyles(styles)(FourSetInteractiveVennDiagram);

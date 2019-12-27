import React from 'react';

import * as d3 from 'd3';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  NOT_SHADED,
  MAYBE_SHADED,
  SHADED,
  createFourSetEllipticVennDiagram,
  ellipses,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/four_set_interactive_venn_diagram_styles';

function bindMouseEventListeners(div) {
  div
    .on('mouseover', function onMouseover() {
      const node = d3.select(this);
      const nodeShaded = node.attr('shaded') || NOT_SHADED;

      node.style('cursor', 'pointer');
      node.attr('fill-opacity', 0.2);

      if (nodeShaded === NOT_SHADED) {
        node.attr('fill', '#009fdf');
      } else if (nodeShaded === MAYBE_SHADED) {
        node.attr('fill', '#000000');
      } else if (nodeShaded === SHADED) {
        node.attr('fill', '#ff0000');
      }
    })
    .on('mouseout', function onMouseout() {
      const node = d3.select(this);
      const nodeShaded = node.attr('shaded') || NOT_SHADED;
      if (nodeShaded === null) {
        node.attr('shaded', NOT_SHADED);
      }

      node.style('cursor', 'default');

      if (nodeShaded === NOT_SHADED) {
        node.attr('fill', '#ffffff');
        node.attr('fill-opacity', 0.2);
      } else if (nodeShaded === MAYBE_SHADED) {
        node.attr('fill', '#000000');
        node.attr('fill-opacity', 1);
      } else if (nodeShaded === SHADED) {
        node.attr('fill', '#ff0000');
        node.attr('fill-opacity', 1);
      }
    })
    .on('click', function onClick() {
      const node = d3.select(this);
      const nodeShaded = node.attr('shaded') || NOT_SHADED;

      if (nodeShaded === NOT_SHADED) {
        node.attr('fill', '#000000');
        node.attr('fill-opacity', 1);
      } else if (nodeShaded === MAYBE_SHADED) {
        node.attr('fill', '#ff0000');
        node.attr('fill-opacity', 1);
      } else if (nodeShaded === SHADED) {
        node.attr('fill', '#ffffff');
        node.attr('fill-opacity', 0.2);
      }
      node.attr('shaded', (parseInt(nodeShaded) + 1) % 3);
    });
}
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

    const div = createFourSetEllipticVennDiagram('ellipseVenn', ellipses, bindMouseEventListeners);
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

      let mappedId = nodeId;

      if (nodeId.includes('A')) {
        const indexOfA = mappedId.indexOf('A');
        mappedId = `${mappedId.substring(0, indexOfA)}${a}${mappedId.substring(indexOfA + 1)}`;
      }

      if (nodeId.includes('B')) {
        const indexOfB = mappedId.indexOf('B');
        mappedId = `${mappedId.substring(0, indexOfB)}${b}${mappedId.substring(indexOfB + 1)}`;
      }

      if (nodeId.includes('C')) {
        const indexOfC = mappedId.indexOf('C');
        mappedId = `${mappedId.substring(0, indexOfC)}${c}${mappedId.substring(indexOfC + 1)}`;
      }

      if (nodeId.includes('D')) {
        const indexOfD = mappedId.indexOf('D');
        mappedId = `${mappedId.substring(0, indexOfD)}${d}${mappedId.substring(indexOfD + 1)}`;
      }

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

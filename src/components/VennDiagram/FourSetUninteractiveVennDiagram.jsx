import React from 'react';

import * as d3 from 'd3';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createFourSetEllipticVennDiagram,
  ellipses,
  mapRegion,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/four_set_uninteractive_venn_diagram_styles';

const shadings = Object.freeze({
  BLACK: 0,
  RED: 1,
});

function shadeRegions(div, region, shading) {
  div.selectAll('path').each(function each() {
    const { RED, BLACK } = shadings;
    const node = d3.select(this);
    const nodeRegion = node.attr('id');
    if (nodeRegion === region) {
      switch (shading) {
        case RED:
          node.attr('fill', '#ff0000');
          node.attr('fill-opacity', 1);
          break;
        case BLACK:
          node.attr('fill', '#000000');
          node.attr('fill-opacity', 1);
          break;
        default:
          break;
      }
    }
  });
}

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
    this.div = createFourSetEllipticVennDiagram('ellipseVenn', ellipses);
  }

  applyShading(premiseCollection) {
    const { BLACK, RED } = shadings;
    const [a, b, c, d] = premiseCollection.terms;

    if (!(this.state.a && this.state.b && this.state.c && this.state.d)) {
      this.setState({ a, b, c, d });
    }

    const mappings = {};
    this.div.selectAll('path').each(function each() {
      const node = d3.select(this);
      const nodeRegion = node.attr('id');
      const mappedRegion = mapRegion(nodeRegion, a, b, c, d);

      mappings[mappedRegion] = null;
    });
    const resolvedColumn = premiseCollection.unifyAndResolve();
    const premiseCollectionVennDiagramParts = premiseCollection.getVennDiagramParts();
    premiseCollectionVennDiagramParts.forEach((premiseCollectionVennDiagramPart) => {
      const { compartment, vennDiagramPart } = premiseCollectionVennDiagramPart;
      const resolvedValueArray = resolvedColumn[compartment.hashCode()];

      if (resolvedValueArray.length) {
        const vennDiagramPartSplit = vennDiagramPart.split('\\');
        const leftPart = vennDiagramPartSplit[0];

        if (!(leftPart in mappings)) {
          throw new Error(`Shading algorithm failed! ${leftPart} not found in ${JSON.stringify(mappings)}`);
        }

        const shading = resolvedValueArray[0] === 'e' ? BLACK : RED;
        mappings[leftPart] = shading;
      }
    });
    Object.keys(mappings).forEach((mapping) => {
      shadeRegions(this.div, mapping, mappings[mapping]);
    });
  }

  render() {
    const { classes } = this.props;
    const { a, b, c, d } = this.state;
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

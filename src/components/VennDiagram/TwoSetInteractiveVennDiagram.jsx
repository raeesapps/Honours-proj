/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import * as d3 from 'd3';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  NOT_SHADED,
  MAYBE_SHADED,
  SHADED,
  createTwoSetCircularVennDiagram,
  twoSetCircles,
  mapRegion,
  generateMappingObjects,
  bindMouseEventListeners,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/two_set_interactive_venn_diagram_styles';

class TwoSetInteractiveVennDiagram extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
    };
    this.getShadings = this.getShadings.bind(this);
  }

  componentDidMount() {
    const { title, premise, shadings } = this.props;

    const { firstTerm, secondTerm } = premise.terms;

    this.setState({
      a: firstTerm,
      b: secondTerm,
    });

    const id = title.split(' ').join('');
    const div = createTwoSetCircularVennDiagram(id, twoSetCircles, bindMouseEventListeners);
    this.div = div;

    if (shadings) {
      const { nodeRegionToMappedRegionMapping } = generateMappingObjects(div, firstTerm, secondTerm);

      Object.keys(shadings).forEach((mapping) => {
        div.selectAll('path').each(function each() {
          const node = d3.select(this);
          const nodeRegion = node.attr('id');
          const mappedRegion = nodeRegionToMappedRegionMapping[nodeRegion];
          const shading = shadings[mapping];
          if (mapping === mappedRegion) {
            switch (shading) {
              case MAYBE_SHADED:
                node.attr('fill', '#000000');
                node.attr('fill-opacity', 1);
                node.attr('shaded', MAYBE_SHADED);
                break;
              case SHADED:
                node.attr('fill', '#ff0000');
                node.attr('fill-opacity', 1);
                node.attr('shaded', SHADED);
                break;
              case NOT_SHADED:
                node.attr('shaded', NOT_SHADED);
                break;
              default:
                break;
            }
          }
        });
      });
    }
  }

  getShadings() {
    const {
      a,
      b,
    } = this.state;

    const mappings = {};
    this.div.selectAll('path').each(function each() {
      const node = d3.select(this);
      const nodeId = node.attr('id');
      const nodeShaded = node.attr('shaded') || NOT_SHADED;
      const mappedId = mapRegion(nodeId, a, b);

      mappings[mappedId] = nodeShaded;
    });

    return mappings;
  }

  render() {
    const { classes, title, ...rest } = this.props;
    const { a, b } = this.state;
    const id = title.split(' ').join('');
    return (
      <div className={classes.content} {...rest}>
        <Typography variant="body1" className={classes.topLeft}>
          {a && a.length === 1 ? a : 'A'}
        </Typography>
        <Typography variant="body1" className={classes.topRight}>
          {b && b.length === 1 ? b : 'B'}
        </Typography>
        <div id={id} />
        {
          (a && b && a.length > 1 && b.length > 1)
          && (
            <div>
              <Typography variant="h5">
                where A = {a}
              </Typography>
              <Typography variant="h5">
                where B = {b}
              </Typography>
            </div>
          )
        }
      </div>
    );
  }
}

export default withStyles(styles)(TwoSetInteractiveVennDiagram);

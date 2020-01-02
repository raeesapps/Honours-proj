import React from 'react';

import * as d3 from 'd3';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  NOT_SHADED,
  createThreeSetCircularVennDiagram,
  threeSetCircles,
  mapRegion,
  bindMouseEventListeners,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/three_set_interactive_venn_diagram_styles';

class ThreeSetInteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
    };
    this.getShadings = this.getShadings.bind(this);
  }

  componentDidMount() {
    const { title, premises } = this.props;

    this.setState({
      a: premises.terms[0],
      b: premises.terms[1],
      c: premises.terms[2],
    });

    const id = title.split(' ').join('');
    const div = createThreeSetCircularVennDiagram(id, threeSetCircles, bindMouseEventListeners);
    this.div = div;
  }

  getShadings() {
    const {
      a,
      b,
      c,
    } = this.state;

    const mappings = {};
    this.div.selectAll('path').each(function each() {
      const node = d3.select(this);
      const nodeId = node.attr('id');
      const nodeShaded = node.attr('shaded') || NOT_SHADED;
      const mappedId = mapRegion(nodeId, a, b, c);

      mappings[mappedId] = nodeShaded;
    });

    return mappings;
  }

  render() {
    const { classes, title } = this.props;
    const { a, b, c } = this.state;
    const id = title.split(' ').join('');
    return (
      <div className={classes.content}>
        {
          (a && b && c)
          && (
            <div>
              <Typography variant="body1" className={classes.topRight}>
                {a}
              </Typography>
              <Typography variant="body1" className={classes.bottomLeft}>
                {b}
              </Typography>
              <Typography variant="body1" className={classes.bottomRight}>
                {c}
              </Typography>
            </div>
          )
        }
        <div id={id} />
      </div>
    );
  }
}

export default withStyles(styles)(ThreeSetInteractiveVennDiagram);

import React from 'react';

import * as d3 from 'd3';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  NOT_SHADED,
  createThreeSetCircularVennDiagram,
  mapRegion,
  bindMouseEventListeners,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/three_set_interactive_venn_diagram_styles';

class ThreeSetInteractiveVennDiagram extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
    };
  }

  componentDidMount() {
    const { title, premises } = this.props;

    this.setState({
      a: premises.terms[0],
      b: premises.terms[1],
      c: premises.terms[2],
    });

    const id = title.split(' ').join('');
    const div = createThreeSetCircularVennDiagram(id, bindMouseEventListeners);
    this.div = div;
  }

  getShadings = () => {
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
    const { classes, title, ...rest } = this.props;
    const { a, b, c } = this.state;
    const id = title.split(' ').join('');
    return (
      <div {...rest}>
        <div className={classes.content}>
          <Typography variant="body1" className={classes.topRight}>
            {a && a.length === 1 ? a : 'A'}
          </Typography>
          <Typography variant="body1" className={classes.bottomLeft}>
            {b && b.length === 1 ? b : 'B'}
          </Typography>
          <Typography variant="body1" className={classes.bottomRight}>
            {c && c.length === 1 ? c : 'C'}
          </Typography>
          <div id={id} />
        </div>
        {
          (a && b && c && a.length > 1 && b.length > 1 && c.length > 1)
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
            </div>
          )
        }
      </div>
    );
  }
}

export default withStyles(styles)(ThreeSetInteractiveVennDiagram);

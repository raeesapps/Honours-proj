import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createThreeSetCircularVennDiagram,
  threeSetCircles,
  applyShadings,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/three_set_uninteractive_venn_diagram_styles';

class ThreeSetUninteractiveVennDiagram extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
    };
  }

  componentDidMount() {
    const { title } = this.props;
    const id = title.split(' ').join('');
    this.div = createThreeSetCircularVennDiagram(id, threeSetCircles);
  }

  applyShading = (premiseCollection) => {
    const [a, b, c] = premiseCollection.terms;

    if (!(this.state.a && this.state.b && this.state.c)) {
      this.setState({ a, b, c });
    }

    applyShadings(this.div, premiseCollection);
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

export default withStyles(styles)(ThreeSetUninteractiveVennDiagram);

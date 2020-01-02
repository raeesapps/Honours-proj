import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createThreeSetCircularVennDiagram,
  threeSetCircles,
  applyShadings,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/three_set_uninteractive_venn_diagram_styles';

class ThreeSetUninteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
      c: null,
    };
    this.applyShading = this.applyShading.bind(this);
  }

  componentDidMount() {
    const { title } = this.props;
    const id = title.split(' ').join('');
    this.div = createThreeSetCircularVennDiagram(id, threeSetCircles);
  }

  applyShading(premiseCollection) {
    const [a, b, c] = premiseCollection.terms;

    if (!(this.state.a && this.state.b && this.state.c)) {
      this.setState({ a, b, c });
    }

    applyShadings(this.div, premiseCollection);
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

export default withStyles(styles)(ThreeSetUninteractiveVennDiagram);

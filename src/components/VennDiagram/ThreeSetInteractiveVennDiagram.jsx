import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createThreeSetCircularVennDiagram,
  getShadings,
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
    const div = createThreeSetCircularVennDiagram(id, true);
    this.div = div;
  }

  getShadings = () => {
    const {
      a,
      b,
      c,
    } = this.state;

    return getShadings(this.div, 3, a, b, c);
  }

  render() {
    const { classes, title, ...rest } = this.props;
    const { a, b, c } = this.state;
    const id = title.split(' ').join('');
    return (
      <div className={classes.content} {...rest}>
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
    );
  }
}

export default withStyles(styles)(ThreeSetInteractiveVennDiagram);

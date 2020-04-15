import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { createThreeSetCircularVennDiagram, applyShadings } from './venn_utils';

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
    this.div = createThreeSetCircularVennDiagram(id);
  }

  applyShading = (propositionCollection, mappings) => {
    const [a, b, c] = propositionCollection.terms.sort();

    if (mappings) {
      this.setState({
        a: mappings[a],
        b: mappings[b],
        c: mappings[c],
      });
    } else {
      this.setState({ a, b, c });
    }
    applyShadings(this.div, propositionCollection, a, b, c);
  }

  render() {
    const { classes, title, ...rest } = this.props;
    const { a, b, c } = this.state;
    const id = title.split(' ').join('');
    return (
      <div className={classes.content} {...rest}>
        <Typography variant="body1" className={classes.topRight}>
          {a}
        </Typography>
        <Typography variant="body1" className={classes.bottomLeft}>
          {b}
        </Typography>
        <Typography variant="body1" className={classes.bottomRight}>
          {c}
        </Typography>
        <div id={id} />
      </div>
    );
  }
}

export default withStyles(styles)(ThreeSetUninteractiveVennDiagram);

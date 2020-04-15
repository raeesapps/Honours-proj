/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  TWO_SET_CIRCLES_ORIENTATION,
  createTwoSetVerticalCircularVennDiagram,
  createTwoSetHorizontalCircularVennDiagram,
  getShadings,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/two_set_interactive_venn_diagram_styles';

const { HORIZONTAL, VERTICAL } = TWO_SET_CIRCLES_ORIENTATION;

class TwoSetInteractiveVennDiagram extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
    };
  }

  componentDidMount() {
    const {
      title,
      proposition,
      orientation,
      disableLongClick,
    } = this.props;

    const { firstTerm, secondTerm } = proposition.terms;

    this.setState({
      a: firstTerm,
      b: secondTerm,
    });

    const id = title.split(' ').join('');
    let div;

    switch (orientation) {
      case HORIZONTAL:
        div = createTwoSetHorizontalCircularVennDiagram(id, true, !!disableLongClick);
        break;
      case VERTICAL:
        div = createTwoSetVerticalCircularVennDiagram(id, true, !!disableLongClick);
        break;
      default:
        break;
    }
    this.div = div;
  }

  getShadings = () => {
    const {
      a,
      b,
    } = this.state;

    return getShadings(this.div, 2, a, b);
  }

  render() {
    const { classes, title, orientation, ...rest } = this.props;
    const { a, b } = this.state;
    const id = title.split(' ').join('');
    const bClass = orientation === HORIZONTAL ? classes.bHorizontal : classes.bVertical;
    return (
      <div className={classes.content} {...rest}>
        <Typography variant="body1" className={classes.topLeft}>
          {a && a.length === 1 ? a : 'A'}
        </Typography>
        <Typography variant="body1" className={bClass}>
          {b && b.length === 1 ? b : 'B'}
        </Typography>
        <div id={id} />
      </div>
    );
  }
}

export default withStyles(styles)(TwoSetInteractiveVennDiagram);

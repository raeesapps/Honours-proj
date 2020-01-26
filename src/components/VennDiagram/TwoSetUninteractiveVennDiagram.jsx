/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  TWO_SET_CIRCLES_ORIENTATION,
  createTwoSetHorizontalCircularVennDiagram,
  createTwoSetVerticalCircularVennDiagram,
  generateMappingObjects,
  shadeRegion,
  applyShadings,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/two_set_uninteractive_venn_diagram_styles';

const { HORIZONTAL, VERTICAL } = TWO_SET_CIRCLES_ORIENTATION;

class TwoSetUninteractiveVennDiagram extends React.PureComponent {
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
      shadings,
      orientation,
      terms,
    } = this.props;
    const id = title.split(' ').join('');
    let div;

    switch (orientation) {
      case HORIZONTAL:
        div = createTwoSetHorizontalCircularVennDiagram(id);
        break;
      case VERTICAL:
        div = createTwoSetVerticalCircularVennDiagram(id);
        break;
      default:
        break;
    }

    this.div = div;

    if (shadings) {
      const { firstTerm, secondTerm } = terms;
      const { nodeRegionToMappedRegionMapping } = generateMappingObjects(div, firstTerm, secondTerm);
      Object.keys(shadings).forEach((mapping) => {
        shadeRegion(div, mapping, nodeRegionToMappedRegionMapping, shadings[mapping]);
      });

      this.setState({ a: firstTerm, b: secondTerm });
    }
  }

  applyShading = (premiseCollection) => {
    applyShadings(this.div, premiseCollection);
    this.setState({ a: premiseCollection.terms[0], b: premiseCollection.terms[1] });
  }

  render() {
    const {
      classes,
      title,
      orientation,
      ...rest
    } = this.props;
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

export default withStyles(styles)(TwoSetUninteractiveVennDiagram);

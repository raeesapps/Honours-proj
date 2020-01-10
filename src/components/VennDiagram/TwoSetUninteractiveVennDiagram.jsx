/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  createTwoSetCircularVennDiagram,
  generateMappingObjects,
  shadeRegion,
  twoSetCircles,
  applyShadings,
} from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/two_set_uninteractive_venn_diagram_styles';

class TwoSetUninteractiveVennDiagram extends React.Component {
  constructor() {
    super();

    this.state = {
      a: null,
      b: null,
    };

    this.applyShading = this.applyShading.bind(this);
  }

  componentDidMount() {
    const { title, shadings, terms } = this.props;
    const id = title.split(' ').join('');
    const div = createTwoSetCircularVennDiagram(id, twoSetCircles);
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

  applyShading(premiseCollection) {
    applyShadings(this.div, premiseCollection);
    this.setState({ a: premiseCollection.terms[0], b: premiseCollection.terms[1] });
  }

  render() {
    const {
      classes,
      title,
      displayKey,
      ...otherProps,
    } = this.props;
    const { a, b } = this.state;
    const id = title.split(' ').join('');
    return (
      <div className={classes.content} {...otherProps}>
        <Typography variant="body1" className={classes.topLeft}>
          A
        </Typography>
        <Typography variant="body1" className={classes.topRight}>
          B
        </Typography>
        <div id={id} />
        {
          (a && b && displayKey)
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

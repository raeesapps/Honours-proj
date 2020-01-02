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
    }
  }

  applyShading(premiseCollection) {
    applyShadings(this.div, premiseCollection);
  }

  render() {
    const {
      classes,
      title,
      terms,
    } = this.props;
    const { firstTerm, secondTerm } = terms;
    const id = title.split(' ').join('');
    return (
      <div className={classes.content}>
        {
          (firstTerm && secondTerm)
          && (
            <div>
              <Typography variant="body1" className={classes.topLeft}>
                {firstTerm}
              </Typography>
              <Typography variant="body1" className={classes.topRight}>
                {secondTerm}
              </Typography>
            </div>
          )
        }
        <div id={id} />
      </div>
    );
  }
}

export default withStyles(styles)(TwoSetUninteractiveVennDiagram);

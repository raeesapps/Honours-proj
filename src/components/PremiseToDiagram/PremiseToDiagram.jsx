import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { stages, validate } from '../../logic/premise_validator';

import InteractiveVennDiagram from '../VennDiagram/InteractiveVennDiagram';

class PremiseToDiagram extends React.Component {
  constructor() {
    super();
    this.vennDiagramRef = React.createRef();

    this.validate = this.validate.bind(this);
    this.toSentenceAndVennDiagram = this.toSentenceAndVennDiagram.bind(this);
  }

  validate() {
    const { REPRESENTATION_STAGE } = stages;
    const { vennDiagramRef } = this;
    const { premise } = this.props;

    return validate([premise], [vennDiagramRef], REPRESENTATION_STAGE);
  }

  toSentenceAndVennDiagram(premise) {
    const { vennDiagramRef } = this;
    const { vennDiagramShading } = this.props;

    const title = premise.toSentence();

    return (
      <Grid item xs={5}>
        <Typography variant="subtitle2">
          {
            title
          }
        </Typography>
        <InteractiveVennDiagram title={`${title}rep`} premise={premise} ref={vennDiagramRef} shadings={vennDiagramShading} />
      </Grid>
    );
  }

  render() {
    const { premise } = this.props;

    return (
      <div>
        <Grid container>
          {
            this.toSentenceAndVennDiagram(premise)
          }
        </Grid>
      </div>
    );
  }
}

export default PremiseToDiagram;

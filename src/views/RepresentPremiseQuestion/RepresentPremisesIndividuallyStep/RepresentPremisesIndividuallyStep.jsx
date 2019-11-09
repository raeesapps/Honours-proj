import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Premise, forms } from '../../../logic/premise';
import { stages, validate } from '../premise_validator';
import InteractiveVennDiagram from '../../../components/VennDiagram/InteractiveVennDiagram';

import styles from '../../../assets/views/jss/RepresentPremises/RepresemtPremisesIndividuallyStep/represent_premises_individually_step_styles';

class RepresentPremisesIndividuallyStep extends React.Component {
  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.toSentenceAndVennDiagram = this.toSentenceAndVennDiagram.bind(this);
  }

  validate() {
    const { REPRESENTATION_STAGE } = stages;
    const { premises, refs } = this.props;

    return validate(premises, refs, REPRESENTATION_STAGE);
  }

  toSentenceAndVennDiagram(premise, idx) {
    let { refs, vennDiagramShadings } = this.props;

    vennDiagramShadings = vennDiagramShadings || { vennDiagramShadings: [] };
    const title = `venn${idx.toString()}`;

    return (
      <Grid item xs={5}>
        <Typography variant="subtitle2">
          {
            premise.toSentence()
          }
        </Typography>
        <InteractiveVennDiagram title={title} premise={premise} ref={refs[idx]} shadings={vennDiagramShadings[idx]} />
      </Grid>
    );
  }

  render() {
    const { classes, premises } = this.props;
    return (
      <div className={classes.root}>
        <Container>
          <Typography className={classes.instructions} variant="h6">
            Please shade in the diagrams to represent the premises:
          </Typography>
          <Grid container>
            {
              premises.map(this.toSentenceAndVennDiagram)
            }
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(RepresentPremisesIndividuallyStep);

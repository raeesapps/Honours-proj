import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { stages, validate } from '../premise_validator';
import InteractiveVennDiagram from '../../../components/VennDiagram/InteractiveVennDiagram';
import UninteractiveVennDiagram from '../../../components/VennDiagram/UninteractiveVennDiagram';

import styles from '../../../assets/views/jss/RepresentPremises/CombinePremisesStep/combine_premises_step_styles';

class CombinePremisesStep extends React.Component {
  constructor() {
    super();

    this.vennDiagramRef = React.createRef();
    this.shadingEntryToVennDiagram = this.shadingEntryToVennDiagram.bind(this);
  }

  shadingEntryToVennDiagram(shading, idx) {
    const { premiseSets } = this.props;
    const title = `venn${idx.toString()}l0l`;
    return (
      <Grid item xs={6}>
        <UninteractiveVennDiagram title={title} shading={shading} sets={premiseSets[idx]} />
      </Grid>
    );
  }

  validate() {
    const { COMBINATION_STAGE } = stages;
    const { argument } = this.props;
    return validate(argument, this.vennDiagramRef, COMBINATION_STAGE);
  }

  render() {
    const { classes, vennDiagramShadings, argument } = this.props;
    return (
      <div className={classes.root}>
        <Container>
          <Typography className={classes.instructions} variant="h6">
            Please combine the Venn Diagrams from the previous step into one Venn Diagram:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
                <Grid container spacing={2}>
                  {
                    vennDiagramShadings.map(this.shadingEntryToVennDiagram)
                  }
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <InteractiveVennDiagram title="Combination" sets={argument.getSets()} ref={this.vennDiagramRef} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(CombinePremisesStep);

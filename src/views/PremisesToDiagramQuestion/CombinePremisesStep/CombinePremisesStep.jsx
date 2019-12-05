import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { stages, validate } from '../premise_validator';

import SnackbarWrapper from '../../../components/Snackbar/SnackbarWrapper';
import snackbarTypes from '../../../components/Snackbar/snackbar_types';
import InteractiveVennDiagram from '../../../components/VennDiagram/InteractiveVennDiagram';
import UninteractiveVennDiagram from '../../../components/VennDiagram/UninteractiveVennDiagram';

import styles from '../../../assets/views/jss/PremisesToDiagramQuestion/CombinePremisesStep/combine_premises_step_styles';

class CombinePremisesStep extends React.Component {
  constructor() {
    super();

    this.state = {
      showError: false,
    };
    this.vennDiagramRef = React.createRef();
    this.shadingEntryToVennDiagram = this.shadingEntryToVennDiagram.bind(this);
  }

  shadingEntryToVennDiagram(shading, idx) {
    const { premiseSets, argument } = this.props;

    if (!premiseSets[idx] || !argument.premises[idx]) {
      throw new Error('Invalid index!');
    }

    const title = argument.premises[idx].toSentence();
    return (
      <Grid item xs={6}>
        <UninteractiveVennDiagram title={title} shading={shading} sets={premiseSets[idx]} />
      </Grid>
    );
  }

  validate() {
    const { COMBINATION_STAGE } = stages;
    const { argument } = this.props;

    const result = validate(argument, this.vennDiagramRef, COMBINATION_STAGE);
    this.setState({ showError: !result });

    return result;
  }

  render() {
    const { ERROR } = snackbarTypes;
    const { classes, vennDiagramShadings, argument } = this.props;
    const { showError } = this.state;
    const snackbarWrapperDisplayVal = !showError ? 'none' : '';
    return (
      <div className={classes.root}>
        <Container>
          <SnackbarWrapper
            style={{ display: snackbarWrapperDisplayVal, marginBottom: '10px' }}
            variant={ERROR}
            message="Incorrect!"
            onClose={() => {
              this.setState({ showError: false });
            }}
          />
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

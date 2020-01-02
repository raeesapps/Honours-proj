import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { stages, validate } from '../../../logic/premise_validator';

import SnackbarWrapper from '../../../components/Snackbar/SnackbarWrapper';
import snackbarTypes from '../../../components/Snackbar/snackbar_types';
import FourSetInteractiveVennDiagram from '../../../components/VennDiagram/FourSetInteractiveVennDiagram';
import ThreeSetInteractiveVennDiagram from '../../../components/VennDiagram/ThreeSetInteractiveVennDiagram';
import TwoSetUninteractiveVennDiagram from '../../../components/VennDiagram/TwoSetUninteractiveVennDiagram';

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
    const { argument } = this.props;

    if (!argument.premises[idx]) {
      throw new Error('Invalid index!');
    }

    const premise = argument.premises[idx];
    return (
      <Grid item xs={6}>
        <TwoSetUninteractiveVennDiagram title={premise.toSentence()} shadings={shading} terms={premise.terms} />
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
    function renderInteractiveVennDiagram(props, vennDiagramRef) {
      const { argument } = props;

      if (argument.terms.length === 3) {
        return (
          <div>
            <Grid item xs={3} />
            <Grid item xs={9}>
              <ThreeSetInteractiveVennDiagram title="Combination" premises={argument} ref={vennDiagramRef} />
            </Grid>
          </div>
        );
      }
      if (argument.terms.length === 4) {
        return (
          <Grid item xs={9}>
            <FourSetInteractiveVennDiagram premises={argument} ref={vennDiagramRef} />
          </Grid>
        );
      }
      throw new Error('Only 3 or 4 sets are supported!');
    }
    const { ERROR } = snackbarTypes;
    const { classes, vennDiagramShadings } = this.props;
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
            {
              renderInteractiveVennDiagram(this.props, this.vennDiagramRef)
            }
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(CombinePremisesStep);

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SnackbarWrapper from '../../../components/Snackbar/SnackbarWrapper';
import snackbarTypes from '../../../components/Snackbar/snackbar_types';

import PremiseToDiagram from '../../../components/PremiseToDiagram/PremiseToDiagram';
import PremiseCollection from '../../../logic/premise_collection';

import styles from '../../../assets/views/jss/PremisesToDiagramQuestion/RepresentPremisesStep/represent_premises_step_styles';

function putPremiseIntoPremiseCollection(premise) {
  return new PremiseCollection([premise]);
}

class RepresentPremisesStep extends React.Component {
  constructor() {
    super();

    this.state = {
      showError: false,
    };
    this.validate = this.validate.bind(this);
  }

  validate() {
    const { refs } = this.props;

    const validatedVennDiagrams = refs.filter((ref) => ref.current.validate()).length;
    this.setState({ showError: validatedVennDiagrams !== refs.length });

    return validatedVennDiagrams === refs.length;
  }

  render() {
    const { ERROR } = snackbarTypes;
    let {
      classes,
      premises,
      vennDiagramShadings,
      refs,
    } = this.props;
    const { showError } = this.state;
    const snackbarWrapperDisplayVal = !showError ? 'none' : '';

    vennDiagramShadings = vennDiagramShadings || { vennDiagramShadings: [] };

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
            Please shade in the diagrams to represent the premises:
          </Typography>
          <Grid container>
            {
              premises.map((premise, idx) => (
                <Grid item xs={6}>
                  <PremiseToDiagram premiseCollection={putPremiseIntoPremiseCollection(premise)} vennDiagramShading={vennDiagramShadings[idx]} ref={refs[idx]} />
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(RepresentPremisesStep);

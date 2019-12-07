import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import ArgumentForm from './Components/ArgumentForm';
import UninteractiveVennDiagram from '../../components/VennDiagram/UninteractiveVennDiagram';
import SnackbarWrapper from '../../components/Snackbar/SnackbarWrapper';

import PremiseCollection from '../../logic/premise_collection';
import snackbarTypes from '../../components/Snackbar/snackbar_types';
import styles from '../../assets/views/jss/InstantSolver/instant_solver_styles';

const { SUCCESS, ERROR } = snackbarTypes;

class InstantSolver extends React.Component {
  constructor() {
    super();

    this.state = {
      snackbarVisible: false,
      snackbarType: ERROR,
      snackbarMsg: '',
      dialogOpen: false,
      argumentSubmitted: false,
    };

    this.argumentFormRef = React.createRef();
    this.premisesVennDiagramRef = React.createRef();
    this.conclusionVennDiagramRef = React.createRef();
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onError = this.onError.bind(this);
    this.warn = this.warn.bind(this);
    this.warningAddPremise = this.warningAddPremise.bind(this);
  }

  onSubmitForm() {
    const argumentForm = this.argumentFormRef.current;
    const { premises } = argumentForm.state;

    const premisesVennDiagram = this.premisesVennDiagramRef.current;
    const argument = new PremiseCollection(premises
      .filter((premise) => premise.name !== 'Conclusion')
      .map((premise) => premise.ref.current.getPremiseObj()));
    premisesVennDiagram.applyShading(new PremiseCollection(premises
      .filter((premise) => premise.name !== 'Conclusion')
      .map((premise) => premise.ref.current.getPremiseObj())));

    const conclusionVennDiagram = this.conclusionVennDiagramRef.current;
    const conclusion = premises
      .find((premise) => premise.name === 'Conclusion')
      .ref.current.getPremiseObj();
    conclusionVennDiagram.applyShading(new PremiseCollection(premises
      .filter((premise) => premise.name === 'Conclusion')
      .map((premise) => premise.ref.current.getPremiseObj())));

    const valid = argument.argue(conclusion);

    if (valid) {
      this.setState({
        argumentSubmitted: true,
        snackbarVisible: true,
        snackbarType: SUCCESS,
        snackbarMsg: 'Valid!',
      });
    } else {
      this.setState({
        argumentSubmitted: true,
        snackbarVisible: true,
        snackbarType: ERROR,
        snackbarMsg: 'Invalid!',
      });
    }
  }

  onError(msg) {
    this.setState({ snackbarVisible: true, snackbarType: ERROR, snackbarMsg: msg });
  }

  warn() {
    this.setState({ dialogOpen: true });
  }

  warningAddPremise() {
    const argumentForm = this.argumentFormRef.current;
    argumentForm.addPremise();
    this.setState({ dialogOpen: false });
  }

  render() {
    const { classes } = this.props;
    const {
      snackbarVisible,
      snackbarMsg,
      snackbarType,
      dialogOpen,
      argumentSubmitted,
    } = this.state;
    const displayDiagram = argumentSubmitted ? 'block' : 'none';
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Dialog
            open={dialogOpen}
            onClose={() => this.setState({ dialogOpen: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You are trying to add more than 4 premises.
                Thats some really complicated stuff to reason about.
                Are you sure you want to add another premise?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.warningAddPremise} color="primary">
                Yes
              </Button>
              <Button onClick={() => this.setState({ dialogOpen: false })} color="primary" autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackbarVisible}
            onClose={() => this.setState({ snackbarVisible: false })}
          >
            <SnackbarWrapper
              onClose={() => this.setState({ snackbarVisible: false })}
              variant={snackbarType}
              message={snackbarMsg}
            />
          </Snackbar>

          <ArgumentForm onSubmit={this.onSubmitForm} onError={this.onError} ref={this.argumentFormRef} warn={this.warn} />
          <div style={{ display: displayDiagram }}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Diagrammatic Representation</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <UninteractiveVennDiagram ref={this.premisesVennDiagramRef} title="Premises" />
                  </Grid>
                  <Grid item xs={6}>
                    <UninteractiveVennDiagram ref={this.conclusionVennDiagramRef} title="Conclusion" />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(InstantSolver);

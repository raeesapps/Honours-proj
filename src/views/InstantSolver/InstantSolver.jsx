/* eslint-disable react/no-did-update-set-state */
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
import FourSetUninteractiveVennDiagram from '../../components/VennDiagram/FourSetUninteractiveVennDiagram';
import ThreeSetUninteractiveVennDiagram from '../../components/VennDiagram/ThreeSetUninteractiveVennDiagram';
import TwoSetUninteractiveVennDiagram from '../../components/VennDiagram/TwoSetUninteractiveVennDiagram';
import SnackbarWrapper from '../../components/Snackbar/SnackbarWrapper';

import PremiseCollection from '../../logic/premise_collection';
import snackbarTypes from '../../components/Snackbar/snackbar_types';
import styles from '../../assets/views/jss/InstantSolver/instant_solver_styles';

const { SUCCESS, ERROR } = snackbarTypes;

function getTermSets(premiseObjs) {
  const termSet = new Set();
  premiseObjs.forEach((premiseObj) => {
    const { firstTerm, secondTerm } = premiseObj.terms;

    termSet.add(firstTerm);
    termSet.add(secondTerm);
  });
  return termSet;
}

class InstantSolver extends React.Component {
  constructor() {
    super();

    this.state = {
      snackbarVisible: false,
      snackbarType: ERROR,
      snackbarMsg: '',
      dialogOpen: false,
      argumentSubmitted: false,
      needsUpdate: false,
      premisesKey: Math.random(),
      conclusionsKey: Math.random(),
    };

    this.argumentFormRef = React.createRef();
    this.premisesVennDiagramRef = React.createRef();
    this.conclusionVennDiagramRef = React.createRef();
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onError = this.onError.bind(this);
    this.warn = this.warn.bind(this);
    this.warningAddPremise = this.warningAddPremise.bind(this);
    this.getNumberOfTerms = this.getNumberOfTerms.bind(this);
    this.renderSymbolicForms = this.renderSymbolicForms.bind(this);
  }

  componentDidUpdate() {
    const { needsUpdate } = this.state;

    if (needsUpdate) {
      const argumentForm = this.argumentFormRef.current;
      const { premises } = argumentForm.state;

      const premisesVennDiagram = this.premisesVennDiagramRef.current;
      const premiseCollection = new PremiseCollection(premises
        .filter((premise) => premise.name !== 'Conclusion')
        .map((premise) => premise.ref.current.getPremiseObj()));

      if (this.getNumberOfTerms() <= 4) {
        premisesVennDiagram.applyShading(new PremiseCollection(premises
          .filter((premise) => premise.name !== 'Conclusion')
          .map((premise) => premise.ref.current.getPremiseObj())));
      }

      const conclusionVennDiagram = this.conclusionVennDiagramRef.current;
      const conclusion = premises
        .find((premise) => premise.name === 'Conclusion')
        .ref.current.getPremiseObj();
      conclusionVennDiagram.applyShading(new PremiseCollection(premises
        .filter((premise) => premise.name === 'Conclusion')
        .map((premise) => premise.ref.current.getPremiseObj())));

      const valid = premiseCollection.argue(conclusion);

      if (valid) {
        this.setState({
          argumentSubmitted: true,
          snackbarVisible: true,
          snackbarType: SUCCESS,
          snackbarMsg: 'Valid!',
          needsUpdate: false,
        });
      } else {
        this.setState({
          argumentSubmitted: true,
          snackbarVisible: true,
          snackbarType: ERROR,
          snackbarMsg: 'Invalid!',
          needsUpdate: false,
        });
      }
    }
  }

  onSubmitForm() {
    this.setState({
      argumentSubmitted: true,
      needsUpdate: true,
      premisesKey: Math.random(),
      conclusionsKey: Math.random(),
    });
  }

  onError(msg) {
    this.setState({ snackbarVisible: true, snackbarType: ERROR, snackbarMsg: msg });
  }

  getNumberOfTerms(excludeConclusion) {
    const argumentForm = this.argumentFormRef.current;
    if (argumentForm) {
      const { premises } = argumentForm.state;
      const premiseObjs = premises.map((premise) => premise.ref.current.getPremiseObj());

      if (excludeConclusion) {
        premiseObjs.pop();
      }

      const termSet = getTermSets(premiseObjs);
      return termSet.size;
    }
    return -1;
  }

  warningAddPremise() {
    const argumentForm = this.argumentFormRef.current;
    argumentForm.addPremise();
    this.setState({ dialogOpen: false });
  }

  warn() {
    this.setState({ dialogOpen: true });
  }

  renderSymbolicForms() {
    function getSymbolicForm(premise, mappings) {
      const {
        firstTerm,
        secondTerm,
      } = premise.terms;

      const firstSymbol = mappings[firstTerm];
      const secondSymbol = mappings[secondTerm];

      return premise.toSymbolicForm(firstSymbol, secondSymbol);
    }
    const argumentForm = this.argumentFormRef.current;

    if (argumentForm) {
      const { premises } = argumentForm.state;
      const premiseObjs = premises.map((premise) => premise.ref.current.getPremiseObj());

      const termSet = getTermSets(premiseObjs);
      const letters = [...Array(25).keys()].map((i) => String.fromCharCode(65 + i));
      const mappings = {};
      [...termSet].forEach((term, idx) => {
        const letter = letters[idx];
        mappings[term] = letter;
      });

      return premiseObjs.map((premise) => (
        <Grid item xs={3}>
          <Typography variant="h6">{premise.toSentence()}</Typography>
          <Typography variant="subtitle1">{getSymbolicForm(premise, mappings)}</Typography>
        </Grid>
      ));
    }
    throw new Error('Unable to render symbolic forms!');
  }

  render() {
    const { classes } = this.props;
    const {
      snackbarVisible,
      snackbarMsg,
      snackbarType,
      dialogOpen,
      argumentSubmitted,
      premisesKey,
      conclusionsKey,
    } = this.state;
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
          {argumentSubmitted
            && (
              <div>
                {this.getNumberOfTerms(true) <= 4
                  && (
                    <ExpansionPanel className={classes.spacedExpansionPanel}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="premisesAriaControls"
                        id="premisesExpansionPanel"
                      >
                        <Typography>Premises Venn Diagram</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Container>
                          {this.getNumberOfTerms(true) === 4 && <FourSetUninteractiveVennDiagram key={premisesKey} ref={this.premisesVennDiagramRef} />}
                          {this.getNumberOfTerms(true) === 3 && <ThreeSetUninteractiveVennDiagram key={premisesKey} ref={this.premisesVennDiagramRef} title="Premises" />}
                          {this.getNumberOfTerms(true) === 2 && <TwoSetUninteractiveVennDiagram key={premisesKey} ref={this.premisesVennDiagramRef} title="Premises" />}
                        </Container>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )}
                <ExpansionPanel className={classes.spacedExpansionPanel}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="conclusionAriaControls"
                    id="conclusionExpasionPanel"
                  >
                    <Typography>Conclusion Venn Diagram</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Container>
                      <TwoSetUninteractiveVennDiagram key={conclusionsKey} ref={this.conclusionVennDiagramRef} title="Conclusion" />
                    </Container>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {
                  this.getNumberOfTerms(false) <= 26
                  && (
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="symbolicFormAriaControls"
                        id="symbolicFormExpansionPanel"
                      >
                        <Typography>Symbolic Form Representations</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container>
                          {this.renderSymbolicForms()}
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                }
              </div>
            )}
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(InstantSolver);

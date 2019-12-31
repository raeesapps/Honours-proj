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
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import ArgumentForm from './Components/ArgumentForm';
import FourSetUninteractiveVennDiagram from '../../components/VennDiagram/FourSetUninteractiveVennDiagram';
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
      needsUpdate: false,
    };

    this.argumentFormRef = React.createRef();
    this.premisesVennDiagramRef = null;
    this.conclusionVennDiagramRef = React.createRef();
    this.uninteractiveVennDiagramRef = React.createRef();
    this.fourSetUninteractiveVennDiagramRef = React.createRef();
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onError = this.onError.bind(this);
    this.warn = this.warn.bind(this);
    this.warningAddPremise = this.warningAddPremise.bind(this);
    this.getNumberOfTerms = this.getNumberOfTerms.bind(this);
  }

  componentDidUpdate() {
    const { needsUpdate } = this.state;

    if (needsUpdate) {
      const argumentForm = this.argumentFormRef.current;
      const { premises } = argumentForm.state;

      if (this.getNumberOfTerms() === 4) {
        this.premisesVennDiagramRef = this.fourSetUninteractiveVennDiagramRef;
      } else if (this.getNumberOfTerms() < 4) {
        this.premisesVennDiagramRef = this.uninteractiveVennDiagramRef;
      }

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
    this.setState({ argumentSubmitted: true, needsUpdate: true });
  }

  onError(msg) {
    this.setState({ snackbarVisible: true, snackbarType: ERROR, snackbarMsg: msg });
  }

  getNumberOfTerms() {
    const argumentForm = this.argumentFormRef.current;
    if (argumentForm) {
      const { premises } = argumentForm.state;
      const premiseObjs = premises.map((premise) => premise.ref.current.getPremiseObj());

      premiseObjs.pop();

      const termSet = new Set();
      premiseObjs.forEach((premiseObj) => {
        const { firstTerm, secondTerm } = premiseObj.terms;

        termSet.add(firstTerm);
        termSet.add(secondTerm);
      });

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

  render() {
    const { classes } = this.props;
    const {
      snackbarVisible,
      snackbarMsg,
      snackbarType,
      dialogOpen,
      argumentSubmitted,
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
                {this.getNumberOfTerms() <= 4
                  && (
                    <ExpansionPanel className={classes.premisesExpansionPanel}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="premisesAriaControls"
                        id="premisesExpansionPanel"
                      >
                        <Typography>Premises Venn Diagram</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Container>
                          {this.getNumberOfTerms() === 4 && <FourSetUninteractiveVennDiagram ref={this.fourSetUninteractiveVennDiagramRef} />}
                          {this.getNumberOfTerms() < 4 && <UninteractiveVennDiagram ref={this.uninteractiveVennDiagramRef} title="Premises" renderTitle={0} />}
                        </Container>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )}
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="conclusionAriaControls"
                    id="conclusionExpasionPanel"
                  >
                    <Typography>Conclusion Venn Diagram</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Container>
                      <UninteractiveVennDiagram ref={this.conclusionVennDiagramRef} title="Conclusion" renderTitle={0} />
                    </Container>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            )
          }
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(InstantSolver);

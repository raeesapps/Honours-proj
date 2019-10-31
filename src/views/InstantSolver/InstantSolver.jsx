import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';

import ArgumentForm from '../../components/Argument/ArgumentForm';
import UninteractiveVennDiagram from '../../components/VennDiagram/UninteractiveVennDiagram';
import SnackbarWrapper from '../../components/Snackbar/SnackbarWrapper';

import Argument from '../../logic/argument';
import snackbarTypes from '../../components/Snackbar/snackbar_types';
import styles from '../../assets/views/jss/InstantSolver/instant_solver_styles';

class InstantSolver extends React.Component {
  constructor(props) {
    super(props);
    const { ERROR } = snackbarTypes;
    this.state = {
      snackbarVisible: false,
      snackbarType: ERROR,
      snackbarMsg: '',
      dialogOpen: false,
    };

    this.argumentFormRef = React.createRef();
    this.vennDiagramRef = React.createRef();
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onError = this.onError.bind(this);
    this.warn = this.warn.bind(this);
    this.warningAddPremise = this.warningAddPremise.bind(this);
  }

  onSubmitForm() {
    const argumentForm = this.argumentFormRef.current;
    const { premises } = argumentForm.state;
    const { SUCCESS, ERROR } = snackbarTypes;
    const vennDiagram = this.vennDiagramRef.current;

    const argument = new Argument(premises
      .filter((premise) => premise.name !== 'Conclusion')
      .map((premise) => premise.ref.current.getPremiseObj()));
    const conclusion = premises
      .find((premise) => premise.name === 'Conclusion')
      .ref.current.getPremiseObj();

    vennDiagram.applyShading(new Argument(premises
      .filter((premise) => premise.name !== 'Conclusion')
      .map((premise) => premise.ref.current.getPremiseObj())));

    const valid = argument.argue(conclusion);

    if (valid) {
      this.setState({ snackbarVisible: true, snackbarType: SUCCESS, snackbarMsg: 'Valid!' });
    } else {
      this.setState({ snackbarVisible: true, snackbarType: ERROR, snackbarMsg: 'Invalid!' });
    }
  }

  onError(msg) {
    const { ERROR } = snackbarTypes;

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
    const { snackbarVisible, snackbarMsg, snackbarType, dialogOpen } = this.state;
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
          <UninteractiveVennDiagram ref={this.vennDiagramRef} />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(InstantSolver);

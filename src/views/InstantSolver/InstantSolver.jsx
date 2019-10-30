import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

import ArgumentForm from '../../components/Argument/ArgumentForm';
import UninteractiveVennDiagram from '../../components/VennDiagram/UninteractiveVennDiagram';
import SnackbarWrapper from '../../components/Snackbar/SnackbarWrapper';
import styles from '../../assets/views/jss/InstantSolver/instant_solver_styles';

import Argument from '../../logic/argument';

const snackbarTypes = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
});

class InstantSolver extends React.Component {
  constructor(props) {
    super(props);
    const { ERROR } = snackbarTypes;
    this.state = {
      snackbarVisible: false,
      snackbarType: ERROR,
      snackbarMsg: '',
    };

    this.argumentFormRef = React.createRef();
    this.vennDiagramRef = React.createRef();
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmitForm() {
    const argumentForm = this.argumentFormRef.current;
    const { premises } = argumentForm.state;
    const vennDiagram = this.vennDiagramRef.current;
    const argument = new Argument(premises
      .filter((premise) => premise.name !== 'Conclusion')
      .map((premise) => premise.ref.current.getPremiseObj()));
    const conclusion = premises
      .find((premise) => premise.name === 'Conclusion')
      .ref.current.getPremiseObj();
    vennDiagram.applyShading(argument);
    argumentForm.setState({ validationSuccessful: argument.argue(conclusion), alertVisible: true });
  }

  onError(msg) {
    this.setState({ snackbarVisible: true, snackbarMsg: msg });
  }

  render() {
    const { classes } = this.props;
    const { snackbarVisible, snackbarMsg, snackbarType } = this.state;
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
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

          <ArgumentForm onSubmit={this.onSubmitForm} onError={this.onError} ref={this.argumentFormRef} />
          <UninteractiveVennDiagram ref={this.vennDiagramRef} />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(InstantSolver);

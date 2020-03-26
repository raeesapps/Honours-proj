import React from 'react';

import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SnackbarWrapper from '../Snackbar/SnackbarWrapper';
import snackbarTypes from '../Snackbar/snackbar_types';

const { ERROR, SUCCESS } = snackbarTypes;

function withQuestionTemplate(WrappedComponent) {
  return class extends React.PureComponent {
    constructor() {
      super();

      this.state = {
        snackbarType: ERROR,
        showSnackbar: false,
        incorrectMesssage: null,
        questionTitle: '',
        questionNumber: -1,
        instructions: '',
      };
    }

    componentDidUpdate(prevProps, prevState) {
      const { questionNumber, questionTitle } = this.state;
      const { questionNumber: prevQuestionNumber, questionTitle: prevQuestionTitle } = prevState;

      if (questionTitle === prevQuestionTitle && questionNumber !== prevQuestionNumber) {
        this.resetSnackbar();
      }
    }

    onValidate = (result, incorrectMessage) => {
      const snackbarType = result ? SUCCESS : ERROR;
      this.setState({
        showSnackbar: true,
        snackbarType,
        incorrectMessage,
      });
    }

    resetSnackbar = () => {
      this.setState({
        snackbarType: ERROR,
        showSnackbar: false,
        incorrectMesssage: null,
      });
    }

    setQuestionTitle = (questionTitle) => {
      this.setState({ questionTitle });
    }

    setQuestionNumber = (questionNumber) => {
      this.setState({ questionNumber });
    }

    setInstructions = (instructions) => {
      this.setState({ instructions });
    }

    render() {
      const { showSnackbar, snackbarType, incorrectMessage, questionTitle, questionNumber, instructions } = this.state;

      const snackbarWrapperDisplayVal = !showSnackbar ? 'none' : '';
      const snackbarMessage = snackbarType === SUCCESS ? 'Correct!' : incorrectMessage;

      return (
        <Container>
          <Paper>
            <Typography variant="h4">
              {questionTitle}
            </Typography>
            <Typography variant="h5">
              Question {questionNumber}
            </Typography>
            <Divider />
            <Typography variant="h6">
              {instructions}
            </Typography>
            <SnackbarWrapper
              style={{ display: snackbarWrapperDisplayVal, marginBottom: '10px' }}
              variant={snackbarType}
              message={snackbarMessage}
              onClose={() => {
                this.setState({ showSnackbar: false });
              }}
            />
            <Divider />
            <WrappedComponent
              onValidate={this.onValidate}
              setQuestionTitle={this.setQuestionTitle}
              setQuestionNumber={this.setQuestionNumber}
              setInstructions={this.setInstructions}
              {...this.props}
            />
          </Paper>
        </Container>
      );
    }
  };
}

export default withQuestionTemplate;

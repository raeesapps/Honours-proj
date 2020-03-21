import React from 'react';

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
      };
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

    render() {
      const { showSnackbar, snackbarType, incorrectMessage, dialogOpen, star } = this.state;

      const snackbarWrapperDisplayVal = !showSnackbar ? 'none' : '';
      const snackbarMessage = snackbarType === SUCCESS ? 'Correct!' : incorrectMessage;

      return (
        <div>
          <SnackbarWrapper
            style={{ display: snackbarWrapperDisplayVal, marginBottom: '10px' }}
            variant={snackbarType}
            message={snackbarMessage}
            onClose={() => {
              this.setState({ showSnackbar: false });
            }}
          />
          <WrappedComponent onValidate={this.onValidate} onCorrect={this.onCorrect} {...this.props} />
        </div>
      );
    }
  };
}

export default withQuestionTemplate;

import React from 'react';

import Container from '@material-ui/core/Container';

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
      this.onValidate = this.onValidate.bind(this);
    }

    onValidate(result, incorrectMessage) {
      const snackbarType = result ? SUCCESS : ERROR;
      this.setState({
        showSnackbar: true,
        snackbarType,
        incorrectMessage,
      });
    }

    render() {
      const { showSnackbar, snackbarType, incorrectMessage } = this.state;

      const snackbarWrapperDisplayVal = !showSnackbar ? 'none' : '';
      const snackbarMessage = snackbarType === SUCCESS ? 'Correct!' : incorrectMessage;

      return (
        <Container>
          <SnackbarWrapper
            style={{ display: snackbarWrapperDisplayVal, marginBottom: '10px' }}
            variant={snackbarType}
            message={snackbarMessage}
            onClose={() => {
              this.setState({ showSnackbar: false });
            }}
          />
          <WrappedComponent onValidate={this.onValidate} {...this.props} />
        </Container>
      );
    }
  };
}

export default withQuestionTemplate;

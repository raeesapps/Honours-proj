import React from 'react';

import DIFFICULTY from './question_difficulty';
import SnackbarWrapper from '../Snackbar/SnackbarWrapper';
import snackbarTypes from '../Snackbar/snackbar_types';

import { STAR_TYPES, addStar } from '../../utils/stars';

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

    onCorrect = (difficulty) => {
      const { EASY, MEDIUM, HARD } = DIFFICULTY;
      const { BRONZE_STAR, SILVER_STAR, GOLD_STAR } = STAR_TYPES;

      switch (difficulty) {
        case EASY:
          console.log('adding bronze star...');
          addStar(BRONZE_STAR);
          break;
        case MEDIUM:
          console.log('adding silver star...');
          addStar(SILVER_STAR);
          break;
        case HARD:
          addStar(GOLD_STAR);
          break;
        default:
          break;
      }
    }

    resetSnackbar = () => {
      this.setState({
        snackbarType: ERROR,
        showSnackbar: false,
        incorrectMesssage: null,
      });
    }

    render() {
      const { showSnackbar, snackbarType, incorrectMessage } = this.state;

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

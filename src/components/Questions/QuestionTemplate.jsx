import React from 'react';

import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

import DIFFICULTY from './question_difficulty';
import SimpleDialog from '../Dialog/SimpleDialog';
import SnackbarWrapper from '../Snackbar/SnackbarWrapper';
import snackbarTypes from '../Snackbar/snackbar_types';

import bronzeStar from '../../assets/img/bronze_star.png';
import silverStar from '../../assets/img/silver_star.png';
import goldStar from '../../assets/img/gold_star.png';

import { STAR_TYPES, addStar, rememberQuestion, hasQuestionBeenDone } from '../../utils/stars';

const { ERROR, SUCCESS } = snackbarTypes;

function withQuestionTemplate(WrappedComponent) {
  return class extends React.PureComponent {
    constructor() {
      super();

      this.state = {
        dialogOpen: false,
        star: null,
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

    onCorrect = (id, difficulty) => {
      const { EASY, MEDIUM, HARD } = DIFFICULTY;
      const { BRONZE_STAR, SILVER_STAR, GOLD_STAR } = STAR_TYPES;

      if (!hasQuestionBeenDone(id)) {
        switch (difficulty) {
          case EASY:
            addStar(BRONZE_STAR);
            this.setState({ dialogOpen: true, star: bronzeStar });
            break;
          case MEDIUM:
            addStar(SILVER_STAR);
            this.setState({ dialogOpen: true, star: silverStar });
            break;
          case HARD:
            addStar(GOLD_STAR);
            this.setState({ dialogOpen: true, star: goldStar });
            break;
          default:
            break;
        }

        rememberQuestion(id);
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
      const { showSnackbar, snackbarType, incorrectMessage, dialogOpen, star } = this.state;

      const snackbarWrapperDisplayVal = !showSnackbar ? 'none' : '';
      const snackbarMessage = snackbarType === SUCCESS ? 'Correct!' : incorrectMessage;

      return (
        <div>
          <SimpleDialog
            open={dialogOpen}
            onClose={() => this.setState({ dialogOpen: false })}
            title="Congratulations!"
            content={
              <div style={{ display: 'flex' }}>
                <img src={star} alt="star" />
                <DialogContentText style={{ marginTop: '12%' }}>
                  You have been awarded a star for completing this question!
                </DialogContentText>
              </div>
            }
            actions={
              <Button onClick={() => this.setState({ dialogOpen: false, star: null })} color="primary" autoFocus>
                Close
              </Button>
            }
          />
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

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PremiseToSymbolicForm from '../../components/PremiseToSymbolicForm/PremiseToSymbolicForm';
import SnackbarWrapper from '../../components/Snackbar/SnackbarWrapper';
import snackbarTypes from '../../components/Snackbar/snackbar_types';
import withSidebar from '../../components/Questions/SidebarHOC';

import { validateMappings } from '../../logic/validator';

import styles from '../../assets/views/jss/PremiseToSymbolicFormQuestion/premise_to_symbolic_question_styles';

const { ERROR, SUCCESS } = snackbarTypes;

class PremiseToSymbolicFormView extends React.Component {
  constructor(props) {
    super(props);

    const { location } = props;
    const { question } = location;
    const { content } = question;

    this.premise = content;
    this.state = {
      mappingTable: {},
      snackbarType: ERROR,
      showSnackbar: false,
      hint: null,
    };
    this.premiseToSymbolicFormRef = React.createRef();
    this.validate = this.validate.bind(this);
  }

  validate() {
    const { premise, premiseToSymbolicFormRef } = this;

    if (!premiseToSymbolicFormRef.current) {
      throw new Error('Ref not set!');
    }

    const { firstEntry, secondEntry, thirdEntry } = premiseToSymbolicFormRef.current.getEntries();
    const validationResult = validateMappings(firstEntry, secondEntry, thirdEntry, premise, {});

    if (validationResult) {
      const {
        result,
        hint,
      } = validationResult;

      if (result) {
        this.setState({ snackbarType: SUCCESS, showSnackbar: true, hint: null });
      } else {
        this.setState({ snackbarType: ERROR, showSnackbar: true, hint });
      }
    }
  }

  render() {
    const { premiseToSymbolicFormRef, premise } = this;
    const { classes } = this.props;
    const { showSnackbar, snackbarType, hint } = this.state;

    const snackbarWrapperDisplayVal = !showSnackbar ? 'none' : '';
    const snackbarMessage = snackbarType === SUCCESS ? 'Correct!' : hint;
    return (
      <div>
        <Container>
          <SnackbarWrapper
            style={{ display: snackbarWrapperDisplayVal, marginBottom: '10px' }}
            variant={snackbarType}
            message={snackbarMessage}
            onClose={() => {
              this.setState({ showSnackbar: false });
            }}
          />
          <Typography className={classes.typography} variant="h5">
            Translate
            {` "${premise.toSentence()}" `}
            to Symbolic Form
          </Typography>
          <Paper className={classes.paper}>
            <PremiseToSymbolicForm ref={premiseToSymbolicFormRef} premise={premise} />
            <br />
          </Paper>
          <Button className={classes.button} variant="contained" color="primary" onClick={this.validate}>Check Answer</Button>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(withSidebar(PremiseToSymbolicFormView));

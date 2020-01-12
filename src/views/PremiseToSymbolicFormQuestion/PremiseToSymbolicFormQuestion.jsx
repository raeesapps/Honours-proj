import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PremiseToSymbolicForm from '../../components/PremiseToSymbolicForm/PremiseToSymbolicForm';
import withSidebar from '../../components/Questions/QuestionSidebar';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';

import { validateMappings } from '../../logic/validator';

import styles from '../../assets/views/jss/PremiseToSymbolicFormQuestion/premise_to_symbolic_question_styles';

class PremiseToSymbolicFormQuestion extends React.Component {
  constructor(props) {
    super(props);

    const { location } = props;
    const { question } = location;
    const { content } = question;

    this.premise = content;
    this.state = {
      mappingTable: {},
      hint: null,
    };
    this.premiseToSymbolicFormRef = React.createRef();
  }

  validate = () => {
    const { premise, premiseToSymbolicFormRef } = this;
    const { onValidate } = this.props;

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

      onValidate(result, hint);
    }
  }

  render() {
    const { premiseToSymbolicFormRef, premise } = this;
    const { classes } = this.props;

    return (
      <div>
        <Typography className={classes.typography} variant="h5">
          Translate
          {` "${premise.toSentence()}" `}
          to Symbolic Form
        </Typography>
        <Paper className={classes.paper}>
          <PremiseToSymbolicForm className={classes.premiseToSymbolicForm} ref={premiseToSymbolicFormRef} premise={premise} />
          <br />
        </Paper>
        <Button className={classes.button} variant="contained" color="primary" onClick={this.validate}>Check Answer</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withSidebar(withQuestionTemplate(PremiseToSymbolicFormQuestion)));

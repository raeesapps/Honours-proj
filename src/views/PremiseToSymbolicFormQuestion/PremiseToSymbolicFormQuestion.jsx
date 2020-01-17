import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PremiseToSymbolicForm from '../../components/PremiseToSymbolicForm/PremiseToSymbolicForm';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';

import { validateMappings } from '../../logic/validator';

import styles from '../../assets/views/jss/PremiseToSymbolicFormQuestion/premise_to_symbolic_question_styles';

class PremiseToSymbolicFormQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { content: nextPremise } = nextProps;
    const { premise } = prevState;

    if (nextPremise.hashCode() !== premise.hashCode()) {
      return {
        premise: nextPremise,
        mappingTable: {},
        hint: null,
        key: Math.random(),
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content } = props;

    this.state = {
      premise: content,
      mappingTable: {},
      hint: null,
      key: Math.random(),
    };
    this.premiseToSymbolicFormRef = React.createRef();
  }

  validate = () => {
    const { premiseToSymbolicFormRef } = this;
    const { onValidate } = this.props;
    const { premise } = this.state;

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
    const { premise, key } = this.state;
    const { premiseToSymbolicFormRef } = this;
    const { classes } = this.props;

    return (
      <div key={key}>
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

export default withStyles(styles)(withQuestionTemplate(PremiseToSymbolicFormQuestion));

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PremiseToSymbolicForm from './PremiseToSymbolicForm';
import getDragDropEntries from './get_drag_drop_entries';
import withQuestionTemplate from '../Questions/QuestionTemplate';

import { validateMappings } from '../../logic/validator';

import styles from '../../assets/components/jss/PremiseToSymbolicForm/premise_to_symbolic_question_styles';

class PremiseToSymbolicFormQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { questionidx: questionIdx, content: nextPremise } = nextProps;
    const { premise } = prevState;

    if (nextPremise.hashCode() !== premise.hashCode()) {
      return {
        premise: nextPremise,
        mappingTable: {},
        hint: null,
        key: Math.random(),
        questionIdx,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { questionidx: questionIdx, content } = props;

    this.state = {
      premise: content,
      mappingTable: {},
      hint: null,
      key: Math.random(),
      questionIdx,
    };
    this.premiseToSymbolicFormRef = React.createRef();
  }

  componentDidMount() {
    const { premise, questionIdx } = this.state;
    const { setQuestionTitle, setQuestionNumber, setInstructions } = this.props;

    setQuestionTitle("Translate premise to standard form");
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions(`Translate the premise "${premise.toSentence()}" to standard form using the turnstile symbol`);
  }

  componentDidUpdate() {
    const { premise, questionIdx } = this.state;
    const { setQuestionNumber, setInstructions } = this.props;
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions(`Translate the premise "${premise.toSentence()}" to standard form using the turnstile symbol`);
  }

  validate = () => {
    const { premiseToSymbolicFormRef } = this;
    const { onValidate } = this.props;
    const { premise } = this.state;

    if (!premiseToSymbolicFormRef.current) {
      throw new Error('Ref not set!');
    }

    const { firstEntry, secondEntry, thirdEntry } = premiseToSymbolicFormRef.current.getEntries();
    const validated = validateMappings(firstEntry, secondEntry, thirdEntry, premise, {});

    if (validated) {
      const {
        result,
        hint,
      } = validated;

      onValidate(result, hint);
    }
  }

  render() {
    const { premise, key } = this.state;
    const { premiseToSymbolicFormRef } = this;
    const { classes } = this.props;

    return (
      <div style={{ marginTop: '20px' }} key={key}>
        <PremiseToSymbolicForm className={classes.premiseToSymbolicForm} ref={premiseToSymbolicFormRef} premise={premise} dragdropentries={getDragDropEntries('A', 'B')} />
        <br />
        <Button className={classes.button} variant="contained" color="primary" onClick={this.validate}>Check Answer</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(PremiseToSymbolicFormQuestion));

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PropositionToSymbolicForm from './PropositionToSymbolicForm';
import getDragDropEntries from './get_drag_drop_entries';
import withQuestionTemplate from '../Questions/QuestionTemplate';

import { validateMappings } from '../../logic/validator';

import styles from '../../assets/components/jss/PropositionToSymbolicForm/proposition_to_symbolic_question_styles';

class PropositionToSymbolicFormQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { questionidx: questionIdx, content: nextProposition } = nextProps;
    const { proposition } = prevState;

    if (nextProposition.hashCode() !== proposition.hashCode()) {
      return {
        proposition: nextProposition,
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
      proposition: content,
      mappingTable: {},
      hint: null,
      key: Math.random(),
      questionIdx,
    };
    this.propositionToSymbolicFormRef = React.createRef();
  }

  componentDidMount() {
    const { proposition, questionIdx } = this.state;
    const { setQuestionTitle, setQuestionNumber, setInstructions } = this.props;

    setQuestionTitle("Translate proposition to standard form");
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions(`Translate the proposition "${proposition.toSentence()}" to standard form using the turnstile symbol`);
  }

  componentDidUpdate() {
    const { proposition, questionIdx } = this.state;
    const { setQuestionNumber, setInstructions } = this.props;
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions(`Translate the proposition "${proposition.toSentence()}" to standard form using the turnstile symbol`);
  }

  validate = () => {
    const { propositionToSymbolicFormRef } = this;
    const { onValidate } = this.props;
    const { proposition } = this.state;

    if (!propositionToSymbolicFormRef.current) {
      throw new Error('Ref not set!');
    }

    const { firstEntry, secondEntry, thirdEntry } = propositionToSymbolicFormRef.current.getEntries();
    const validated = validateMappings(firstEntry, secondEntry, thirdEntry, proposition, {});

    if (validated) {
      const {
        result,
        hint,
      } = validated;

      onValidate(result, hint);
    }
  }

  render() {
    const { proposition, key } = this.state;
    const { propositionToSymbolicFormRef } = this;
    const { classes } = this.props;

    return (
      <div style={{ marginTop: '20px' }} key={key}>
        <PropositionToSymbolicForm className={classes.propositionToSymbolicForm} ref={propositionToSymbolicFormRef} proposition={proposition} dragdropentries={getDragDropEntries('A', 'B')} />
        <br />
        <Button className={classes.button} variant="contained" color="primary" onClick={this.validate}>Check Answer</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(PropositionToSymbolicFormQuestion));

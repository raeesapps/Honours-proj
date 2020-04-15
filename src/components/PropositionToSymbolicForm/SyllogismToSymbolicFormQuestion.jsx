import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { validateMappings } from '../../logic/validator';
import getDragDropEntries from './get_drag_drop_entries';
import PropositionToSymbolicForm from './PropositionToSymbolicForm';
import SimpleStepper from '../Stepper/SimpleStepper';
import withQuestionTemplate from '../Questions/QuestionTemplate';

import styles from '../../assets/components/jss/PropositionToSymbolicForm/syllogism_to_symbolic_form_question_styles';

class SyllogismToSymbolicFormQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { content, questionidx: questionIdx } = nextProps;
    const { propositionCollection: nextPropositionCollection, conclusion: nextConclusion } = content;
    const { propositionCollection, conclusion } = prevState;
    if (nextPropositionCollection.hashCode() !== propositionCollection.hashCode()
      && nextConclusion.hashCode() !== conclusion.hashCode()) {
      return {
        key: Math.random(),
        propositionCollection: nextPropositionCollection,
        conclusion: nextConclusion,
        propositions: [...nextPropositionCollection.propositions, nextConclusion],
        componentRefs: [...Array(nextPropositionCollection.size() + 1).keys()]
          .map(() => React.createRef()),
        step: 0,
        mappingTable: {},
        questionIdx,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content, questionidx: questionIdx } = props;
    const { propositionCollection, conclusion } = content;

    this.state = {
      key: Math.random(),
      propositionCollection,
      conclusion,
      propositions: [...propositionCollection.propositions, conclusion],
      componentRefs: [...Array(propositionCollection.size() + 1).keys()]
        .map(() => React.createRef()),
      step: 0,
      mappingTable: {},
      questionIdx,
    };
  }

  componentDidMount() {
    const { questionIdx } = this.state;
    const { setQuestionTitle, setQuestionNumber, setInstructions } = this.props;

    setQuestionTitle("Create dictionary of syllogism");
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions(`Translate each proposition, and the conclusion to standard form using the turnstile symbol.`);
  }

  componentDidUpdate() {
    const { questionIdx } = this.state;
    const { setQuestionNumber } = this.props;
    setQuestionNumber(Number(questionIdx) + 1);
  }

  onNext = (step) => {
    const { componentRefs } = this.state;
    const onNextCallback = () => {
      const ref = componentRefs[step];

      if (!ref.current) {
        throw new Error('Reference is not referencing a component!');
      }

      const { firstEntry, secondEntry, thirdEntry } = ref.current.getEntries();
      this.validate(firstEntry, secondEntry, thirdEntry);
    };

    onNextCallback();
  }

  getStepContent = (step) => {
    const {
      propositions,
      componentRefs,
    } = this.state;
    const ref = componentRefs[step];
    const proposition = propositions[step];
    const entries = propositions.length === 4 ? getDragDropEntries('A', 'B', 'C', 'D') : getDragDropEntries('A', 'B', 'C');
    return <PropositionToSymbolicForm proposition={proposition} ref={ref} dragdropentries={entries} />;
  }

  validate = (firstEntry, secondEntry, thirdEntry) => {
    const { onValidate } = this.props;
    const { mappingTable, step, propositions } = this.state;

    const validated = validateMappings(
      firstEntry,
      secondEntry,
      thirdEntry,
      propositions[step],
      mappingTable,
    );

    if (validated) {
      const {
        hint,
        result,
        updatedMappingTable,
      } = validated;

      onValidate(result, hint);

      if (result) {
        this.setState({
          step: step + 1,
          mappingTable: updatedMappingTable,
        });
      }
    }
  }

  getMappingForTerm = (term) => {
    const { mappingTable } = this.state;
    const mappingTableKeys = Object.keys(mappingTable);

    let i = mappingTableKeys.length;
    while (i >= 0) {
      const mappingTableKey = mappingTableKeys[i];
      const mappingTableValue = mappingTable[mappingTableKey];

      if (mappingTableValue === term) {
        return mappingTableKey;
      }

      i -= 1;
    }

    return null;
  }

  render() {
    const { key, step, propositions } = this.state;
    const steps = propositions.map((proposition, idx) => {
      const sententialForm = proposition.toSentence();
      const { firstTerm, secondTerm } = proposition.terms;
      const mappingForFirstTerm = this.getMappingForTerm(firstTerm);
      const mappingForSecondTerm = this.getMappingForTerm(secondTerm);

      if (mappingForFirstTerm && mappingForSecondTerm && idx < step) {
        const words = sententialForm.split(' ');
        const indexOfAre = words.indexOf('are');

        const wordsWithMappings = [];
        for (let i = 0; i < indexOfAre; i++) {
          wordsWithMappings.push(words[i]);
        }
        wordsWithMappings.push(`(${mappingForFirstTerm})`);
        for (let i = indexOfAre; i < words.length; i++) {
          wordsWithMappings.push(words[i]);
        }
        wordsWithMappings.push(`(${mappingForSecondTerm})`);

        return wordsWithMappings.join(' ');
      }

      return sententialForm;
    });
    return (
      <SimpleStepper
        key={key}
        step={step}
        steps={steps}
        content={this.getStepContent}
        onNext={this.onNext}
      />
    );
  }
}

export default withStyles(styles)(
  withQuestionTemplate(SyllogismToSymbolicFormQuestion),
);

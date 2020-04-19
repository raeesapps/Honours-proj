/* eslint-disable no-nested-ternary */
import React from 'react';

import hash from 'object-hash';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { stages, validateVennDiagram, validateArgument } from '../../logic/validator';

import SimpleStepper from '../Stepper/SimpleStepper';
import FourSetUninteractiveVennDiagram from '../VennDiagram/FourSetUninteractiveVennDiagram';
import ThreeSetUninteractiveVennDiagram from '../VennDiagram/ThreeSetUninteractiveVennDiagram';
import TwoSetInteractiveVennDiagram from '../VennDiagram/TwoSetInteractiveVennDiagram';
import TwoSetUninteractiveVennDiagram from '../VennDiagram/TwoSetUninteractiveVennDiagram';
import { TWO_SET_CIRCLES_ORIENTATION } from '../VennDiagram/venn_utils';
import LevelTwoVennDiagramTree from '../VennDiagramTree/LevelTwoVennDiagramTree';
import withQuestionTemplate from '../Questions/QuestionTemplate';

import styles from '../../assets/components/jss/MapAndArgueQuestion/map_and_argue_question_styles';

const { HORIZONTAL } = TWO_SET_CIRCLES_ORIENTATION;

class MapAndArgueQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { questionidx: questionIdx, content } = nextProps;
    const { conclusions: nextConclusions, propositionCollection: nextPropositionCollection } = content;
    const { conclusions, propositionCollection } = prevState;

    const conclusionsHash = hash(conclusions);
    const nextConclusionsHash = hash(nextConclusions);

    if (nextPropositionCollection.hashCode() !== propositionCollection.hashCode()
      || nextConclusionsHash !== conclusionsHash) {
      return {
        propositionCollection: nextPropositionCollection,
        conclusions: nextConclusions,
        key: Math.random(),
        step: 0,
        shadings: null,
        selectedIdx: -1,
        questionIdx,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content, questionidx: questionIdx } = props;
    const { propositionCollection, conclusions } = content;

    this.state = {
      key: Math.random(),
      propositionCollection,
      conclusions,
      step: 0,
      shadings: null,
      selectedIdx: -1,
      questionIdx,
    };
    this.propositionsVennDiagramRef = React.createRef();
    this.reducedPropositionsVennDiagramRef = React.createRef();
  }

  componentDidMount() {
    this.shadePropositionsVennDiagram();
    const { questionIdx } = this.state;
    const { setQuestionTitle, setQuestionNumber, setInstructions } = this.props;

    setQuestionTitle("Derive a proposition from the Venn diagram");
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions('Please map the shadings on the bigger Venn diagram to the smaller Venn diagram. If you do not understand how to map the shadings, please read the tutorial.');
  }

  componentDidUpdate() {
    this.shadePropositionsVennDiagram();
    const { setInstructions, setQuestionNumber } = this.props;
    const { questionIdx, step } = this.state;

    const instructions = step === 1 ? "Please select a proposition that follows from the shadings shown on the Venn diagram" :
      "Please map the shadings on the bigger Venn diagram to the smaller Venn diagram. If you do not understand how to map the shadings, please read the tutorial.";
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions(instructions);

  }

  shadePropositionsVennDiagram = () => {
    const { propositionCollection } = this.state;

    if (this.propositionsVennDiagramRef.current) {
      this.propositionsVennDiagramRef.current.applyShading(propositionCollection);
    }
  }

  onBack = (step) => {
    this.setState({ step: step - 1 }, () => {
      this.shadePropositionsVennDiagram();
    });
  }

  onNext = () => {
    const { step } = this.state;
    const result = this.validate();

    if (result) {
      const stateUpdateObject = step === 0
        ? { step: step + 1, shadings: this.reducedPropositionsVennDiagramRef.current.getShadings() }
        : { step: step + 1 };
      this.setState(stateUpdateObject);
    }
  }

  getStepContent = (step) => {
    const { propositionCollection, conclusions, shadings } = this.state;
    const marginLeft = propositionCollection.terms.length === 4 ? { marginLeft: '155px' } : {};
    const n = propositionCollection.terms.length;
    if (step === 0) {
      return (
        <LevelTwoVennDiagramTree
          order={propositionCollection.terms.length}
          combinedVennDiagram={
            n === 3
              ? <ThreeSetUninteractiveVennDiagram title="PropositionsCombined" propositions={propositionCollection} ref={this.propositionsVennDiagramRef} />
              : n === 4 ? <FourSetUninteractiveVennDiagram propositions={propositionCollection} ref={this.propositionsVennDiagramRef} />
                : <div />
          }
          conclusionOrReducedVennDiagram={
            <TwoSetInteractiveVennDiagram style={marginLeft} title="MappedPropositions" proposition={conclusions[0]} orientation={HORIZONTAL} ref={this.reducedPropositionsVennDiagramRef} />
          }
        />
      );
    }
    return (
      <div>
        <TwoSetUninteractiveVennDiagram title="Reduce2" shadings={shadings} orientation={HORIZONTAL} terms={conclusions[0].terms} />
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Please examine the Venn diagram and select a proposition that follows from it.
          </FormLabel>
          <RadioGroup aria-label="conclusions" name="customized-radios" onChange={(event) => this.setState({ selectedIdx: Number(event.target.value) })}>
            {
              conclusions.map((conclusion, idx) => (
                <FormControlLabel
                  key={conclusion.toSymbolicForm()}
                  value={String(idx)}
                  control={<Radio />}
                  label={conclusion.toSymbolicForm()}
                />
              ))
            }
            <FormControlLabel
              key="None"
              value="-1"
              control={<Radio />}
              label="No listed proposition follows!"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }

  validate = () => {
    function getTermsToExclude(conclusion) {
      const { firstTerm, secondTerm } = conclusion.terms;
      return [firstTerm, secondTerm];
    }
    const { REDUCTION_STAGE } = stages;
    const {
      propositionCollection,
      conclusions,
      step,
      selectedIdx,
    } = this.state;
    const { onValidate } = this.props;

    let result;

    if (step === 0) {
      result = validateVennDiagram(
        propositionCollection,
        this.reducedPropositionsVennDiagramRef,
        REDUCTION_STAGE,
        getTermsToExclude(conclusions[0]),
      );
    } else if (step === 1) {
      if (selectedIdx !== -1) {
        result = validateArgument(propositionCollection, conclusions[selectedIdx]);
      } else {
        result = conclusions
          .reduce((isCorrect, conclusion) => isCorrect
            && !validateArgument(propositionCollection, conclusion), true);
      }
    }

    onValidate(result, 'Incorrect!');
    return result;
  }

  render() {
    const { key, step } = this.state;
    const steps = ['Reduce Venn diagram', 'Select proposition'];
    return (
      <SimpleStepper
        key={key}
        style={{ width: '700px' }}
        step={step}
        steps={steps}
        content={this.getStepContent}
        onBack={this.onBack}
        onNext={this.onNext}
      />
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(MapAndArgueQuestion));

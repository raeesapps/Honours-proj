/* eslint-disable no-nested-ternary */
import React from 'react';

import hash from 'object-hash';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

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
    const { content } = nextProps;
    const { conclusions: nextConclusions, premiseCollection: nextPremiseCollection } = content;
    const { conclusions, premiseCollection } = prevState;

    const conclusionsHash = hash(conclusions);
    const nextConclusionsHash = hash(nextConclusions);

    if (nextPremiseCollection.hashCode() !== premiseCollection.hashCode()
      || nextConclusionsHash !== conclusionsHash) {
      return {
        premiseCollection: nextPremiseCollection,
        conclusions: nextConclusions,
        key: Math.random(),
        step: 0,
        shadings: null,
        selectedIdx: -1,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content } = props;
    const { premiseCollection, conclusions } = content;

    this.state = {
      key: Math.random(),
      premiseCollection,
      conclusions,
      step: 0,
      shadings: null,
      selectedIdx: -1,
    };
    this.premisesVennDiagramRef = React.createRef();
    this.reducedPremisesVennDiagramRef = React.createRef();
  }

  componentDidMount() {
    this.shadePremisesVennDiagram();
  }

  componentDidUpdate() {
    this.shadePremisesVennDiagram();
  }

  shadePremisesVennDiagram = () => {
    const { premiseCollection } = this.state;

    if (this.premisesVennDiagramRef.current) {
      this.premisesVennDiagramRef.current.applyShading(premiseCollection);
    }
  }

  onBack = (step) => {
    this.setState({ step: step - 1 }, () => {
      this.shadePremisesVennDiagram();
    });
  }

  onNext = () => {
    const { step } = this.state;
    const result = this.validate();

    if (result) {
      const stateUpdateObject = step === 0
        ? { step: step + 1, shadings: this.reducedPremisesVennDiagramRef.current.getShadings() }
        : { step: step + 1 };
      this.setState(stateUpdateObject);
    }
  }

  getStepContent = (step) => {
    const { premiseCollection, conclusions, shadings } = this.state;
    const marginLeft = premiseCollection.terms.length === 4 ? { marginLeft: '155px' } : {};
    const n = premiseCollection.terms.length;
    if (step === 0) {
      return (
        <LevelTwoVennDiagramTree
          order={premiseCollection.terms.length}
          combinedVennDiagram={
            n === 3
              ? <ThreeSetUninteractiveVennDiagram title="PremisesCombined" premises={premiseCollection} ref={this.premisesVennDiagramRef} />
              : n === 4 ? <FourSetUninteractiveVennDiagram premises={premiseCollection} ref={this.premisesVennDiagramRef} />
                : <div />
          }
          conclusionOrReducedVennDiagram={
            <TwoSetInteractiveVennDiagram style={marginLeft} title="MappedPremises" premise={conclusions[0]} orientation={HORIZONTAL} ref={this.reducedPremisesVennDiagramRef} />
          }
        />
      );
    }
    return (
      <div>
        <Typography variant="h6">
          Mapped Venn Diagram:
        </Typography>
        <TwoSetUninteractiveVennDiagram title="Reduce2" shadings={shadings} orientation={HORIZONTAL} terms={conclusions[0].terms} />
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Please select the conclusion that is entailed by the Venn Diagram.
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
              label="No Conclusion Follows"
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
    const { MAPPING_STAGE } = stages;
    const {
      premiseCollection,
      conclusions,
      step,
      selectedIdx,
    } = this.state;
    const { onValidate } = this.props;

    let result;

    if (step === 0) {
      result = validateVennDiagram(
        premiseCollection,
        this.reducedPremisesVennDiagramRef,
        MAPPING_STAGE,
        getTermsToExclude(conclusions[0]),
      );
    } else if (step === 1) {
      if (selectedIdx !== -1) {
        result = validateArgument(premiseCollection, conclusions[selectedIdx]);
      } else {
        result = conclusions
          .reduce((isCorrect, conclusion) => isCorrect
            && !validateArgument(premiseCollection, conclusion), true);
      }
    }

    onValidate(result, 'Incorrect!');
    return result;
  }

  render() {
    const { key, step } = this.state;
    const steps = ['Map Venn Diagram', 'Argue'];
    return (
      <div key={key}>
        <Typography variant="h5">
          Map and argue
        </Typography>
        <SimpleStepper
          style={{ width: '700px' }}
          step={step}
          steps={steps}
          content={this.getStepContent}
          onBack={this.onBack}
          onNext={this.onNext}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(MapAndArgueQuestion));

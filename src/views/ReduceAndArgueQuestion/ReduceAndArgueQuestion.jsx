import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram } from '../../logic/validator';

import Arrow from '../../components/Arrow/Arrow';
import SimpleStepper from '../../components/Stepper/SimpleStepper';
import FourSetUninteractiveVennDiagram from '../../components/VennDiagram/FourSetUninteractiveVennDiagram';
import ThreeSetUninteractiveVennDiagram from '../../components/VennDiagram/ThreeSetUninteractiveVennDiagram';
import TwoSetInteractiveVennDiagram from '../../components/VennDiagram/TwoSetInteractiveVennDiagram';
import withSidebar from '../../components/Questions/QuestionSidebar';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';

import styles from '../../assets/views/jss/ReduceAndArgueQuestion/reduce_and_argue_question_styles';

function getConclusionPremise(premiseCollection) {
  const { premises } = premiseCollection;
  const numberOfPremises = premises.length;

  return premises[numberOfPremises - 1];
}

class ReduceAndArgueQuestion extends React.Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;

    this.state = {
      step: 0,
    };
    this.premiseCollection = content;
    this.premisesVennDiagramRef = React.createRef();
    this.reducedPremisesVennDiagramRef = React.createRef();
  }

  componentDidMount() {
    if (!this.premisesVennDiagramRef.current) {
      throw new Error('Ref not set!');
    }

    this.premisesVennDiagramRef.current.applyShading(this.premiseCollection);
  }

  onBack = (step) => {
    this.setState({ step: step - 1 });
  }

  onNext = () => {
    const { step } = this.state;
    const result = this.validate();

    if (result) {
      this.setState({ step: step + 1 });
    }
  }

  onReset = () => {
    this.setState({ step: 0 });
  }

  getStepContent = (step) => {
    function renderUninteractiveVennDiagram(premiseCollection, vennDiagramRef) {
      const n = premiseCollection.terms.length;
      let x1;
      let y1;
      let x2;
      let y2;

      if (n === 3) {
        x1 = 150;
        y1 = 0;
        x2 = 150;
        y2 = 250;
      } else if (n === 4) {
        x1 = 300;
        y1 = 0;
        x2 = 300;
        y2 = 250;
      }
      return (
        <div>
          {
            n === 3 && <ThreeSetUninteractiveVennDiagram title="dfdfsdfs" premises={premiseCollection} ref={vennDiagramRef} />
          }
          {
            n === 4 && <FourSetUninteractiveVennDiagram premises={premiseCollection} ref={vennDiagramRef} />
          }
          <Arrow
            id="Arrow"
            width={350}
            height={275}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
          />
        </div>
      );
    }
    const marginLeft = this.premiseCollection.terms.length === 4 ? { marginLeft: '14%' } : {};
    if (step === 0) {
      return (
        <div>
          {
            renderUninteractiveVennDiagram(this.premiseCollection, this.premisesVennDiagramRef)
          }
          <TwoSetInteractiveVennDiagram style={marginLeft} title="Reduce" premise={getConclusionPremise(this.premiseCollection)} ref={this.reducedPremisesVennDiagramRef} />

        </div>
      );
    }
    return <div />;
  }

  validate = () => {
    function getTermsToExclude(premiseCollection) {
      const { premises } = premiseCollection;

      const termSet = new Set();
      premises.forEach((premise) => {
        const { firstTerm, secondTerm } = premise.terms;
        termSet.add(firstTerm);
        termSet.add(secondTerm);
      });

      const conclusion = getConclusionPremise(premiseCollection);
      const { firstTerm: conclusionFirstTerm, secondTerm: conclusionSecondTerm } = conclusion.terms;
      return [...termSet].filter((term) => term !== conclusionFirstTerm && term !== conclusionSecondTerm);
    }
    const { REDUCTION_STAGE } = stages;
    const { onValidate } = this.props;

    const result = validateVennDiagram(this.premiseCollection, this.reducedPremisesVennDiagramRef, REDUCTION_STAGE, getTermsToExclude(this.premiseCollection));
    onValidate(result, 'Incorrect!');

    return result;
  }

  render() {
    const { step } = this.state;
    const steps = ['Reduce Venn Diagram', 'Argue'];
    return (
      <div>
        <Typography variant="h5">
          Reduce and argue
        </Typography>
        <SimpleStepper
          step={step}
          steps={steps}
          content={this.getStepContent}
          onBack={this.onBack}
          onNext={this.onNext}
          onReset={this.onReset}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withSidebar(withQuestionTemplate(ReduceAndArgueQuestion)));

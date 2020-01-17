import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram, validateArgument } from '../../logic/validator';

import Arrow from '../../components/Arrow/Arrow';
import SimpleStepper from '../../components/Stepper/SimpleStepper';
import FourSetUninteractiveVennDiagram from '../../components/VennDiagram/FourSetUninteractiveVennDiagram';
import ThreeSetUninteractiveVennDiagram from '../../components/VennDiagram/ThreeSetUninteractiveVennDiagram';
import TwoSetInteractiveVennDiagram from '../../components/VennDiagram/TwoSetInteractiveVennDiagram';
import TwoSetUninteractiveVennDiagram from '../../components/VennDiagram/TwoSetUninteractiveVennDiagram';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';

import styles from '../../assets/views/jss/MapAndArgueQuestion/map_and_argue_question_styles';

class MapAndArgueQuestion extends React.Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;
    const { premiseCollection, conclusion } = content;

    this.premiseCollection = premiseCollection;
    this.conclusion = conclusion;
    this.state = {
      step: 0,
      shadings: null,
      entails: null,
    };
    this.premisesVennDiagramRef = React.createRef();
    this.reducedPremisesVennDiagramRef = React.createRef();
  }

  componentDidMount() {
    this.shadePremisesVennDiagram();
  }

  shadePremisesVennDiagram = () => {
    if (!this.premisesVennDiagramRef.current) {
      throw new Error('Ref not set!');
    }

    this.premisesVennDiagramRef.current.applyShading(this.premiseCollection);
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
            n === 4
            && (
              <FourSetUninteractiveVennDiagram premises={premiseCollection} ref={vennDiagramRef} />
            )
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
    const { shadings } = this.state;
    const marginLeft = this.premiseCollection.terms.length === 4 ? { marginLeft: '14%' } : {};
    if (step === 0) {
      return (
        <div>
          {
            renderUninteractiveVennDiagram(this.premiseCollection, this.premisesVennDiagramRef)
          }
          <TwoSetInteractiveVennDiagram style={marginLeft} title="Reduce" premise={this.conclusion} ref={this.reducedPremisesVennDiagramRef} />

        </div>
      );
    }
    return (
      <div>
        <Typography variant="h6">
          Mapped Venn Diagram:
        </Typography>
        <TwoSetUninteractiveVennDiagram title="Reduce2" shadings={shadings} terms={this.conclusion.terms} />
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Does the reduced Venn Diagram entail the conclusion
            {
              ` '${this.conclusion.toSymbolicForm()}'?`
            }
          </FormLabel>
          <RadioGroup aria-label="gender" name="customized-radios" onChange={(event) => this.setState({ entails: event.target.value })}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }

  validate = () => {
    function getTermsToExclude(premiseCollection, conclusion) {
      const { premises } = premiseCollection;

      const termSet = new Set();
      premises.forEach((premise) => {
        const { firstTerm, secondTerm } = premise.terms;
        termSet.add(firstTerm);

        if (secondTerm) {
          termSet.add(secondTerm);
        }
      });

      const { firstTerm: conclusionFirstTerm, secondTerm: conclusionSecondTerm } = conclusion.terms;
      const termsToExclude = [...termSet]
        .filter((term) => term !== conclusionFirstTerm && term !== conclusionSecondTerm);
      return termsToExclude;
    }
    const { MAPPING_STAGE } = stages;
    const { step, entails } = this.state;
    const { onValidate } = this.props;

    let result;

    if (step === 0) {
      result = validateVennDiagram(
        this.premiseCollection,
        this.reducedPremisesVennDiagramRef,
        MAPPING_STAGE,
        getTermsToExclude(this.premiseCollection, this.conclusion),
      );
    } else if (step === 1) {
      result = validateArgument(this.premiseCollection, this.conclusion, entails === 'true');
    }

    onValidate(result, 'Incorrect!');

    return result;
  }

  render() {
    const { step } = this.state;
    const steps = ['Map Venn Diagram', 'Argue'];
    return (
      <div>
        <Typography variant="h5">
          Map and argue
        </Typography>
        <SimpleStepper
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

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Premise, forms } from '../../logic/premise';
import PremiseCollection from '../../logic/premise_collection';
import RepresentPremisesIndividuallyStep from './RepresentPremisesIndividuallyStep/RepresentPremisesIndividuallyStep';
import CombinePremisesStep from './CombinePremisesStep/CombinePremisesStep';
import styles from '../../assets/views/jss/RepresentPremises/represent_premise_question_styles';

class RepresentPremiseQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.representationStepRef = React.createRef();
    this.combinationStepRef = React.createRef();

    this.state = {
      premises: [],
      refs: [],
      argument: null,
      vennDiagramShadings: null,
      premiseSets: null,
      step: 0,
    };

    this.getStepContent = this.getStepContent.bind(this);
    this.getVennDiagramShadingsAndSets = this.getVennDiagramShadingsAndSets.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  componentWillMount() {
    const { ALL_A_IS_B } = forms;
    let { premises } = this.props;

    const refs = [React.createRef(), React.createRef()];

    premises = premises || [new Premise(ALL_A_IS_B, {
      firstTerm: 'Men',
      secondTerm: 'Mortal',
    }), new Premise(ALL_A_IS_B, {
      firstTerm: 'Greeks',
      secondTerm: 'Men',
    })];
    const argument = new PremiseCollection([...premises]);

    this.setState({
      premises,
      argument,
      refs,
    });
  }

  onNext(step, steps) {
    const { representationStepRef, combinationStepRef } = this;

    if (step === steps.length - 1) {
      combinationStepRef.current.validate();
      this.setState({ step: step + 1 });
    } else {
      const { vennDiagramShadings, premiseSets } = this.getVennDiagramShadingsAndSets();
      representationStepRef.current.validate();
      this.setState({ step: step + 1, vennDiagramShadings, premiseSets });
    }
  }

  getVennDiagramShadingsAndSets() {
    const { refs, premises } = this.state;

    const vennDiagramShadings = refs.map((ref) => ref.current.getShadings());
    const premiseSets = premises.map((premise) => premise.getSets());

    return {
      vennDiagramShadings,
      premiseSets,
    };
  }

  getStepContent(step) {
    const { representationStepRef, combinationStepRef } = this;
    const {
      premises,
      refs,
      vennDiagramShadings,
      argument,
      premiseSets,
    } = this.state;

    switch (step) {
      case 0:
        return (
          <RepresentPremisesIndividuallyStep
            ref={representationStepRef}
            premises={premises}
            refs={refs}
            vennDiagramShadings={vennDiagramShadings}
          />
        );
      default:
        return (
          <CombinePremisesStep
            ref={combinationStepRef}
            argument={argument}
            vennDiagramShadings={vennDiagramShadings}
            premiseSets={premiseSets}
          />
        );
    }
  }

  render() {
    const { classes } = this.props;
    const { step } = this.state;
    const steps = ['Represent Premises Individually', 'Combine Premises'];
    return (
      <div className={classes.root}>
        <Container>
          <Stepper activeStep={step} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {this.getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={step === 0}
                        onClick={() => this.setState({ step: step - 1 })}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.onNext(step, steps)}
                        className={classes.button}
                      >
                        {step === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {
            step === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={() => this.setState({ step: 0 })} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )
          }
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(RepresentPremiseQuestion);

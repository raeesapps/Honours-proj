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

import PremiseToListStep from './PremiseToListStep/PremiseToListStep';

import styles from '../../assets/views/jss/ArgumentToListQuestion/argument_to_list_question_styles';
import PremiseCollection from '../../logic/premise_collection';
import { Premise, forms } from '../../logic/premise';

class ArgumentToListQuestion extends React.Component {
  constructor(props) {
    super(props);

    const a = 'lions';
    const b = 'big cats';
    const c = 'predators';
    const d = 'carnivores';

    const { ALL_A_IS_B } = forms;

    const allLionsAreBigCatsPremise = new Premise(ALL_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${b}`,
    });
    const allBigCatsArePredators = new Premise(ALL_A_IS_B, {
      firstTerm: `${b}`,
      secondTerm: `${c}`,
    });
    const allPredatorsAreCarnivores = new Premise(ALL_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${d}`,
    });

    const argument = new PremiseCollection([allLionsAreBigCatsPremise, allBigCatsArePredators, allPredatorsAreCarnivores]);

    this.componentRefs = [...Array(argument.size()).keys()].map(() => React.createRef());
    this.state = {
      premises: argument.premises,
      step: 0,
      hint: null,
    };
    this.getStepContent = this.getStepContent.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  onNext(step, steps) {
    const { componentRefs } = this;
    const ref = componentRefs[step];

    if (!ref.current) {
      throw new Error('Reference is not referencing a component!');
    }

    const { result, hint } = ref.current.validate();

    if (result) {
      this.setState({
        step: step + 1,
      });
    } else {
      ref.current.showErrorBar(hint);
    }
  }

  getStepContent(step) {
    const { componentRefs } = this;
    const { premises } = this.state;
    const ref = componentRefs[step];
    const premise = premises[step];

    return <PremiseToListStep premise={premise} ref={ref} />;
  }

  render() {
    const { classes } = this.props;
    const { step, premises } = this.state;
    const steps = premises.map((premise) => premise.toSentence());
    return (
      <div className={classes.root}>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '5px' }}>Translate Premises to Haskell List Comprehension; </Typography>

          {
            premises.map((premise, idx) => (
              <Typography style={{ marginBottom: idx === premises.length - 1 ? '10px' : '0' }} variant="h4">{premise.toSentence()}</Typography>
            ))
          }
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

export default withStyles(styles)(ArgumentToListQuestion);

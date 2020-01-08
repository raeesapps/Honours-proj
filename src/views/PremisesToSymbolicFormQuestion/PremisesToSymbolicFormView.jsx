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

import PremiseToSymbolicFormStep from './PremiseToSymbolicFormStep/PremiseToSymbolicFormStep';

import styles from '../../assets/views/jss/PremisesToSymbolicFormQuestion/premises_to_symbolic_form_view_styles';

class PremisesToSymbolicFormView extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;

    this.componentRefs = [...Array(content.size()).keys()].map(() => React.createRef());
    this.state = {
      premises: content.premises,
      step: 0,
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

    return <PremiseToSymbolicFormStep premise={premise} ref={ref} />;
  }

  render() {
    const { classes } = this.props;
    const { step, premises } = this.state;
    const steps = premises.map((premise) => premise.toSentence());
    return (
      <div className={classes.root}>
        <Container>
          <Typography variant="h5" style={{ marginBottom: '5px' }}>Translate Syllogism to Symbolic Form</Typography>

          {
            premises.map((premise, idx) => (
              <Typography style={{ marginBottom: idx === premises.length - 1 ? '10px' : '0' }} variant="subtitle1">{premise.toSentence()}</Typography>
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

export default withStyles(styles)(PremisesToSymbolicFormView);

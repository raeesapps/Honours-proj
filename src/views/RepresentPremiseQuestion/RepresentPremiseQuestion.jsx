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

import RepresentPremisesIndividuallyStep from './RepresentPremisesIndividuallyStep/RepresentPremisesIndividuallyStep';
import styles from '../../assets/views/jss/RepresentPremises/represent_premise_question_styles';

class RepresentPremiseQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      step: 0,
      childStateDump: null,
    };

    this.getStepContent = this.getStepContent.bind(this);
  }

  getStepContent(step) {
    const { ref } = this;
    const { childStateDump } = this.state;
    switch (step) {
      case 0:
        return <RepresentPremisesIndividuallyStep ref={ref} dump={childStateDump} />;
      default:
        return <div />;
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
                        onClick={() => {
                          this.ref.current.validate();
                          this.setState({ step: step + 1, childStateDump: this.ref.current.dumpState() });
                        }}
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

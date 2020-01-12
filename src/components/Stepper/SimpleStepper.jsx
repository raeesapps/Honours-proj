import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import styles from '../../assets/components/jss/SimpleStepper/simple_stepper_styles';

function SimpleStepper(props) {
  const {
    step,
    steps,
    content,
    onBack,
    onNext,
    onReset,
    classes,
    ...rest
  } = props;
  return (
    <div {...rest}>
      <Stepper activeStep={step} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {content(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={step === 0}
                    onClick={() => onBack(step)}
                    className={classes.button}
                  >
                    Back
                    </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onNext(step, steps)}
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
            <Button onClick={onReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )
      }
    </div>
  );
}

export default withStyles(styles)(SimpleStepper);

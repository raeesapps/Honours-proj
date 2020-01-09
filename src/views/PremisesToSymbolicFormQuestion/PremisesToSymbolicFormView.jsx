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

import { validateMappings } from '../../logic/validator';
import PremiseToSymbolicForm from '../../components/PremiseToSymbolicForm/PremiseToSymbolicForm';

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
      mappingTable: {},
      goingBack: false,
    };
    this.getStepContent = this.getStepContent.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onReset = this.onReset.bind(this);
    this.verify = this.verify.bind(this);
  }

  onBack(step) {
    this.setState({ step: step - 1, goingBack: true });
  }

  onNext(step) {
    const { goingBack } = this.state;
    const onNextCallback = () => {
      const { componentRefs } = this;
      const ref = componentRefs[step];

      if (!ref.current) {
        throw new Error('Reference is not referencing a component!');
      }

      const { firstEntry, secondEntry, thirdEntry } = ref.current.getEntries();
      this.verify(firstEntry, secondEntry, thirdEntry, ref);
    };

    if (goingBack) {
      this.setState({ goingBack: false }, onNextCallback);
    } else {
      onNextCallback();
    }
  }

  onReset() {
    this.setState({ step: 0, goingBack: false, mappingTable: {} });
  }

  getStepContent(step) {
    const { componentRefs } = this;
    const { premises, mappingTable, goingBack } = this.state;
    const ref = componentRefs[step];
    const premise = premises[step];

    if (goingBack) {
      return <PremiseToSymbolicForm premise={premise} ref={ref} mappingTable={mappingTable} />;
    }
    return <PremiseToSymbolicForm premise={premise} ref={ref} />;
  }

  verify(firstEntry, secondEntry, thirdEntry, ref) {
    const validationResult = validateMappings(firstEntry, secondEntry, thirdEntry, this.state);

    if (validationResult) {
      const {
        hint,
        result,
        updatedMappingTable,
      } = validationResult;

      if (result) {
        const { step } = this.state;
        this.setState({
          step: step + 1,
          mappingTable: updatedMappingTable,
        });
      } else {
        ref.current.showErrorBar(hint);
      }
    }
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
                        onClick={() => this.onBack(step)}
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
                <Button onClick={this.onReset} className={classes.button}>
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

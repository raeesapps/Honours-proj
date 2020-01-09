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

import { symbolicForms, getEntailmentSymbol, getSymbolicForm } from '../../logic/premise';
import copy from '../../utils/copy';
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
    this.updateMappingTable = this.updateMappingTable.bind(this);
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

      const updatedMappingTable = this.updateMappingTable(firstEntry, secondEntry, thirdEntry);
      this.verify(firstEntry, secondEntry, thirdEntry, updatedMappingTable, ref);
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

  verify(firstEntry, secondEntry, thirdEntry, updatedMappingTable, ref) {
    if (updatedMappingTable) {
      let hint;
      let result = true;

      if (firstEntry.length === 0) {
        hint = 'Please drag an item into the first box!';
        result = false;
      }

      if (secondEntry.length === 0) {
        hint = 'Please drag an item into the second box!';
        result = false;
      }

      if (thirdEntry.length === 0) {
        hint = 'Please drag an item into the third box!';
        result = false;
      }

      if (!hint) {
        const {
          A_ENTAILS_B,
          A_DOES_NOT_ENTAIL_B,
          A_ENTAILS_NOT_B,
          A_DOES_NOT_ENTAIL_NOT_B,
        } = symbolicForms;

        const { content: firstEntryContents } = firstEntry[0];
        const { content: secondEntryContents } = secondEntry[0];
        const { content: thirdEntryContents } = thirdEntry[0];

        const { premises, step } = this.state;
        const currentPremise = premises[step];
        const symbolicFormOfPremise = getSymbolicForm(currentPremise);
        const expectedEntailmentSymbol = getEntailmentSymbol(symbolicFormOfPremise);
        const { firstTerm, secondTerm } = currentPremise.terms;

        let count = 0;
        Object.keys(updatedMappingTable).forEach((mappingKey) => {
          const entry = updatedMappingTable[mappingKey];

          let secondMappingKey;
          switch (symbolicFormOfPremise) {
            case A_DOES_NOT_ENTAIL_NOT_B:
            case A_ENTAILS_NOT_B:
              secondMappingKey = `!${mappingKey}`;
              break;
            case A_ENTAILS_B:
            case A_DOES_NOT_ENTAIL_B:
              secondMappingKey = mappingKey;
              break;
            default:
              break;
          }

          if ((entry === firstTerm && mappingKey === firstEntryContents)
            || (entry === secondTerm && secondMappingKey === thirdEntryContents)) {
            count += 1;
          }
        });
        result = result && count === 2 && expectedEntailmentSymbol === secondEntryContents;

        if (expectedEntailmentSymbol !== secondEntryContents && count !== 2) {
          hint = 'Both your mappings and entailment symbol are wrong!';
        } else if (expectedEntailmentSymbol !== secondEntryContents) {
          hint = 'Your entailment symbol is wrong!';
        } else if (count !== 2) {
          hint = 'Your mappings are wrong!';
        }
      }

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


  updateMappingTable(firstEntry, secondEntry, thirdEntry) {
    if (firstEntry.length && secondEntry.length && thirdEntry.length) {
      const {
        premises,
        mappingTable,
        step,
      } = this.state;
      const {
        A_ENTAILS_B,
        A_DOES_NOT_ENTAIL_B,
        A_ENTAILS_NOT_B,
        A_DOES_NOT_ENTAIL_NOT_B,
      } = symbolicForms;
      const currentPremise = premises[step];
      const symbolicForm = getSymbolicForm(currentPremise);
      const { firstTerm, secondTerm } = currentPremise.terms;
      const updatedMappingTable = copy(mappingTable);

      const { content: firstEntryContents } = firstEntry[0];
      const { content: thirdEntryContents } = thirdEntry[0];

      let firstSymbol;
      if (firstEntryContents.length === 2) {
        const [, secondItem] = firstEntryContents;
        firstSymbol = secondItem;
      } else {
        const [firstItem] = firstEntryContents;
        firstSymbol = firstItem;
      }

      if (!(firstSymbol in mappingTable)) {
        const firstTermKey = Object.keys(updatedMappingTable).find((key) => updatedMappingTable[key] === firstTerm);

        if (firstTermKey) {
          delete updatedMappingTable[firstTermKey];
        }
        updatedMappingTable[firstSymbol] = firstTerm;
      }

      let secondSymbol;
      switch (symbolicForm) {
        case A_DOES_NOT_ENTAIL_NOT_B:
        case A_ENTAILS_NOT_B:
          if (thirdEntryContents.length !== 1) {
            const [, secondItem] = thirdEntryContents;
            secondSymbol = secondItem;
          }
          break;
        case A_ENTAILS_B:
        case A_DOES_NOT_ENTAIL_B:
          if (thirdEntryContents.length !== 2) {
            const [firstItem] = thirdEntryContents;
            secondSymbol = firstItem;
          }
          break;
        default:
          break;
      }
      if (!(secondSymbol in mappingTable)) {
        const secondTermKey = Object.keys(updatedMappingTable).find((key) => updatedMappingTable[key] === secondTerm);

        if (secondTermKey) {
          delete updatedMappingTable[secondTermKey];
        }
        updatedMappingTable[secondSymbol] = secondTerm;
      }

      return updatedMappingTable;
    }

    return null;
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

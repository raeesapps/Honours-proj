import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { validateMappings } from '../../logic/validator';
import PremiseToSymbolicForm from '../../components/PremiseToSymbolicForm/PremiseToSymbolicForm';
import SimpleStepper from '../../components/Stepper/SimpleStepper';
import withSidebar from '../../components/Questions/QuestionSidebar';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';

import styles from '../../assets/views/jss/PremisesToSymbolicFormQuestion/premises_to_symbolic_form_question_styles';

class PremisesToSymbolicFormQuestion extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;
    const { premiseCollection, conclusion } = content;

    this.componentRefs = [...Array(premiseCollection.size() + 1).keys()]
      .map(() => React.createRef());
    this.state = {
      premises: [...premiseCollection.premises, conclusion],
      step: 0,
      mappingTable: {},
      goingBack: false,
    };
  }

  onBack = (step) => {
    this.setState({ step: step - 1, goingBack: true });
  }

  onNext = (step) => {
    const { goingBack } = this.state;
    const onNextCallback = () => {
      const { componentRefs } = this;
      const ref = componentRefs[step];

      if (!ref.current) {
        throw new Error('Reference is not referencing a component!');
      }

      const { firstEntry, secondEntry, thirdEntry } = ref.current.getEntries();
      this.validate(firstEntry, secondEntry, thirdEntry);
    };

    if (goingBack) {
      this.setState({ goingBack: false }, onNextCallback);
    } else {
      onNextCallback();
    }
  }

  onReset = () => {
    this.setState({ step: 0, goingBack: false, mappingTable: {} });
  }

  getStepContent = (step) => {
    const { componentRefs } = this;
    const { premises, mappingTable, goingBack } = this.state;
    const ref = componentRefs[step];
    const premise = premises[step];

    if (goingBack) {
      return <PremiseToSymbolicForm premise={premise} ref={ref} table={mappingTable} />;
    }
    return <PremiseToSymbolicForm premise={premise} ref={ref} />;
  }

  validate = (firstEntry, secondEntry, thirdEntry) => {
    const { onValidate } = this.props;
    const { mappingTable, step, premises } = this.state;

    const validationResult = validateMappings(
      firstEntry,
      secondEntry,
      thirdEntry,
      premises[step],
      mappingTable,
    );

    if (validationResult) {
      const {
        hint,
        result,
        updatedMappingTable,
      } = validationResult;

      onValidate(result, hint);

      if (result) {
        const { step } = this.state;
        this.setState({
          step: step + 1,
          mappingTable: updatedMappingTable,
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { step, premises } = this.state;
    const steps = premises.map((premise) => premise.toSentence());
    return (
      <div className={classes.root}>
        <Typography variant="h5" style={{ marginBottom: '5px' }}>Translate Syllogism to Symbolic Form</Typography>

        {
          premises.map((premise, idx) => (
            <Typography key={premise.toSentence()} style={{ marginBottom: idx === premises.length - 1 ? '10px' : '0' }} variant="subtitle1">{premise.toSentence()}</Typography>
          ))
        }
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

export default withStyles(styles)(
  withSidebar(withQuestionTemplate(PremisesToSymbolicFormQuestion)),
);

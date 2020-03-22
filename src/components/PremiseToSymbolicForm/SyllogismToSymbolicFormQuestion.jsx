import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { validateMappings } from '../../logic/validator';
import PremiseToSymbolicForm from './PremiseToSymbolicForm';
import SimpleStepper from '../Stepper/SimpleStepper';
import withQuestionTemplate from '../Questions/QuestionTemplate';

import styles from '../../assets/components/jss/PremiseToSymbolicForm/syllogism_to_symbolic_form_question_styles';

class SyllogismToSymbolicFormQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { content } = nextProps;
    const { premiseCollection: nextPremiseCollection, conclusion: nextConclusion } = content;
    const { premiseCollection, conclusion } = prevState;
    if (nextPremiseCollection.hashCode() !== premiseCollection.hashCode()
      && nextConclusion.hashCode() !== conclusion.hashCode()) {
      return {
        key: Math.random(),
        premiseCollection: nextPremiseCollection,
        conclusion: nextConclusion,
        premises: [...nextPremiseCollection.premises, nextConclusion],
        componentRefs: [...Array(nextPremiseCollection.size() + 1).keys()]
          .map(() => React.createRef()),
        step: 0,
        mappingTable: {},
        goingBack: false,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content } = props;
    const { premiseCollection, conclusion } = content;

    this.state = {
      key: Math.random(),
      premiseCollection,
      conclusion,
      premises: [...premiseCollection.premises, conclusion],
      componentRefs: [...Array(premiseCollection.size() + 1).keys()]
        .map(() => React.createRef()),
      step: 0,
      mappingTable: {},
      goingBack: false,
    };
  }

  onBack = (step) => {
    this.setState({ step: step - 1, goingBack: true });
  }

  onNext = (step) => {
    const { goingBack, componentRefs } = this.state;
    const onNextCallback = () => {
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

  getStepContent = (step) => {
    const {
      premises,
      mappingTable,
      goingBack,
      componentRefs,
    } = this.state;
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

    const validated = validateMappings(
      firstEntry,
      secondEntry,
      thirdEntry,
      premises[step],
      mappingTable,
    );

    if (validated) {
      const {
        hint,
        result,
        updatedMappingTable,
      } = validated;

      onValidate(result, hint);

      if (result) {
        this.setState({
          step: step + 1,
          mappingTable: updatedMappingTable,
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { key, step, premises } = this.state;
    const steps = premises.map((premise) => premise.toSentence());
    return (
      <div className={classes.root} key={key}>
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
        />
      </div>
    );
  }
}

export default withStyles(styles)(
  withQuestionTemplate(SyllogismToSymbolicFormQuestion),
);

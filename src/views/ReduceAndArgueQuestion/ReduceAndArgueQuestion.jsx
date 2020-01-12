import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram } from '../../logic/validator';

import FourSetUninteractiveVennDiagram from '../../components/VennDiagram/FourSetUninteractiveVennDiagram';
import ThreeSetUninteractiveVennDiagram from '../../components/VennDiagram/ThreeSetUninteractiveVennDiagram';
import TwoSetInteractiveVennDiagram from '../../components/VennDiagram/TwoSetInteractiveVennDiagram';
import withSidebar from '../../components/Questions/QuestionSidebar';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';

import styles from '../../assets/views/jss/ReduceAndArgueQuestion/reduce_and_argue_question_styles';

function getConclusionPremise(premiseCollection) {
  const { premises } = premiseCollection;
  const numberOfPremises = premises.length;

  return premises[numberOfPremises - 1];
}

class ReduceAndArgueQuestion extends React.Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;

    this.premiseCollection = content;
    this.premisesVennDiagramRef = React.createRef();
    this.reducedPremisesVennDiagramRef = React.createRef();
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (!this.premisesVennDiagramRef.current) {
      throw new Error('Ref not set!');
    }

    this.premisesVennDiagramRef.current.applyShading(this.premiseCollection);
  }

  validate() {
    function getTermsToExclude(premiseCollection) {
      const { premises } = premiseCollection;

      const termSet = new Set();
      premises.forEach((premise) => {
        const { firstTerm, secondTerm } = premise.terms;
        termSet.add(firstTerm);
        termSet.add(secondTerm);
      });

      const conclusion = getConclusionPremise(premiseCollection);
      const { firstTerm: conclusionFirstTerm, secondTerm: conclusionSecondTerm } = conclusion.terms;
      return [...termSet].filter((term) => term !== conclusionFirstTerm && term !== conclusionSecondTerm);
    }
    const { REDUCTION_STAGE } = stages;
    const { onValidate } = this.props;

    const result = validateVennDiagram(this.premiseCollection, this.reducedPremisesVennDiagramRef, REDUCTION_STAGE, getTermsToExclude(this.premiseCollection));
    onValidate(result, 'Incorrect!');
  }

  render() {
    function renderUninteractiveVennDiagram(premiseCollection, vennDiagramRef) {
      if (premiseCollection.terms.length === 3) {
        return <ThreeSetUninteractiveVennDiagram title="dfdfsdfs" premises={premiseCollection} ref={vennDiagramRef} />;
      }
      if (premiseCollection.terms.length === 4) {
        return <FourSetUninteractiveVennDiagram premises={premiseCollection} ref={vennDiagramRef} />;
      }
      throw new Error('Only 3 or 4 sets are supported!');
    }

    return (
      <div>
        <Typography variant="h5">
          Reduce and argue
        </Typography>
        <Paper>
          {
            renderUninteractiveVennDiagram(this.premiseCollection, this.premisesVennDiagramRef)
          }
          <TwoSetInteractiveVennDiagram title="Reduce" premise={getConclusionPremise(this.premiseCollection)} ref={this.reducedPremisesVennDiagramRef} />
        </Paper>
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withSidebar(withQuestionTemplate(ReduceAndArgueQuestion)));

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram } from '../../logic/validator';

import FourSetInteractiveVennDiagram from '../VennDiagram/FourSetInteractiveVennDiagram';
import ThreeSetInteractiveVennDiagram from '../VennDiagram/ThreeSetInteractiveVennDiagram';
import TwoSetUninteractiveVennDiagram from '../VennDiagram/TwoSetUninteractiveVennDiagram';
import { TWO_SET_CIRCLES_ORIENTATION } from '../VennDiagram/venn_utils';
import LevelOneVennDiagramTree from '../VennDiagramTree/LevelOneVennDiagramTree';
import { forms } from '../../logic/proposition';
import PropositionCollection from '../../logic/proposition_collection';
import withQuestionTemplate from '../Questions/QuestionTemplate';

import styles from '../../assets/components/jss/CombineDiagramsQuestion/combine_diagrams_question_styles';

const { VERTICAL } = TWO_SET_CIRCLES_ORIENTATION;

class CombineDiagramsQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { questionidx: questionIdx, content: nextPropositionCollection } = nextProps;
    const { propositionCollection } = prevState;

    if (nextPropositionCollection.hashCode() !== propositionCollection.hashCode()) {
      return {
        propositionCollection: nextPropositionCollection,
        propositionsVennDiagramRef: [...Array(nextPropositionCollection.propositions.length)
          .keys()].map(() => React.createRef()),
        key: Math.random(),
        questionIdx,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content, questionidx: questionIdx } = props;

    this.state = {
      propositionCollection: content,
      key: Math.random(),
      propositionsVennDiagramRef: [...Array(content.propositions.length).keys()].map(() => React.createRef()),
      questionIdx,
    };
    this.combinationVennDiagramRef = React.createRef();
  }

  componentDidUpdate() {
    this.shade();
    const { questionIdx } = this.state;
    const { setQuestionNumber } = this.props;

    setQuestionNumber(Number(questionIdx) + 1);
  }

  shade = () => {
    const { propositionCollection, propositionsVennDiagramRef } = this.state;
    const { propositions } = propositionCollection;

    propositionsVennDiagramRef.forEach((ref, idx) => {
      if (!ref.current) {
        throw new Error('Proposition venn diagrams did not render!');
      }

      ref.current.applyShading(new PropositionCollection([propositions[idx]]));
    });
  }

  validate = () => {
    const { COMBINATION_STAGE } = stages;
    const { onValidate } = this.props;
    const { propositionCollection } = this.state;

    const result = validateVennDiagram(propositionCollection, this.combinationVennDiagramRef, COMBINATION_STAGE);
    onValidate(result, 'Incorrect!');

    return result;
  }

  componentDidMount() {
    this.shade();
    const { questionIdx } = this.state;
    const { setQuestionTitle, setQuestionNumber, setInstructions } = this.props;

    setQuestionTitle("Represent multiple propositions on a Venn Diagram");
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions('You are presented with multiple two-set Venn Diagrams, each corresponding to a proposition, shade the bigger Venn Diagram in a way such that it will represent all of the propositions. ');
  }

  render() {
    function renderInteractiveVennDiagram(propositionCollection, vennDiagramRef) {
      if (propositionCollection.terms.length === 3) {
        return <ThreeSetInteractiveVennDiagram style={{ marginLeft: '50px' }} title="Combination" propositions={propositionCollection} ref={vennDiagramRef} />;
      }
      if (propositionCollection.terms.length === 4) {
        return <FourSetInteractiveVennDiagram propositions={propositionCollection} ref={vennDiagramRef} />;
      }
      throw new Error('Only 3 or 4 sets are supported!');
    }
    const {
      SOME_A_IS_B,
      SOME_A_IS_NOT_B,
    } = forms;
    const { classes } = this.props;
    const { propositionCollection, propositionsVennDiagramRef, key } = this.state;
    const { propositions } = propositionCollection;
    const filteredPropositions = propositions
      .map((proposition, idx) => {
        return { proposition, idx };
      })
      .filter(({ proposition }) => proposition.form === SOME_A_IS_NOT_B || proposition.form === SOME_A_IS_B);
    const idxMappings = {};
    filteredPropositions.forEach(({ proposition, idx }, xVal) => {
      idxMappings[idx] = xVal;
    });
    // eslint-disable-next-line no-nested-ternary
    return (
      <div key={key} className={classes.root}>
        <LevelOneVennDiagramTree
          vennDiagramList={
            propositions.map((proposition, idx) => (
              <div>
                <Typography style={{ marginLeft: '8px' }} variant="h4">
                  {
                    proposition.toSymbolicForm()
                  }
                </Typography>
                <TwoSetUninteractiveVennDiagram
                  title={proposition.toSentence()}
                  terms={proposition.terms}
                  orientation={VERTICAL}
                  ref={propositionsVennDiagramRef[idx]}
                  x={idxMappings[idx]}
                />
              </div>
            ))
          }
          order={propositionCollection.terms.length}
        />
        {
          renderInteractiveVennDiagram(propositionCollection, this.combinationVennDiagramRef)
        }
        <br />
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(CombineDiagramsQuestion));

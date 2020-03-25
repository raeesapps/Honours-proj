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
import PremiseCollection from '../../logic/premise_collection';
import withQuestionTemplate from '../Questions/QuestionTemplate';

import styles from '../../assets/components/jss/CombineDiagramsQuestion/combine_diagrams_question_styles';

const { VERTICAL } = TWO_SET_CIRCLES_ORIENTATION;

class CombineDiagramsQuestion extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { questionidx: questionIdx, content: nextPremiseCollection } = nextProps;
    const { premiseCollection } = prevState;

    if (nextPremiseCollection.hashCode() !== premiseCollection.hashCode()) {
      return {
        premiseCollection: nextPremiseCollection,
        premisesVennDiagramRef: [...Array(nextPremiseCollection.premises.length)
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
      premiseCollection: content,
      key: Math.random(),
      premisesVennDiagramRef: [...Array(content.premises.length).keys()].map(() => React.createRef()),
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
    const { premiseCollection, premisesVennDiagramRef } = this.state;
    const { premises } = premiseCollection;

    premisesVennDiagramRef.forEach((ref, idx) => {
      if (!ref.current) {
        throw new Error('Premise venn diagrams did not render!');
      }

      ref.current.applyShading(new PremiseCollection([premises[idx]]));
    });
  }

  validate = () => {
    const { COMBINATION_STAGE } = stages;
    const { onValidate } = this.props;
    const { premiseCollection } = this.state;

    const result = validateVennDiagram(premiseCollection, this.combinationVennDiagramRef, COMBINATION_STAGE);
    onValidate(result, 'Incorrect!');

    return result;
  }

  componentDidMount() {
    this.shade();
    const { questionIdx } = this.state;
    const { setQuestionTitle, setQuestionNumber, setInstructions } = this.props;

    setQuestionTitle("Represent the premises in a syllogism on a Venn Diagram");
    setQuestionNumber(Number(questionIdx) + 1);
    setInstructions('Please map the shadings on the bigger Venn Diagram to the smaller Venn Diagram. If you do not understand how to map the shadings, please read the tutorial.');
  }

  render() {
    function renderInteractiveVennDiagram(premiseCollection, vennDiagramRef) {
      if (premiseCollection.terms.length === 3) {
        return <ThreeSetInteractiveVennDiagram style={{ marginLeft: '50px' }} title="Combination" premises={premiseCollection} ref={vennDiagramRef} />;
      }
      if (premiseCollection.terms.length === 4) {
        return <FourSetInteractiveVennDiagram premises={premiseCollection} ref={vennDiagramRef} />;
      }
      throw new Error('Only 3 or 4 sets are supported!');
    }
    const { classes } = this.props;
    const { premiseCollection, premisesVennDiagramRef, key } = this.state;
    const { premises } = premiseCollection;
    // eslint-disable-next-line no-nested-ternary
    return (
      <div key={key} className={classes.root}>
        <LevelOneVennDiagramTree
          vennDiagramList={
            premises.map((premise, idx) => (
              <div>
                <Typography style={{ marginLeft: '8px' }} variant="h4">
                  {
                    premise.toSymbolicForm()
                  }
                </Typography>
                <TwoSetUninteractiveVennDiagram
                  title={premise.toSentence()}
                  terms={premise.terms}
                  orientation={VERTICAL}
                  ref={premisesVennDiagramRef[idx]}
                />
              </div>
            ))
          }
          order={premiseCollection.terms.length}
        />
        {
          renderInteractiveVennDiagram(premiseCollection, this.combinationVennDiagramRef)
        }
        <br />
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(CombineDiagramsQuestion));

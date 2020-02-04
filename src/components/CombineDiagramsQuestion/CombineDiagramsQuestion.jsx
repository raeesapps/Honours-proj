import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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
    const { content: nextPremiseCollection } = nextProps;
    const { premiseCollection } = prevState;

    if (nextPremiseCollection.hashCode() !== premiseCollection.hashCode()) {
      return {
        premiseCollection: nextPremiseCollection,
        premisesVennDiagramRef: [...Array(nextPremiseCollection.premises.length)
          .keys()].map(() => React.createRef()),
        key: Math.random(),
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    const { content } = props;

    this.state = {
      premiseCollection: content,
      key: Math.random(),
      premisesVennDiagramRef: [...Array(content.premises.length).keys()].map(() => React.createRef()),
    };
    this.combinationVennDiagramRef = React.createRef();
  }

  componentDidMount() {
    this.shade();
  }

  componentDidUpdate() {
    this.shade();
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
    function mapPremiseToSymbolicForm(premise, idx, numberOfPremises) {
      const symbolicForm = premise.toSymbolicForm();

      if (idx === numberOfPremises - 1) {
        return ` "${symbolicForm}" `;
      }
      return ` "${symbolicForm}", `;
    }
    const { classes } = this.props;
    const { premiseCollection, premisesVennDiagramRef, key } = this.state;
    const { premises } = premiseCollection;
    // eslint-disable-next-line no-nested-ternary
    const width = premiseCollection.terms.length === 3 ? '400px'
      : premiseCollection.terms.length === 4 ? '620px' : '0px';
    return (
      <div key={key} className={classes.root}>
        <Typography className={classes.instructions} variant="h5">
          Combine the Venn Diagrams of
          {
            premises.map((premise, idx) => mapPremiseToSymbolicForm(premise, idx, premises.length))
          }
          into one Venn Diagram
        </Typography>
        <Paper style={{ width }}>
          <LevelOneVennDiagramTree
            vennDiagramList={
              premises.map((premise, idx) => (
                <TwoSetUninteractiveVennDiagram
                  title={premise.toSentence()}
                  terms={premise.terms}
                  orientation={VERTICAL}
                  ref={premisesVennDiagramRef[idx]}
                />
              ))
            }
            order={premiseCollection.terms.length}
          />
          {
            renderInteractiveVennDiagram(premiseCollection, this.combinationVennDiagramRef)
          }
        </Paper>
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(CombineDiagramsQuestion));

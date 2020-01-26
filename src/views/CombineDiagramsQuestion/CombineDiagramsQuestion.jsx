import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram } from '../../logic/validator';

import Arrow from '../../components/Arrow/Arrow';
import FourSetInteractiveVennDiagram from '../../components/VennDiagram/FourSetInteractiveVennDiagram';
import ThreeSetInteractiveVennDiagram from '../../components/VennDiagram/ThreeSetInteractiveVennDiagram';
import TwoSetUninteractiveVennDiagram from '../../components/VennDiagram/TwoSetUninteractiveVennDiagram';
import { TWO_SET_CIRCLES_ORIENTATION } from '../../components/VennDiagram/venn_utils';
import PremiseCollection from '../../logic/premise_collection';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';

import styles from '../../assets/views/jss/CombineDiagramsQuestion/combine_diagrams_question_styles';

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

  renderPremiseVennDiagram = (premise, idx, numberOfPremises) => {
    const { premisesVennDiagramRef } = this.state;
    function renderArrow() {
      let x1;
      let y1;
      let x2;
      let y2;

      if (numberOfPremises === 2) {
        switch (idx) {
          case 0:
            x1 = 50;
            y1 = 0;
            x2 = 150;
            y2 = 150;
            break;
          case 1:
            x1 = 130;
            y1 = 0;
            x2 = 30;
            y2 = 150;
            break;
          default:
            break;
        }
      } else if (numberOfPremises === 3) {
        switch (idx) {
          case 0:
            x1 = 50;
            y1 = 0;
            x2 = 100;
            y2 = 150;
            break;
          case 1:
            x1 = 90;
            y1 = 0;
            x2 = 90;
            y2 = 150;
            break;
          case 2:
            x1 = 150;
            y1 = 0;
            x2 = 100;
            y2 = 150;
            break;
          default:
            break;
        }
      }

      return (
        <Arrow
          id={`arrow${idx}`}
          width={300}
          height={175}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        />
      );
    }

    const ref = premisesVennDiagramRef[idx];

    return (
      <div key={`${premise.toSentence()}VennDiagram`} style={{ marginLeft: '15px', width: '175px' }}>
        <TwoSetUninteractiveVennDiagram title={premise.toSentence()} terms={premise.terms} orientation={VERTICAL} ref={ref} />
        {
          renderArrow()
        }
      </div>
    );
  }

  render() {
    function renderInteractiveVennDiagram(argument, vennDiagramRef) {
      if (argument.terms.length === 3) {
        return <ThreeSetInteractiveVennDiagram style={{ marginLeft: '50px' }} title="Combination" premises={argument} ref={vennDiagramRef} />;
      }
      if (argument.terms.length === 4) {
        return <FourSetInteractiveVennDiagram premises={argument} ref={vennDiagramRef} />;
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
    const { premiseCollection, key } = this.state;
    const { premises } = premiseCollection;
    return (
      <div key={key} className={classes.root}>
        <Typography className={classes.instructions} variant="h5">
          Combine the Venn Diagrams of
          {
            premises.map((premise, idx) => mapPremiseToSymbolicForm(premise, idx, premises.length))
          }
          into one Venn Diagram
        </Typography>
        <Paper>
          <div style={{ display: 'flex' }}>
            {
              premises.map((premise, idx) => this.renderPremiseVennDiagram(premise, idx, premises.length))
            }
          </div>
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

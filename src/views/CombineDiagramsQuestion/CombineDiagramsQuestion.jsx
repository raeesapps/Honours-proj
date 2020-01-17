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
import PremiseCollection from '../../logic/premise_collection';
import withQuestionTemplate from '../../components/Questions/QuestionTemplate';

import styles from '../../assets/views/jss/CombineDiagramsQuestion/combine_diagrams_question_styles';

class CombineDiagramsQuestion extends React.Component {
  constructor(props) {
    super(props);

    const { location } = props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;

    this.premiseCollection = content;
    this.premiseVennDiagramRef = [...Array(content.premises.length).keys()].map(() => React.createRef());
    this.combinationVennDiagramRef = React.createRef();
  }

  componentDidMount() {
    const { premises } = this.premiseCollection;

    this.premiseVennDiagramRef.forEach((ref, idx) => {
      if (!ref.current) {
        throw new Error('Premise venn diagrams did not render!');
      }

      ref.current.applyShading(new PremiseCollection([premises[idx]]));
    });
  }

  validate = () => {
    const { COMBINATION_STAGE } = stages;
    const { onValidate } = this.props;

    const result = validateVennDiagram(this.premiseCollection, this.combinationVennDiagramRef, COMBINATION_STAGE);
    onValidate(result, 'Incorrect!');

    return result;
  }

  renderPremiseVennDiagram = (premise, idx, numberOfPremises) => {
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
            x2 = 250;
            y2 = 250;
            break;
          case 1:
            x1 = 250;
            y1 = 0;
            x2 = 70;
            y2 = 250;
            break;
          default:
            break;
        }
      } else if (numberOfPremises === 3) {
        switch (idx) {
          case 0:
            x1 = 50;
            y1 = 0;
            x2 = 200;
            y2 = 250;
            break;
          case 1:
            x1 = 150;
            y1 = 0;
            x2 = 150;
            y2 = 250;
            break;
          case 2:
            x1 = 250;
            y1 = 0;
            x2 = 100;
            y2 = 250;
            break;
          default:
            break;
        }
      }

      return (
        <Arrow
          id={`arrow${idx}`}
          width={300}
          height={300}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        />
      );
    }

    const ref = this.premiseVennDiagramRef[idx];

    return (
      <div key={`${premise.toSentence()}VennDiagram`}>
        <TwoSetUninteractiveVennDiagram style={{ marginRight: '2vw' }} title={premise.toSentence()} terms={premise.terms} ref={ref} />
        {
          renderArrow()
        }
      </div>
    );
  }

  render() {
    function renderInteractiveVennDiagram(argument, vennDiagramRef) {
      if (argument.terms.length === 3) {
        return <ThreeSetInteractiveVennDiagram className={classes.threeSetInteractiveVennDiagram} title="Combination" premises={argument} ref={vennDiagramRef} />;
      }
      if (argument.terms.length === 4) {
        return <FourSetInteractiveVennDiagram className={classes.fourSetInteractiveVennDiagram} premises={argument} ref={vennDiagramRef} />;
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
    const { premises } = this.premiseCollection;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
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
            renderInteractiveVennDiagram(this.premiseCollection, this.combinationVennDiagramRef)
          }
        </Paper>
        <Button variant="contained" color="primary" onClick={this.validate}>Validate</Button>
      </div>
    );
  }
}

export default withStyles(styles)(withQuestionTemplate(CombineDiagramsQuestion));

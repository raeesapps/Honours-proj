import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram } from '../../logic/validator';

import Arrow from '../../components/Arrow/Arrow';
import SnackbarWrapper from '../../components/Snackbar/SnackbarWrapper';
import snackbarTypes from '../../components/Snackbar/snackbar_types';
import FourSetInteractiveVennDiagram from '../../components/VennDiagram/FourSetInteractiveVennDiagram';
import ThreeSetInteractiveVennDiagram from '../../components/VennDiagram/ThreeSetInteractiveVennDiagram';
import TwoSetUninteractiveVennDiagram from '../../components/VennDiagram/TwoSetUninteractiveVennDiagram';
import withSidebar from '../../components/Questions/SidebarHOC';

import styles from '../../assets/views/jss/CombinePremisesQuestion/combine_premises_question_styles';
import PremiseCollection from '../../logic/premise_collection';

const { ERROR } = snackbarTypes;

class CombinePremisesQuestion extends React.Component {
  constructor(props) {
    super(props);

    const { location } = props;
    const { question } = location;

    if (!question) {
      throw new Error('Question not provided! You must not use the refresh button on this app.');
    }

    const { content } = question;

    this.state = {
      showError: false,
    };
    this.premiseCollection = content;
    this.premiseVennDiagramRef = [...Array(content.premises.length).keys()].map(() => React.createRef());
    this.combinationVennDiagramRef = React.createRef();
    this.renderPremiseVennDiagram = this.renderPremiseVennDiagram.bind(this);
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

  validate() {
    const { COMBINATION_STAGE } = stages;

    const result = validateVennDiagram(this.premiseCollection, this.vennDiagramRef, COMBINATION_STAGE);
    this.setState({ showError: !result });

    return result;
  }

  renderPremiseVennDiagram(premise, idx, numberOfPremises) {
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
      <div>
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
    const { premises } = this.premiseCollection;
    const { classes } = this.props;
    const { showError } = this.state;
    const snackbarWrapperDisplayVal = !showError ? 'none' : '';
    return (
      <div className={classes.root}>
        <Container>
          <SnackbarWrapper
            style={{ display: snackbarWrapperDisplayVal, marginBottom: '10px' }}
            variant={ERROR}
            message="Incorrect!"
            onClose={() => {
              this.setState({ showError: false });
            }}
          />
          <Typography className={classes.instructions} variant="h6">
            Please combine the Venn Diagrams from the previous step into one Venn Diagram:
          </Typography>
          <div style={{ display: 'flex' }}>
            {
              premises.map((premise, idx) => this.renderPremiseVennDiagram(premise, idx, premises.length))
            }
          </div>
          {
            renderInteractiveVennDiagram(this.premiseCollection, this.combinationVennDiagramRef)
          }
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(withSidebar(CombinePremisesQuestion));

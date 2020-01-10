import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { stages, validateVennDiagram } from '../../logic/validator';

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

  renderPremiseVennDiagram(premise, idx) {
    const ref = this.premiseVennDiagramRef[idx];

    return (
      <Grid item xs={6}>
        <TwoSetUninteractiveVennDiagram title={premise.toSentence()} terms={premise.terms} ref={ref} />
      </Grid>
    );
  }

  render() {
    function renderInteractiveVennDiagram(argument, vennDiagramRef) {

      if (argument.terms.length === 3) {
        return (
          <Grid item xs={12}>
            <center>
              <ThreeSetInteractiveVennDiagram title="Combination" premises={argument} ref={vennDiagramRef} />
            </center>
          </Grid>
        );
      }
      if (argument.terms.length === 4) {
        return (
          <Grid item xs={9}>
            <FourSetInteractiveVennDiagram premises={argument} ref={vennDiagramRef} />
          </Grid>
        );
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
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12}>
              <Paper>
                <Grid container spacing={2}>
                  {
                    premises.map(this.renderPremiseVennDiagram)
                  }
                </Grid>
              </Paper>
            </Grid>
            {
              renderInteractiveVennDiagram(this.premiseCollection, this.combinationVennDiagramRef)
            }
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(withSidebar(CombinePremisesQuestion));

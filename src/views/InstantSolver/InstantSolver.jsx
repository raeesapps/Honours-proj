/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DialogContentText from '@material-ui/core/DialogContentText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ArgumentForm from '../../components/ArgumentForm/ArgumentForm';
import SimpleDialog from '../../components/Dialog/SimpleDialog';
import SnackbarWrapper from '../../components/Snackbar/SnackbarWrapper';
import TwoSetUninteractiveVennDiagram from '../../components/VennDiagram/TwoSetUninteractiveVennDiagram';
import ThreeSetUninteractiveVennDiagram from '../../components/VennDiagram/ThreeSetUninteractiveVennDiagram';
import FourSetUninteractiveVennDiagram from '../../components/VennDiagram/FourSetUninteractiveVennDiagram';
import { TWO_SET_CIRCLES_ORIENTATION } from '../../components/VennDiagram/venn_utils';
import LevelOneVennDiagramTree from '../../components/VennDiagramTree/LevelOneVennDiagramTree';
import LevelTwoVennDiagramTree from '../../components/VennDiagramTree/LevelTwoVennDiagramTree';
import { forms } from '../../logic/proposition';
import PropositionCollection from '../../logic/proposition_collection';
import snackbarTypes from '../../components/Snackbar/snackbar_types';
import styles from '../../assets/views/jss/InstantSolver/instant_solver_styles';

const { VERTICAL } = TWO_SET_CIRCLES_ORIENTATION;
const { SUCCESS, ERROR } = snackbarTypes;

function getTermSets(propositionObjs) {
  const termSet = new Set();
  propositionObjs.forEach((propositionObj) => {
    const { firstTerm, secondTerm } = propositionObj.terms;

    termSet.add(firstTerm);
    termSet.add(secondTerm);
  });
  return termSet;
}

class InstantSolver extends React.Component {
  constructor() {
    super();

    this.state = {
      snackbarVisible: false,
      snackbarType: ERROR,
      snackbarMsg: '',
      dialogOpen: false,
      argumentSubmitted: false,
      needsUpdate: false,
      key: Math.random(),
    };

    this.argumentFormRef = React.createRef();
    this.propositionVennDiagramRefs = [...Array(4).keys()].map(() => React.createRef());
    this.combinedPropositionsVennDiagramRef = React.createRef();
    this.mappedVennDiagramRef = React.createRef();
  }

  componentDidUpdate() {
    const {
      SOME_A_IS_B,
      SOME_A_IS_NOT_B,
    } = forms;

    const { needsUpdate } = this.state;
    const { mappings } = this.generateMappings();
    const useMappings = this.shouldAllTermsBeMappedToLetters();

    const order = this.getOrder(true);

    if (needsUpdate && mappings) {
      const argumentForm = this.argumentFormRef.current;
      const { propositions } = argumentForm.state;

      const idxMappings = {}
      const filteredPropositions = propositions
        .map((proposition, idx) => {
          return { proposition: proposition.ref.current.getPropositionObj(), idx };
        })
        .filter(({ proposition }) => proposition.form === SOME_A_IS_NOT_B || proposition.form === SOME_A_IS_B);
      filteredPropositions.forEach(({ proposition, idx }, xVal) => {
        idxMappings[idx] = xVal;
      });

      const propositionVennDiagrams = this.propositionVennDiagramRefs.filter((ref) => !!ref.current);
      const propositionCollections = propositions
        .map((proposition) => new PropositionCollection([proposition.ref.current.getPropositionObj()]));

      propositionVennDiagrams.forEach((ref, idx) => {
        const propositionCollection = propositionCollections[idx];

        if (order >= 3 && order <= 4) {
          ref.current.applyShading(propositionCollection, useMappings ? mappings : undefined, undefined, idxMappings[idx]);
        }
      });

      const combinedPropositionsVennDiagram = this.combinedPropositionsVennDiagramRef.current;
      const allPropositionsExcludingConclusion = new PropositionCollection(propositions
        .filter((proposition) => proposition.name !== 'Conclusion')
        .map((proposition) => proposition.ref.current.getPropositionObj()));

      if (order >= 3 && order <= 4) {
        combinedPropositionsVennDiagram.applyShading(allPropositionsExcludingConclusion, useMappings ? mappings : undefined);
      }

      const mappedVennDiagram = this.mappedVennDiagramRef.current;
      const conclusion = propositions
        .find((proposition) => proposition.name === 'Conclusion')
        .ref.current.getPropositionObj();
      const conclusionPropositionCollection = new PropositionCollection([conclusion]);

      if (order >= 3 && order <= 4) {
        mappedVennDiagram.applyShading(
          allPropositionsExcludingConclusion,
          useMappings ? mappings : undefined,
          conclusionPropositionCollection.terms,
        );
      }

      const { reason, result } = allPropositionsExcludingConclusion.argue2(conclusion);

      if (result) {
        this.setState({
          argumentSubmitted: true,
          snackbarVisible: true,
          snackbarType: SUCCESS,
          snackbarMsg: 'Valid!',
          needsUpdate: false,
        });
      } else {
        this.setState({
          argumentSubmitted: true,
          snackbarVisible: true,
          snackbarType: ERROR,
          snackbarMsg: `Invalid! Reason: ${reason}`,
          needsUpdate: false,
        });
      }
    }
  }

  onSubmitForm = () => {
    if (this.getOrder(true) === this.getOrder(false)) {
      this.setState({
        argumentSubmitted: true,
        needsUpdate: true,
        key: Math.random(),
      });
    } else {
      this.onError("Please check your propositions and conclusion. The conclusion should not introduce a new predicate or subject. The number of predicates and subjects in the propositions should be equal to the number of propositions.");
    }
  }

  onError = (msg) => {
    this.setState({ snackbarVisible: true, snackbarType: ERROR, snackbarMsg: msg });
  }

  getOrder = (excludeConclusion) => {
    const argumentForm = this.argumentFormRef.current;
    if (argumentForm) {
      const { propositions } = argumentForm.state;
      const propositionObjs = propositions
        .map((proposition) => {
          const currentRef = proposition.ref.current;

          return currentRef ? currentRef.getPropositionObj() : null;
        })
        .filter((propositionObj) => !!propositionObj);

      if (excludeConclusion) {
        propositionObjs.pop();
      }

      const termSet = getTermSets(propositionObjs);

      if (excludeConclusion && propositionObjs.length === termSet.size - 1) {
        return termSet.size;
      } else if (!excludeConclusion) {
        return termSet.size;
      }
    }
    return -1;
  }

  warningAddProposition = () => {
    const argumentForm = this.argumentFormRef.current;
    argumentForm.addProposition();
    this.setState({ dialogOpen: false });
  }

  warn = () => {
    this.setState({ dialogOpen: true });
  }

  shouldAllTermsBeMappedToLetters = () => {
    const argumentForm = this.argumentFormRef.current;

    if (argumentForm) {
      const { propositions } = argumentForm.state;
      const propositionObjs = propositions.map((proposition) => proposition.ref.current.getPropositionObj());

      const termSet = getTermSets(propositionObjs);

      const reducer = [...termSet]
        .reduce((numberOfSingleDigitTerms, term) => {
          if (term.length === 1) {
            return numberOfSingleDigitTerms - 1;
          }

          return numberOfSingleDigitTerms;
        }, termSet.size);

      return reducer !== 0;
    }

    return false;
  }

  generateMappings = () => {
    const argumentForm = this.argumentFormRef.current;

    if (argumentForm) {
      const { propositions } = argumentForm.state;
      const propositionObjs = propositions.map((proposition) => proposition.ref.current.getPropositionObj());

      const termSet = getTermSets(propositionObjs);
      const letters = [...Array(25).keys()].map((i) => String.fromCharCode(65 + i));
      const mappings = {};
      [...termSet].forEach((term, idx) => {
        const letter = letters[idx];
        mappings[term] = letter;
      });

      return {
        mappings,
        propositionObjs,
      };
    }

    return null;
  }

  renderSymbolicForms = () => {
    function getSymbolicForm(proposition, mappings) {
      const {
        firstTerm,
        secondTerm,
      } = proposition.terms;

      const firstSymbol = mappings[firstTerm];
      const secondSymbol = mappings[secondTerm];

      return proposition.toSymbolicForm(firstSymbol, secondSymbol);
    }
    const { mappings, propositionObjs } = this.generateMappings();

    if (mappings) {
      const useMappings = this.shouldAllTermsBeMappedToLetters();

      return propositionObjs.map((proposition, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={`symbolicFormOf${proposition.toSentence()}${idx}`} item xs={6}>
          <Typography variant="h6">{proposition.toSentence()}</Typography>
          <Typography variant="subtitle1">{getSymbolicForm(proposition, useMappings ? mappings : {})}</Typography>
        </Grid>
      ));
    }
    throw new Error('Unable to render symbolic forms!');
  }

  render() {
    const {
      snackbarVisible,
      snackbarMsg,
      snackbarType,
      dialogOpen,
      argumentSubmitted,
      key,
    } = this.state;
    const order = this.getOrder(true);
    const marginLeftLevelTwoTree = order === 3 ? '50px' : '0px';
    const snackbarWrapperDisplayVal = !snackbarVisible ? 'none' : '';
    return (
      <Container>
        <SimpleDialog
          open={dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
          title="Are you sure?"
          content={
            <DialogContentText id="alert-dialog-description">
              You are trying to construct a syllogism with more than three propositions.
              Are you sure you want to add another proposition?
            </DialogContentText>
          }
          actions={
            <div>
              <Button onClick={this.warningAddProposition} color="primary">
                Yes
              </Button>
              <Button onClick={() => this.setState({ dialogOpen: false })} color="primary" autoFocus>
                No
              </Button>
            </div>
          }
        />
        <SnackbarWrapper
          style={{ display: snackbarWrapperDisplayVal, marginBottom: '50px' }}
          onClose={() => this.setState({ snackbarVisible: false })}
          variant={snackbarType}
          message={snackbarMsg}
        />
        <ArgumentForm onSubmit={this.onSubmitForm} onError={this.onError} ref={this.argumentFormRef} warn={this.warn} />
        {argumentSubmitted
          && (
            <Grid key={key} container spacing={2}>
              {
                order >= 3 && order <= 4
                && (
                  <Grid item xs={7}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="propositionsAriaControls"
                        id="propositionsExpansionPanel"
                      >
                        <Typography>Venn Diagram tree</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div>
                          <LevelOneVennDiagramTree
                            order={order}
                            vennDiagramList={
                              this.propositionVennDiagramRefs.map((ref, idx) => (
                                <TwoSetUninteractiveVennDiagram ref={ref} orientation={VERTICAL} title={`Proposition${idx}`} />
                              ))
                            }
                          />
                          <LevelTwoVennDiagramTree
                            style={{ marginLeft: marginLeftLevelTwoTree }}
                            order={order}
                            combinedVennDiagram={
                              order === 3
                                ? <ThreeSetUninteractiveVennDiagram ref={this.combinedPropositionsVennDiagramRef} title="Propositions" />
                                : order === 4
                                  ? <FourSetUninteractiveVennDiagram ref={this.combinedPropositionsVennDiagramRef} />
                                  : <div />
                            }
                            conclusionOrReducedVennDiagram={
                              (
                                <TwoSetUninteractiveVennDiagram
                                  style={{ marginLeft: order === 4 ? '210px' : '60px' }}
                                  orientation={VERTICAL}
                                  ref={this.mappedVennDiagramRef}
                                  title="Mapped"
                                />
                              )
                            }
                          />
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                )
              }
              <Grid item xs={order >= 3 && order <= 4 ? 5 : 12}>
                {
                  order <= 26
                  && (
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="symbolicFormAriaControls"
                        id="symbolicFormExpansionPanel"
                      >
                        <Typography>Premises and conclusion in standard form</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container>
                          {this.renderSymbolicForms()}
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                }
              </Grid>
            </Grid>
          )}
      </Container>
    );
  }
}

export default withStyles(styles)(InstantSolver);

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
import PremiseCollection from '../../logic/premise_collection';
import snackbarTypes from '../../components/Snackbar/snackbar_types';
import styles from '../../assets/views/jss/InstantSolver/instant_solver_styles';

const { VERTICAL } = TWO_SET_CIRCLES_ORIENTATION;
const { SUCCESS, ERROR } = snackbarTypes;

function getTermSets(premiseObjs) {
  const termSet = new Set();
  premiseObjs.forEach((premiseObj) => {
    const { firstTerm, secondTerm } = premiseObj.terms;

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
      turnstileSymbol: '⊯',
      key: Math.random(),
    };

    this.argumentFormRef = React.createRef();
    this.premiseVennDiagramRefs = [...Array(4).keys()].map(() => React.createRef());
    this.combinedPremisesVennDiagramRef = React.createRef();
    this.conclusionVennDiagramRef = React.createRef();
    this.mappedVennDiagramRef = React.createRef();
  }

  componentDidUpdate() {
    const { needsUpdate } = this.state;
    const { mappings } = this.generateMappings();
    const useMappings = this.shouldAllTermsBeMappedToLetters();

    const order = this.getOrder(true);

    if (needsUpdate && mappings) {
      const argumentForm = this.argumentFormRef.current;
      const { premises } = argumentForm.state;

      const premiseVennDiagrams = this.premiseVennDiagramRefs.filter((ref) => !!ref.current);
      const premiseCollections = premises
        .map((premise) => new PremiseCollection([premise.ref.current.getPremiseObj()]));

      premiseVennDiagrams.forEach((ref, idx) => {
        const premiseCollection = premiseCollections[idx];

        if (order >= 3 && order <= 4) {
          ref.current.applyShading(premiseCollection, useMappings ? mappings : undefined);
        }
      });

      const combinedPremisesVennDiagram = this.combinedPremisesVennDiagramRef.current;
      const allPremisesExcludingConclusion = new PremiseCollection(premises
        .filter((premise) => premise.name !== 'Conclusion')
        .map((premise) => premise.ref.current.getPremiseObj()));

      if (order >= 3 && order <= 4) {
        combinedPremisesVennDiagram.applyShading(allPremisesExcludingConclusion, useMappings ? mappings : undefined);
      }

      const conclusionVennDiagram = this.conclusionVennDiagramRef.current;
      const mappedVennDiagram = this.mappedVennDiagramRef.current;
      const conclusion = premises
        .find((premise) => premise.name === 'Conclusion')
        .ref.current.getPremiseObj();
      const conclusionPremiseCollection = new PremiseCollection([conclusion]);

      if (order >= 3 && order <= 4) {
        conclusionVennDiagram.applyShading(conclusionPremiseCollection, useMappings ? mappings : undefined);
        mappedVennDiagram.applyShading(
          allPremisesExcludingConclusion,
          useMappings ? mappings : undefined,
          conclusionPremiseCollection.terms,
        );
      }

      const valid = allPremisesExcludingConclusion.argue(conclusion);

      if (valid) {
        this.setState({
          argumentSubmitted: true,
          snackbarVisible: true,
          snackbarType: SUCCESS,
          snackbarMsg: 'Valid!',
          needsUpdate: false,
          turnstileSymbol: '⊫',
        });
      } else {
        this.setState({
          argumentSubmitted: true,
          snackbarVisible: true,
          snackbarType: ERROR,
          snackbarMsg: 'Invalid!',
          needsUpdate: false,
          turnstileSymbol: '⊯',
        });
      }
    }
  }

  onSubmitForm = () => {
    this.setState({
      argumentSubmitted: true,
      needsUpdate: true,
      key: Math.random(),
    });
  }

  onError = (msg) => {
    this.setState({ snackbarVisible: true, snackbarType: ERROR, snackbarMsg: msg });
  }

  getOrder = (excludeConclusion) => {
    const argumentForm = this.argumentFormRef.current;
    if (argumentForm) {
      const { premises } = argumentForm.state;
      const premiseObjs = premises
        .map((premise) => {
          const currentRef = premise.ref.current;

          return currentRef ? currentRef.getPremiseObj() : null;
        })
        .filter((premiseObj) => !!premiseObj);

      if (excludeConclusion) {
        premiseObjs.pop();
      }

      const termSet = getTermSets(premiseObjs);

      if (premiseObjs.length === termSet.size - 1) {
        return termSet.size;
      }
    }
    return -1;
  }

  warningAddPremise = () => {
    const argumentForm = this.argumentFormRef.current;
    argumentForm.addPremise();
    this.setState({ dialogOpen: false });
  }

  warn = () => {
    this.setState({ dialogOpen: true });
  }

  shouldAllTermsBeMappedToLetters = () => {
    const argumentForm = this.argumentFormRef.current;

    if (argumentForm) {
      const { premises } = argumentForm.state;
      const premiseObjs = premises.map((premise) => premise.ref.current.getPremiseObj());

      const termSet = getTermSets(premiseObjs);

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
      const { premises } = argumentForm.state;
      const premiseObjs = premises.map((premise) => premise.ref.current.getPremiseObj());

      const termSet = getTermSets(premiseObjs);
      const letters = [...Array(25).keys()].map((i) => String.fromCharCode(65 + i));
      const mappings = {};
      [...termSet].forEach((term, idx) => {
        const letter = letters[idx];
        mappings[term] = letter;
      });

      return {
        mappings,
        premiseObjs,
      };
    }

    return null;
  }

  renderSymbolicForms = () => {
    function getSymbolicForm(premise, mappings) {
      const {
        firstTerm,
        secondTerm,
      } = premise.terms;

      const firstSymbol = mappings[firstTerm];
      const secondSymbol = mappings[secondTerm];

      return premise.toSymbolicForm(firstSymbol, secondSymbol);
    }
    const { mappings, premiseObjs } = this.generateMappings();

    if (mappings) {
      const useMappings = this.shouldAllTermsBeMappedToLetters();

      return premiseObjs.map((premise, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={`symbolicFormOf${premise.toSentence()}${idx}`} item xs={6}>
          <Typography variant="h6">{premise.toSentence()}</Typography>
          <Typography variant="subtitle1">{getSymbolicForm(premise, useMappings ? mappings : {})}</Typography>
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
      turnstileSymbol,
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
              You are trying to add more than 4 premises.
              Thats some really complicated stuff to reason about.
              Are you sure you want to add another premise?
            </DialogContentText>
          }
          actions={
            <div>
              <Button onClick={this.warningAddPremise} color="primary">
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
              <Grid item xs={7}>
                {
                  order >= 3 && order <= 4
                  && (
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="premisesAriaControls"
                        id="premisesExpansionPanel"
                      >
                        <Typography>Venn Diagram Tree</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div>
                          <LevelOneVennDiagramTree
                            order={order}
                            vennDiagramList={
                              this.premiseVennDiagramRefs.map((ref, idx) => (
                                <TwoSetUninteractiveVennDiagram ref={ref} orientation={VERTICAL} title={`Premise${idx}`} />
                              ))
                            }
                          />
                          <LevelTwoVennDiagramTree
                            style={{ marginLeft: marginLeftLevelTwoTree }}
                            order={order}
                            combinedVennDiagram={
                              order === 3
                                ? <ThreeSetUninteractiveVennDiagram ref={this.combinedPremisesVennDiagramRef} title="Premises" />
                                : order === 4
                                  ? <FourSetUninteractiveVennDiagram ref={this.combinedPremisesVennDiagramRef} />
                                  : <div />
                            }
                            conclusionOrReducedVennDiagram={
                              (
                                <div style={{ display: 'flex' }}>
                                  <TwoSetUninteractiveVennDiagram
                                    style={{ width: '175px' }}
                                    orientation={VERTICAL}
                                    ref={this.mappedVennDiagramRef}
                                    title="Mapped"
                                  />
                                  <Typography style={{ marginTop: '100px' }} variant="h1">
                                    {turnstileSymbol}
                                  </Typography>
                                  <TwoSetUninteractiveVennDiagram
                                    style={{ width: '175px' }}
                                    orientation={VERTICAL}
                                    ref={this.conclusionVennDiagramRef}
                                    title="Conclusion"
                                  />
                                </div>
                              )
                            }
                          />
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                }
              </Grid>
              <Grid item xs={5}>
                {
                  order <= 26
                  && (
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="symbolicFormAriaControls"
                        id="symbolicFormExpansionPanel"
                      >
                        <Typography>Symbolic Form Representations</Typography>
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

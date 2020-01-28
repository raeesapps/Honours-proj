/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import ArgumentForm from './Components/ArgumentForm';
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

const { HORIZONTAL, VERTICAL } = TWO_SET_CIRCLES_ORIENTATION;
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
      key: Math.random(),
    };

    this.argumentFormRef = React.createRef();
    this.premiseVennDiagramRefs = [...Array(4).keys()].map(() => React.createRef());
    this.combinedPremisesVennDiagramRef = React.createRef();
    this.conclusionVennDiagramRef = React.createRef();
  }

  componentDidUpdate() {
    const { needsUpdate } = this.state;
    const { mappings } = this.generateMappings();

    if (needsUpdate && mappings) {
      const argumentForm = this.argumentFormRef.current;
      const { premises } = argumentForm.state;

      const premiseVennDiagrams = this.premiseVennDiagramRefs.filter((ref) => !!ref.current);
      const premiseCollections = premises
        .map((premise) => new PremiseCollection([premise.ref.current.getPremiseObj()]));

      premiseVennDiagrams.forEach((ref, idx) => {
        const premiseCollection = premiseCollections[idx];
        ref.current.applyShading(premiseCollection, mappings);
      });

      const combinedPremisesVennDiagram = this.combinedPremisesVennDiagramRef.current;
      const allPremisesExcludingConclusion = new PremiseCollection(premises
        .filter((premise) => premise.name !== 'Conclusion')
        .map((premise) => premise.ref.current.getPremiseObj()));

      if (this.getOrder() <= 4 && combinedPremisesVennDiagram) {
        combinedPremisesVennDiagram.applyShading(new PremiseCollection(premises
          .filter((premise) => premise.name !== 'Conclusion')
          .map((premise) => premise.ref.current.getPremiseObj())), mappings);
      }

      const conclusionVennDiagram = this.conclusionVennDiagramRef.current;
      const conclusion = premises
        .find((premise) => premise.name === 'Conclusion')
        .ref.current.getPremiseObj();

      if (conclusionVennDiagram) {
        conclusionVennDiagram.applyShading(new PremiseCollection(premises
          .filter((premise) => premise.name === 'Conclusion')
          .map((premise) => premise.ref.current.getPremiseObj())), mappings);
      }

      const valid = allPremisesExcludingConclusion.argue(conclusion);

      if (valid) {
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
          snackbarMsg: 'Invalid!',
          needsUpdate: false,
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
      const premiseObjs = premises.map((premise) => premise.ref.current.getPremiseObj());

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
      return premiseObjs.map((premise, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={`symbolicFormOf${premise.toSentence()}${idx}`} item xs={6}>
          <Typography variant="h6">{premise.toSentence()}</Typography>
          <Typography variant="subtitle1">{getSymbolicForm(premise, mappings)}</Typography>
        </Grid>
      ));
    }
    throw new Error('Unable to render symbolic forms!');
  }

  render() {
    const { classes } = this.props;
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
    const marginLeftConclusionVennDiagram = order === 4 ? '150px' : '0px';
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Dialog
            open={dialogOpen}
            onClose={() => this.setState({ dialogOpen: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You are trying to add more than 4 premises.
                Thats some really complicated stuff to reason about.
                Are you sure you want to add another premise?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.warningAddPremise} color="primary">
                Yes
              </Button>
              <Button onClick={() => this.setState({ dialogOpen: false })} color="primary" autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackbarVisible}
            onClose={() => this.setState({ snackbarVisible: false })}
          >
            <SnackbarWrapper
              onClose={() => this.setState({ snackbarVisible: false })}
              variant={snackbarType}
              message={snackbarMsg}
            />
          </Snackbar>
          <ArgumentForm onSubmit={this.onSubmitForm} onError={this.onError} ref={this.argumentFormRef} warn={this.warn} />
          {argumentSubmitted
            && (
              <Grid key={key} container spacing={2}>
                <Grid item xs={7}>
                  {
                    order >= 3 && order <= 4
                    && (
                      <ExpansionPanel className={classes.spacedExpansionPanel}>
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
                                  <TwoSetUninteractiveVennDiagram
                                    style={{ marginLeft: marginLeftConclusionVennDiagram }}
                                    orientation={HORIZONTAL}
                                    ref={this.conclusionVennDiagramRef}
                                    title="Conclusion"
                                  />
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
      </div>
    );
  }
}

export default withStyles(styles)(InstantSolver);

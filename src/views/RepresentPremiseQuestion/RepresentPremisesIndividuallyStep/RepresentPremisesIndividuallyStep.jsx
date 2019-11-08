import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Premise, forms } from '../../../logic/premise';
import validate from '../premise_validator';
import InteractiveVennDiagram from '../../../components/VennDiagram/InteractiveVennDiagram';

import styles from '../../../assets/views/jss/RepresentPremises/RepresemtPremisesIndividuallyStep/represent_premises_individually_step_styles';

class RepresentPremisesIndividuallyStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      premises: [],
      refs: [],
    };

    this.validate = this.validate.bind(this);
    this.toSentenceAndVennDiagram = this.toSentenceAndVennDiagram.bind(this);
  }

  componentDidMount() {
    const { ALL_A_IS_B } = forms;
    const refs = [React.createRef(), React.createRef()];
    let { premises } = this.props;

    premises = premises || [new Premise(ALL_A_IS_B, {
      firstTerm: 'Men',
      secondTerm: 'Mortal',
    }), new Premise(ALL_A_IS_B, {
      firstTerm: 'Greeks',
      secondTerm: 'Men',
    })];

    this.setState({ premises, refs });
  }

  dumpState() {
    const { refs } = this.state;

    const vennDiagramShadings = refs.map((ref) => ref.current.getShadings());

    return {
      vennDiagramShadings,
    };
  }

  validate() {
    return validate(this.state);
  }

  toSentenceAndVennDiagram(premise, idx) {
    const { dump } = this.props;
    const { refs } = this.state;

    const { vennDiagramShadings } = dump || { vennDiagramShadings: [] };
    const title = `venn${idx.toString()}`;

    return (
      <Grid item xs={5}>
        <Typography variant="subtitle2">
          {
            premise.toSentence()
          }
        </Typography>
        <InteractiveVennDiagram title={title} premise={premise} ref={refs[idx]} shadings={vennDiagramShadings[idx]} />
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const { premises } = this.state;
    return (
      <div className={classes.root}>
        <Container>
          <Typography className={classes.instructions} variant="h6">
            Please shade in the diagrams to represent the premises:
          </Typography>
          <Grid container>
            {
              premises.map(this.toSentenceAndVennDiagram)
            }
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(RepresentPremisesIndividuallyStep);

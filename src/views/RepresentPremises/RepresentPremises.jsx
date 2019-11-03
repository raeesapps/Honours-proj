import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Premise, forms } from '../../logic/premise';

import UninteractiveVennDiagram from '../../components/VennDiagram/InteractiveVennDiagram';

import styles from '../../assets/views/jss/RepresentPremises/represent_premises_styles';

class RepresentPremises extends React.Component {
  static toSentenceAndVennDiagram(premise, idx) {
    const title = `venn${idx.toString()}`;
    return (
      <Grid item xs={5}>
        <Typography variant="body1">
          {
            premise.toSentence()
          }
        </Typography>
        <UninteractiveVennDiagram title={title} premise={premise} />
      </Grid>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      premises: [],
    };
  }

  componentDidMount() {
    const { ALL_A_IS_B } = forms;
    let { premises } = this.props;
    premises = premises || [new Premise(ALL_A_IS_B, {
      firstTerm: 'Men',
      secondTerm: 'Mortal',
    }), new Premise(ALL_A_IS_B, {
      firstTerm: 'Greeks',
      secondTerm: 'Men',
    })];

    this.setState({ premises });
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
              premises.map(RepresentPremises.toSentenceAndVennDiagram)
            }
            <Grid item xs={2}>
              LOL
            </Grid>
          </Grid>
          <Button variant="contained" color="primary">Next</Button>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(RepresentPremises);

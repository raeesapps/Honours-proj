import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from '../../assets/views/jss/Home/home_styles';

function Home(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Container>
        <Paper className={classes.paper}>
          <Typography style={{ marginBottom: '10px' }} variant="h3">
            Welcome to Soak Up Syllogisms
          </Typography>
          <Typography variant="subtitle1">
            A fun game where you learn how to become an undefeated grandmaster of logical reasoning.
          </Typography>
        </Paper>
        <br />
        <Paper className={classes.paper}>
          <Typography variant="h5">
            What are Syllogisms?
          </Typography>
          <Typography variant="body2">
            Syllogisms are logical arguments that arrive at a conclusion based on two or more propositions.
            Syllogisms with more than two propositions are known as polysyllogisms.
          </Typography>
        </Paper>
        <br />
        <Paper className={classes.paper}>
          <Typography variant="h5">
            How does Soak Up Syllogisms help you learn syllogisms?
          </Typography>
          <br />
          <Typography variant="body2">
            Soak Up Syllogisms is a tool to help you get familiar with Aristotelian syllogisms
            and polysyllogisms. Five different types of exercises are available to help you understand
            the concepts more clearly. You can see the exercises by clicking 'Questions' in the Navbar;
            you can practice them or if you are feeling confident, you can go to the quiz section to test yourself.
          </Typography>
          <br />
          <Typography variant="body2">
            If syllogisms are completely new to you then you should read the tutorial before proceeding
            onto the exercises. In the tutorial you will find explanations on the anatomy of a syllogism
            and how to represent and manipulate them using venn diagrams. Elliptic venn diagrams are required
            to solve problems involving polysyllogisms; an explanation of elliptic venn diagrams is also provided.
          </Typography>
          <br />
          <Typography variant="body2">
            The web app also provides the instant solver where you can check your answers to the exercises
            or an exam question. Please try to solve questions before using the Instant Solver!
            o understand concepts you must spend time reasoning to derive the correct answer rather than
            merely using the instant solver.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default withStyles(styles)(Home);

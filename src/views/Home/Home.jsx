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
          <Typography style={{ marginBottom: '10px' }} variant="h2">
            Welcome to Soak Up Syllogisms
          </Typography>
          <Typography variant="h5">
            An educational tool that helps you wrap your mind around representing, manipulating and arguing about syllogisms.
          </Typography>
        </Paper>
        <br />
        <Paper className={classes.paper}>
          <Typography variant="h3">
            What are Syllogisms?
          </Typography>
          <Typography variant="h5">
            Syllogisms are logical arguments that arrive at a conclusion based on two or more propositions.
            <br />
            "All People are Mortal"; "All Greeks are People" => "All Greeks are Mortal" is an example of a syllogism.
          </Typography>
        </Paper>
        <br />
        <Paper className={classes.paper}>
          <Typography variant="h3">
            How does Soak Up Syllogisms help you learn syllogisms?
          </Typography>
          <br />
          <Typography variant="h5">
            Five different types of exercises are available to help you understand
            the concepts more clearly. You can see the exercises by clicking 'Practice' in the header.
          </Typography>
          <br />
          <Typography variant="h5">
            If it is your first time using Soak up Syllogisms then you should visit the tutorial. In the tutorial you will be presented with interactive exercises to help you understand how to use the tool.
          </Typography>
          <br />
          <Typography variant="h5">
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

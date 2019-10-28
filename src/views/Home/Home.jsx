import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from '../../assets/views/jss/Home/home';

function Home(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={11}>
          <Paper className={classes.paper}>
            <Typography style={{ marginBottom: '10px' }} variant="h3">
              Welcome to Soak Up Syllogisms
            </Typography>
            <Typography varient="4">
              Learn how to become an undefeated grandmaster of reasoning here.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.paper}>
            <Typography varient="body2">
              Syllogisms are logical arguments that arrive at a conclusion based on two or more propositions. Soak Up Syllogisms is a tool to help you get familiar with logical reasoning with syllogisms. A number of exercises are available to help you understand the concepts more clearly, you can see the exercises on the practice section. If you are feeling confident, you can go to the quiz section to test yourself.
            </Typography>
            <Typography varient="body2">
              <br />
              If syllogisms are completely new to you then you should read the tutorial before proceeding onto the exercises. In the tutorial you will find explanations on the anatomy of a syllogism and how to represent and manipulate them diagrammatically.
            </Typography>
            <Typography varient="body2">
              <br />
              The web app also provides the instant solver where you can check if a syllogistic argument is valid.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Home);

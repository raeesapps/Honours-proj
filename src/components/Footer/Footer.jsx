import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from '../../assets/components/jss/Footer/footer'

function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={9}>
          <Typography>
            Soak Up Syllogisms was engineered by
            <a href="http://raeesaamir.net"> Raees Aamir </a>
            and created as part of the
            <a href="https://www.inf.ed.ac.uk/teaching/courses/proj/"> Honours Project </a>
            at
            <a href="https://ed.ac.uk"> The University of Edinburgh </a>
            and is licensed under a GNU General Public License (
            <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL</a>
            ).
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <img style={{ marginBottom: '10px' }} alt="license" src="https://www.gnu.org/graphics/gplv3-with-text-84x42.png" />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Footer);

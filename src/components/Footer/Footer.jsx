import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from '../../assets/components/jss/Footer/footer_styles'

function Footer(props) {
  const { classes, ...rest } = props;
  return (
    <div className={classes.root} {...rest}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={9}>
          <Typography>
            Soak Up Syllogisms was engineered by <a href="http://raeesaamir.net">Raees Aamir</a> and created as part of the <a href="https://www.inf.ed.ac.uk/teaching/courses/proj/">Honours Project</a> at <a href="https://ed.ac.uk">The University of Edinburgh</a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(React.memo(Footer));

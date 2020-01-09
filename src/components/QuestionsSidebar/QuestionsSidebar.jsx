import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Questions from '../Questions/Questions';

import styles from '../../assets/components/jss/QuestionsSidebar/question_sidebar_styles';

function QuestionsSidebar(props) {
  const { InjectedComponent } = props;
  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          <Questions />
        </Grid>
        <Grid item xs={9}>
          <InjectedComponent {...props} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(QuestionsSidebar);

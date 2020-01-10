import React from 'react';

import Grid from '@material-ui/core/Grid';

import Questions from './Questions';

function withSidebar(WrappedComponent) {
  return function ComponentWithQuestionsSidebar(props) {
    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Questions />
          </Grid>
          <Grid item xs={9}>
            <WrappedComponent {...props} />
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default withSidebar;

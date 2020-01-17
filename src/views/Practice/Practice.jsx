import React from 'react';

import Grid from '@material-ui/core/Grid';

import Questions from '../../components/Questions/Questions';
import PracticeHomepage from './PracticeHomepage';

class Practice extends React.Component {
  constructor() {
    super();
    this.state = {
      Component: PracticeHomepage,
      content: null,
    };
  }

  setComponent = (Component, content) => {
    this.setState({ Component, content });
  };

  render() {
    const { Component, content } = this.state;
    return (
      <Grid container>
        <Grid item xs={3}>
          <Questions onClick={this.setComponent} />
        </Grid>
        <Grid item xs={9}>
          <Component content={content} onClick={this.setComponent} />
        </Grid>
      </Grid>
    );
  }
}

export default Practice;

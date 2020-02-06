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
      difficulty: null,
    };
  }

  setComponent = (Component, content, difficulty) => {
    this.setState({ Component, content, difficulty });
  };

  render() {
    const { Component, content, difficulty } = this.state;
    return (
      <Grid container>
        <Grid item xs={4}>
          <Questions onClick={this.setComponent} />
        </Grid>
        <Grid item xs={8}>
          <Component content={content} difficulty={difficulty} onClick={this.setComponent} />
        </Grid>
      </Grid>
    );
  }
}

export default Practice;

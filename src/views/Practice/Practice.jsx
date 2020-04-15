import React from 'react';

import Grid from '@material-ui/core/Grid';

import Questions from '../../components/Questions/Questions';
import PracticeHomepage from './PracticeHomepage';

class Practice extends React.Component {
  constructor() {
    super();
    this.state = {
      sidebarIdx: -1,
      selectedIdx: -1,
      Component: PracticeHomepage,
      content: null,
      difficulty: null,
      id: null,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const { key } = location;

    const { location: nextLocation } = nextProps;
    const { key: nextKey } = nextLocation;

    if (key !== nextKey) {
      this.setState({
        sidebarIdx: -1,
        selectedIdx: -1,
        Component: PracticeHomepage,
        content: null,
        difficulty: null,
        id: null,
      });
    }
  }

  setComponent = (sidebarIdx, selectedIdx, Component, content, difficulty, id) => {
    this.setState({
      sidebarIdx,
      selectedIdx,
      Component,
      content,
      difficulty,
      id,
    });
  };

  render() {
    const { sidebarIdx, selectedIdx, Component, content, difficulty, id } = this.state;
    return (
      <Grid container>
        <Grid item xs={3}>
          <Questions sidebarIdx={sidebarIdx} selectedIdx={selectedIdx} onClick={this.setComponent} />
        </Grid>
        <Grid item xs={9}>
          <Component id={id} questionidx={selectedIdx} content={content} difficulty={difficulty} onClick={this.setComponent} />
        </Grid>
      </Grid>
    );
  }
}

export default Practice;

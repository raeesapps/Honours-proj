import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Questions from '../../components/Questions/Questions';

import styles from '../../assets/views/jss/QuestionList/question_list_styles';

function QuestionList() {
  return <Questions />;
}

export default withStyles(styles)(QuestionList);

import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import withSidebar from '../../components/Questions/QuestionSidebar';

import styles from '../../assets/views/jss/QuestionList/question_list_styles';

function QuestionList() {
  return <div />;
}

export default withStyles(styles)(withSidebar(QuestionList));

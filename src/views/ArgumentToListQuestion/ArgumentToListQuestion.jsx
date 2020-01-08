import React from 'react';

import QuestionsSidebar from '../../components/QuestionsSidebar/QuestionsSidebar';
import ArgumentToListView from './ArgumentToListView';

function ArgumentToListQuestion(props) {
  return <QuestionsSidebar InjectedComponent={ArgumentToListView} {...props} />;
}

export default ArgumentToListQuestion;

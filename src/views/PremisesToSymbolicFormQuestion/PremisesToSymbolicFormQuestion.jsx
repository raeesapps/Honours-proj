import React from 'react';

import QuestionsSidebar from '../../components/QuestionsSidebar/QuestionsSidebar';
import PremisesToSymbolicFormView from './PremisesToSymbolicFormView';

function PremisesToSymbolicFormQuestion(props) {
  return <QuestionsSidebar InjectedComponent={PremisesToSymbolicFormView} {...props} />;
}

export default PremisesToSymbolicFormQuestion;

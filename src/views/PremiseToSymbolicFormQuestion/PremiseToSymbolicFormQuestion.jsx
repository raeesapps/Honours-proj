import React from 'react';

import QuestionsSidebar from '../../components/QuestionsSidebar/QuestionsSidebar';
import PremiseToSymbolicFormView from './PremiseToSymbolicFormView';

function PremiseToSymbolicFormQuestion(props) {
  return <QuestionsSidebar InjectedComponent={PremiseToSymbolicFormView} {...props} />;
}

export default PremiseToSymbolicFormQuestion;

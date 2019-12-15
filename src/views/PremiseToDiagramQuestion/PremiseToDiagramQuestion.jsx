import React from 'react';

import QuestionsSidebar from '../../components/QuestionsSidebar/QuestionsSidebar';
import PremiseToDiagramView from './PremiseToDiagramView';

function PremiseToDiagramQuestion(props) {
  return <QuestionsSidebar InjectedComponent={PremiseToDiagramView} {...props} />;
}

export default PremiseToDiagramQuestion;

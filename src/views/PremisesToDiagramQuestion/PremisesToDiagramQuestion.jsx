import React from 'react';

import QuestionsSidebar from '../../components/QuestionsSidebar/QuestionsSidebar';
import PremisesToDiagramView from './PremisesToDiagramView';

function PremisesToDiagramQuestion(props) {
  return <QuestionsSidebar InjectedComponent={PremisesToDiagramView} {...props} />;
}

export default PremisesToDiagramQuestion;

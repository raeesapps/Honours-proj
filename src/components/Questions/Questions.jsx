import React from 'react';

import Container from '@material-ui/core/Container';

import {
  premiseToSymbolicFormQuestions,
  syllogismToSymbolicFormQuestions,
  premiseToDiagramQuestions,
  combineDiagramsQuestion,
  mapAndArgueQuestion,
} from './question_instances';
import QuestionList from './QuestionList';

function Questions(props) {
  function renderQuestionList(questionType, onClick) {
    const {
      title,
      questions,
      component,
    } = questionType;

    return (
      <div key={`${title}`}>
        <QuestionList title={title} questions={questions} component={component} onClick={onClick} />
        <br />
      </div>
    );
  }
  const { onClick, ...rest } = props;
  const questionTypes = [
    premiseToSymbolicFormQuestions,
    syllogismToSymbolicFormQuestions,
    premiseToDiagramQuestions,
    combineDiagramsQuestion,
    mapAndArgueQuestion,
  ];

  return (
    <Container {...rest}>
      {
        questionTypes.map((questionType) => renderQuestionList(questionType, onClick))
      }
    </Container>
  );
}

export default React.memo(Questions);

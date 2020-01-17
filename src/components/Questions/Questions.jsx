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

function Questions() {
  function renderQuestionList(questionType) {
    const {
      title,
      questions,
      path,
    } = questionType;

    return (
      <div>
        <QuestionList title={title} questions={questions} path={path} />
        <br />
      </div>
    );
  }
  const questionTypes = [
    premiseToSymbolicFormQuestions,
    syllogismToSymbolicFormQuestions,
    premiseToDiagramQuestions,
    combineDiagramsQuestion,
    mapAndArgueQuestion,
  ];

  return (
    <Container>
      {
        questionTypes.map((questionType) => renderQuestionList(questionType))
      }
    </Container>
  );
}

export default React.memo(Questions);

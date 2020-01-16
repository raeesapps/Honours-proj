import React from 'react';

import Container from '@material-ui/core/Container';

import {
  premiseToSymbolicFormQuestions,
  premisesToSymbolicFormQuestions,
  premiseToDiagramQuestions,
  combinePremisesQuestion,
  reduceAndArgueQuestion,
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
    premisesToSymbolicFormQuestions,
    premiseToDiagramQuestions,
    combinePremisesQuestion,
    reduceAndArgueQuestion,
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

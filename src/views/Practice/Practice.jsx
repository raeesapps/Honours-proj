import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {
  premiseToSymbolicFormQuestions,
  premisesToSymbolicFormQuestions,
  premiseToDiagramQuestions,
  combinePremisesQuestion,
  reduceAndArgueQuestion,
} from '../../components/Questions/question_instances';
import QuestionCard from '../../components/Questions/QuestionCard';
import withSidebar from '../../components/Questions/QuestionSidebar';

function Practice() {
  function renderQuestionType(questionType) {
    const marginBottom = { marginBottom: '10px' };
    const {
      title,
      description,
      path,
      questions,
    } = questionType;

    return (
      <QuestionCard
        title={title}
        content={description}
        style={marginBottom}
        path={path}
        question={questions[0]}
      />
    );
  }
  const questionTypes = [
    premiseToSymbolicFormQuestions,
    premisesToSymbolicFormQuestions,
    premiseToDiagramQuestions,
    combinePremisesQuestion,
    reduceAndArgueQuestion,
  ];
  const marginBottom = { marginBottom: '10px' };
  return (
    <Container>
      <Typography variant="h4">
        Practice syllogisms!
      </Typography>
      <Typography variant="h6" style={marginBottom}>
        Here you can find different types of exercises involving syllogisms. Choose any category you want to practice
      </Typography>
      {
        questionTypes.map((questionType) => renderQuestionType(questionType))
      }
    </Container>
  );
}

export default withSidebar(Practice);

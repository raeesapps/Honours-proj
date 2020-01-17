import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {
  premiseToSymbolicFormQuestions,
  syllogismToSymbolicFormQuestions,
  premiseToDiagramQuestions,
  combineDiagramsQuestion,
  mapAndArgueQuestion,
} from '../../components/Questions/question_instances';
import QuestionCard from '../../components/Questions/QuestionCard';

function PracticeHomepage(props) {
  function renderQuestionType(questionType, onClick) {
    const marginBottom = { marginBottom: '10px' };
    const {
      title,
      description,
      component,
      questions,
    } = questionType;

    return (
      <QuestionCard
        key={title}
        title={title}
        content={description}
        style={marginBottom}
        component={component}
        question={questions[0]}
        onClick={onClick}
      />
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
  const marginBottom = { marginBottom: '10px' };
  return (
    <Container {...rest}>
      <Typography variant="h4">
        Practice syllogisms!
      </Typography>
      <Typography variant="h6" style={marginBottom}>
        Here you can find different types of exercises involving syllogisms. Choose any category you want to practice
      </Typography>
      {
        questionTypes.map((questionType) => renderQuestionType(questionType, onClick))
      }
    </Container>
  );
}

export default PracticeHomepage;

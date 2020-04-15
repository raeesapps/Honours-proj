import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {
  propositionToSymbolicFormQuestions,
  syllogismToSymbolicFormQuestions,
  propositionToDiagramQuestions,
  combineDiagramsQuestion,
  mapAndArgueQuestion,
} from '../../question_instances';
import QuestionCard from '../../components/Questions/QuestionCard';

function PracticeHomepage(props) {
  function renderQuestionType(questionType, idx, onClick) {
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
        sidebarIdx={idx}
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
    propositionToSymbolicFormQuestions,
    syllogismToSymbolicFormQuestions,
    propositionToDiagramQuestions,
    combineDiagramsQuestion,
    mapAndArgueQuestion,
  ];
  const marginBottom = '15px';
  return (
    <Container {...rest}>
      <center>
        <Typography variant="h3" style={{ marginBottom }}>
          Practice syllogisms!
        </Typography>
      </center>
      <Typography variant="h6" style={{ marginBottom }}>
        Here you can find different types of exercises involving syllogisms. Choose any category you want to practice
      </Typography>
      {
        questionTypes.map((questionType, idx) => renderQuestionType(questionType, idx, onClick))
      }
    </Container>
  );
}

export default PracticeHomepage;

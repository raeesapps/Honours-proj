import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  premiseToSymbolicFormQuestions,
  syllogismToSymbolicFormQuestions,
  premiseToDiagramQuestions,
  combineDiagramsQuestion,
  mapAndArgueQuestion,
} from '../../components/Questions/question_instances';
import QuestionCard from '../../components/Questions/QuestionCard';

import { STAR_TYPES, getStarCount } from '../../utils/stars';

import bronzeStar from '../../assets/views/img/bronze_star.png';
import silverStar from '../../assets/views/img/silver_star.png';
import goldStar from '../../assets/views/img/gold_star.png';

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
  const { BRONZE_STAR, SILVER_STAR, GOLD_STAR } = STAR_TYPES;
  const { onClick, ...rest } = props;
  const questionTypes = [
    premiseToSymbolicFormQuestions,
    syllogismToSymbolicFormQuestions,
    premiseToDiagramQuestions,
    combineDiagramsQuestion,
    mapAndArgueQuestion,
  ];
  const marginBottom = '10px'
  return (
    <Container {...rest}>
      <Typography variant="h4">
        Practice syllogisms!
      </Typography>
      <Typography variant="h6" style={{ marginBottom }}>
        Your achievements
      </Typography>
      <Paper style={{ marginBottom, width: '620px' }}>
        <div style={{ display: 'flex' }}>
          <img src={bronzeStar} alt="bronze star" />
          <img src={silverStar} alt="silver star" />
          <img src={goldStar} alt="gold star" />
        </div>
        <div style={{ display: 'flex' }}>
          <Typography variant="h2" style={{ marginLeft: '80px' }}>
            {getStarCount(BRONZE_STAR)}
          </Typography>
          <Typography variant="h2" style={{ marginLeft: '160px' }}>
            {getStarCount(SILVER_STAR)}
          </Typography>
          <Typography variant="h2" style={{ marginLeft: '180px' }}>
            {getStarCount(GOLD_STAR)}
          </Typography>
        </div>
      </Paper>
      <Typography variant="h6" style={{ marginBottom }}>
        Here you can find different types of exercises involving syllogisms. Choose any category you want to practice
      </Typography>
      {
        questionTypes.map((questionType) => renderQuestionType(questionType, onClick))
      }
    </Container>
  );
}

export default PracticeHomepage;

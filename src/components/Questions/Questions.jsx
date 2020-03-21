import React from 'react';

import Container from '@material-ui/core/Container';

import {
  premiseToSymbolicFormQuestions,
  syllogismToSymbolicFormQuestions,
  premiseToDiagramQuestions,
  combineDiagramsQuestion,
  mapAndArgueQuestion,
} from '../../question_instances';
import QuestionList from './QuestionList';

function Questions(props) {
  function renderQuestionList(questionType, idx, sidebarIdx, selectedIdx, onClick) {
    const {
      title,
      questions,
      component,
    } = questionType;

    return (
      <div key={`${title}`}>
        <QuestionList
          title={title}
          questions={questions}
          component={component}
          idx={idx}
          sidebarIdx={sidebarIdx}
          selectedIdx={selectedIdx}
          onClick={onClick}
        />
        <br />
      </div>
    );
  }
  const {
    onClick,
    sidebarIdx,
    selectedIdx,
    ...rest
  } = props;
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
        questionTypes.map((questionType, idx) => (
          renderQuestionList(
            questionType,
            idx,
            sidebarIdx,
            selectedIdx,
            onClick,
          )
        ))
      }
    </Container>
  );
}

export default React.memo(Questions);

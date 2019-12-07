import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PremiseCollection from '../../logic/premise_collection';
import { Premise, forms } from '../../logic/premise';

import QuestionList from './Components/QuestionList';
import styles from '../../assets/views/jss/Questions/questions_styles';

function generatePremiseCollection(premises, conclusion) {
  const premiseCollection = new PremiseCollection([...premises]);

  if (conclusion) {
    premiseCollection.addConclusionButDoNotArgue(conclusion);
  }

  return premiseCollection;
}

function Quiz() {
  const { ALL_A_IS_B } = forms;
  const argumentToListQuestions = [
    {
      title: 'BARBARA',
      content: generatePremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'men',
            secondTerm: 'mortal',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'greeks',
            secondTerm: 'men',
          }),
        ],
        new Premise(ALL_A_IS_B, {
          firstTerm: 'greeks',
          secondTerm: 'mortal',
        }),
      ),
    },
  ];
  const premisesToDiagramQuestions = [
    {
      title: 'BARBARA',
      content: generatePremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'men',
            secondTerm: 'mortal',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'greeks',
            secondTerm: 'men',
          }),
        ],
      ),
    },
  ];
  return (
    <Container>
      <QuestionList questions={argumentToListQuestions} path="/argumentToListQuestion" />
      <br />
      <QuestionList questions={premisesToDiagramQuestions} path="/premisesToDiagramQuestion" />
    </Container>
  );
}

export default withStyles(styles)(Quiz);

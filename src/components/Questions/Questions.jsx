import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PremiseCollection from '../../logic/premise_collection';
import { Premise, forms } from '../../logic/premise';

import QuestionList from '../QuestionList/QuestionList';
import styles from '../../assets/components/jss/Questions/questions_styles';

function generatePremiseCollection(premises, conclusion) {
  const premiseCollection = new PremiseCollection([...premises]);

  if (conclusion) {
    premiseCollection.addConclusionButDoNotArgue(conclusion);
  }

  return premiseCollection;
}

function Questions() {
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
  const premiseToDiagramQuestions = [
    {
      title: 'All A are B',
      content: new Premise(ALL_A_IS_B, {
        firstTerm: 'A',
        secondTerm: 'B',
      }),
    },
  ];
  return (
    <Container>
      <QuestionList title="Syllogism to Haskell List" questions={argumentToListQuestions} path="/argumentToListQuestion" />
      <br />
      <QuestionList title="Syllogism to Venn Diagram" questions={premisesToDiagramQuestions} path="/premisesToDiagramQuestion" />
      <br />
      <QuestionList title="Premise to Venn Diagram" questions={premiseToDiagramQuestions} path="/premiseToDiagramQuestion" />
    </Container>
  );
}

Questions.propTypes = {};

export default withStyles(styles)(Questions);

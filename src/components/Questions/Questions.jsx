import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PremiseCollection from '../../logic/premise_collection';
import { Premise, forms } from '../../logic/premise';

import QuestionList from './QuestionList';
import styles from '../../assets/components/jss/Questions/questions_styles';

function generatePremiseCollection(premises, conclusion) {
  const premiseCollection = new PremiseCollection([...premises]);

  if (conclusion) {
    return {
      premiseCollection,
      conclusion,
    };
  }

  return premiseCollection;
}

function Questions() {
  const { ALL_A_IS_B } = forms;
  const premiseToSymbolicFormQuestions = [
    {
      title: 'BARBARA',
      content: new Premise(ALL_A_IS_B, {
        firstTerm: 'men',
        secondTerm: 'mortal',
      }),
    },
  ];
  const premisesToSymbolicFormQuestions = [
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
  const combinePremisesQuestion = [
    {
      title: 'BARBARA',
      content: generatePremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
        ],
      ),
    },
  ];
  const reduceAndArgueQuestion = [
    {
      title: 'BARBARA',
      content: generatePremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
        ], new Premise(ALL_A_IS_B, {
          firstTerm: 'A',
          secondTerm: 'C',
        }),
      ),
    },
  ];
  const premiseToDiagramQuestions = [
    {
      title: 'All A are B',
      content: new PremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
        ],
      ),
    },
  ];
  return (
    <Container>
      <QuestionList title="Premise to Symbolic Form" questions={premiseToSymbolicFormQuestions} path="/premiseToSymbolicFormQuestion" />
      <br />
      <QuestionList title="Syllogism to Symbolic Form" questions={premisesToSymbolicFormQuestions} path="/premisesToSymbolicFormQuestion" />
      <br />
      <QuestionList title="Premise to Venn Diagram" questions={premiseToDiagramQuestions} path="/premiseToDiagramQuestion" />
      <br />
      <QuestionList title="Combine Premises" questions={combinePremisesQuestion} path="/combinePremisesQuestion" />
      <br />
      <QuestionList title="Prove Soundness of Syllogism" questions={reduceAndArgueQuestion} path="/reduceAndArgueQuestion" />
    </Container>
  );
}

export default withStyles(styles)(React.memo(Questions));

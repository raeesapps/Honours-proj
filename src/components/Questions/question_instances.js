import { Premise, forms } from '../../logic/premise';
import PremiseCollection from '../../logic/premise_collection';

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

const { ALL_A_IS_B } = forms;

const premiseToSymbolicFormQuestions = {
  title: 'Premise To Symbolic Form',
  description: 'Translate the sentential form of a premise to symbolic form using letters and the turnstile symbol',
  path: '/premiseToSymbolicFormQuestion',
  questions: [
    {
      title: 'BARBARA',
      content: new Premise(ALL_A_IS_B, {
        firstTerm: 'men',
        secondTerm: 'mortal',
      }),
    },
  ],
};

const premisesToSymbolicFormQuestions = {
  title: 'Argument To Symbolic Form',
  description: 'Translate the sentential form of each premise in an argument to symbolic form using letters and the turnstile symbol',
  path: '/premisesToSymbolicFormQuestion',
  questions: [
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
  ],
};

const premiseToDiagramQuestions = {
  title: 'Premise To Diagram',
  description: 'Given two or three Venn Diagrams that represent the existence or extinction of sets in a premise, reduce the two or three Venn Diagrams to one Venn Diagram',
  path: '/premiseToDiagramQuestion',
  questions: [
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
  ],
};

const combinePremisesQuestion = {
  title: 'Combine Diagrams',
  description: 'Fill in a Venn Diagram to represent the existence or extinction of sets in a premise',
  path: '/combinePremisesQuestion',
  questions: [
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
  ],
};

const reduceAndArgueQuestion = {
  title: 'Map And Argue',
  description: 'Given a single Venn Diagram containing three or four sets, map it to a Venn Diagram containing only two sets and argue whether a conclusion is entailed by the information illustrated on the mapped Venn Diagram',
  path: '/reduceAndArgueQuestion',
  questions: [
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
  ],
};

export {
  premiseToSymbolicFormQuestions,
  premisesToSymbolicFormQuestions,
  premiseToDiagramQuestions,
  combinePremisesQuestion,
  reduceAndArgueQuestion,
};

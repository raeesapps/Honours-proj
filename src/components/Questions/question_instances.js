import DIFFICULTY from './question_difficulty';

import CombineDiagramsQuestion from '../CombineDiagramsQuestion/CombineDiagramsQuestion';
import MapAndArgueQuestion from '../MapAndArgueQuestion/MapAndArgueQuestion';
import PremiseToDiagramQuestion from '../PremiseToDiagram/PremiseToDiagramQuestion';
import PremisesToSymbolicFormQuestion from '../PremiseToSymbolicForm/PremiseToSymbolicFormQuestion';
import SyllogismToSymbolicFormQuestion from '../PremiseToSymbolicForm/SyllogismToSymbolicFormQuestion';

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

function generatePremiseCollectionAndConclusions(premises, conclusions) {
  const premiseCollection = new PremiseCollection([...premises]);

  return {
    premiseCollection,
    conclusions: [...conclusions],
  };
}

const {
  ALL_A_IS_B,
  SOME_A_IS_B,
  NO_A_IS_B,
  SOME_A_IS_NOT_B,
  SOME_A_EXIST,
} = forms;

const { EASY, MEDIUM, HARD } = DIFFICULTY;

const premiseToSymbolicFormQuestions = {
  title: 'Premise To Symbolic Form',
  description: 'Translate the sentential form of a premise to symbolic form using letters and the turnstile symbol',
  component: PremisesToSymbolicFormQuestion,
  questions: [
    {
      id: 0,
      difficulty: EASY,
      content: new Premise(ALL_A_IS_B, {
        firstTerm: 'men',
        secondTerm: 'mortal',
      }),
    },
    {
      id: 1,
      difficulty: EASY,
      content: new Premise(SOME_A_IS_B, {
        firstTerm: 'carrots',
        secondTerm: 'blue',
      }),
    },
    {
      id: 2,
      difficulty: EASY,
      content: new Premise(NO_A_IS_B, {
        firstTerm: 'frog',
        secondTerm: 'pink',
      }),
    },
    {
      id: 3,
      difficulty: EASY,
      content: new Premise(SOME_A_IS_NOT_B, {
        firstTerm: 'chickens',
        secondTerm: 'cooked',
      }),
    },
  ],
};

const syllogismToSymbolicFormQuestions = {
  title: 'Syllogism To Symbolic Form',
  description: 'Translate the sentential form of each premise in an argument to symbolic form using letters and the turnstile symbol',
  component: SyllogismToSymbolicFormQuestion,
  questions: [
    {
      id: 4,
      difficulty: EASY,
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
    {
      id: 5,
      difficulty: EASY,
      content: generatePremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'rabits',
            secondTerm: 'furry',
          }),
          new Premise(SOME_A_IS_B, {
            firstTerm: 'pets',
            secondTerm: 'rabbits',
          }),
        ],
        new Premise(SOME_A_IS_B, {
          firstTerm: 'pets',
          secondTerm: 'furry',
        }),
      ),
    },
    {
      id: 6,
      difficulty: MEDIUM,
      content: generatePremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'lions',
            secondTerm: 'big cats',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'big cats',
            secondTerm: 'predators',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'predators',
            secondTerm: 'carnivores',
          }),
        ],
        new Premise(ALL_A_IS_B, {
          firstTerm: 'lions',
          secondTerm: 'carnivores',
        }),
      ),
    },
  ],
};

const premiseToDiagramQuestions = {
  title: 'Premise To Diagram',
  description: 'Given two or three Venn Diagrams that represent the existence or extinction of sets in a premise, reduce the two or three Venn Diagrams to one Venn Diagram',
  component: PremiseToDiagramQuestion,
  questions: [
    {
      id: 7,
      difficulty: EASY,
      content: new PremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
        ],
      ),
    },
    {
      id: 8,
      title: 'Some A are B',
      difficulty: EASY,
      content: new PremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
        ],
      ),
    },
    {
      id: 9,
      difficulty: EASY,
      content: new PremiseCollection(
        [
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
        ],
      ),
    },
    {
      id: 10,
      difficulty: EASY,
      content: new PremiseCollection(
        [
          new Premise(NO_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
        ],
      ),
    },
    {
      id: 11,
      difficulty: EASY,
      content: new PremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'D',
          }),
        ], ['E'],
      ),
    },
    {
      id: 12,
      difficulty: EASY,
      content: new PremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'D',
          }),
        ], ['E'],
      ),
    },
    {
      id: 13,
      difficulty: EASY,
      content: new PremiseCollection(
        [
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'C',
            secondTerm: 'D',
          }),
        ], ['E'],
      ),
    },
    {
      id: 14,
      difficulty: EASY,
      content: new PremiseCollection(
        [
          new Premise(NO_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'D',
          }),
        ], ['E'],
      ),
    },
    {
      id: 15,
      difficulty: MEDIUM,
      content: new PremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'F',
            secondTerm: 'G',
          }),
        ], ['H', 'I'],
      ),
    },
    {
      id: 16,
      difficulty: MEDIUM,
      content: new PremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'F',
            secondTerm: 'G',
          }),
        ], ['H', 'I'],
      ),
    },
    {
      id: 17,
      difficulty: MEDIUM,
      content: new PremiseCollection(
        [
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'F',
            secondTerm: 'G',
          }),
        ], ['H', 'I'],
      ),
    },
    {
      id: 18,
      difficulty: MEDIUM,
      content: new PremiseCollection(
        [
          new Premise(NO_A_IS_B, {
            firstTerm: 'F',
            secondTerm: 'G',
          }),
        ], ['H', 'I'],
      ),
    },
  ],
};

const combineDiagramsQuestion = {
  title: 'Combine Diagrams',
  description: 'Fill in a Venn Diagram to represent the existence or extinction of sets in a premise',
  component: CombineDiagramsQuestion,
  questions: [
    {
      id: 19,
      difficulty: EASY,
      content: generatePremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(SOME_A_IS_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
        ],
      ),
    },
    {
      id: 20,
      difficulty: MEDIUM,
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
          new Premise(ALL_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'D',
          }),
        ],
      ),
    },
  ],
};

const mapAndArgueQuestion = {
  title: 'Map And Argue',
  description: 'Given a single Venn Diagram containing three or four sets, map it to a Venn Diagram containing only two sets and argue whether a conclusion is entailed by the information illustrated on the mapped Venn Diagram',
  component: MapAndArgueQuestion,
  questions: [
    {
      id: 21,
      difficulty: MEDIUM,
      content: generatePremiseCollectionAndConclusions(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'C',
            secondTerm: 'B',
          }),
        ],
        [
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
          new Premise(NO_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'C',
          }),
          new Premise(NO_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
        ],
      ),
    },
    {
      id: 22,
      difficulty: HARD,
      content: generatePremiseCollectionAndConclusions(
        [
          new Premise(SOME_A_EXIST, {
            firstTerm: 'A',
          }),
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'D',
          }),
        ],
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'C',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
          new Premise(NO_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'C',
          }),
          new Premise(NO_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
        ],
      ),
    },
  ],
};

export {
  premiseToSymbolicFormQuestions,
  syllogismToSymbolicFormQuestions,
  premiseToDiagramQuestions,
  combineDiagramsQuestion,
  mapAndArgueQuestion,
};

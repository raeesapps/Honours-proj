import DIFFICULTY from './components/Questions/question_difficulty';

import CombineDiagramsQuestion from './components/CombineDiagramsQuestion/CombineDiagramsQuestion';
import MapAndArgueQuestion from './components/MapAndArgueQuestion/MapAndArgueQuestion';
import PremiseToDiagramQuestion from './components/PremiseToDiagram/PremiseToDiagramQuestion';
import PremisesToSymbolicFormQuestion from './components/PremiseToSymbolicForm/PremiseToSymbolicFormQuestion';
import SyllogismToSymbolicFormQuestion from './components/PremiseToSymbolicForm/SyllogismToSymbolicFormQuestion';

import { Premise, forms } from './logic/premise';
import PremiseCollection from './logic/premise_collection';

const {
  ALL_A_IS_B,
  SOME_A_IS_B,
  NO_A_IS_B,
  SOME_A_IS_NOT_B,
} = forms;

const { EASY, MEDIUM, HARD } = DIFFICULTY;

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

function generatePremiseCollectionAndConclusions(premises, conclusionFirstTerm, conclusionSecondTerm) {
  const premiseCollection = new PremiseCollection([...premises]);

  return {
    premiseCollection,
    conclusions: [
      new Premise(SOME_A_IS_NOT_B, {
        firstTerm: conclusionFirstTerm,
        secondTerm: conclusionSecondTerm,
      }),
      new Premise(ALL_A_IS_B, {
        firstTerm: conclusionFirstTerm,
        secondTerm: conclusionSecondTerm,
      }),
      new Premise(SOME_A_IS_B, {
        firstTerm: conclusionFirstTerm,
        secondTerm: conclusionSecondTerm,
      }),
      new Premise(NO_A_IS_B, {
        firstTerm: conclusionFirstTerm,
        secondTerm: conclusionSecondTerm,
      }),
      new Premise(SOME_A_IS_NOT_B, {
        firstTerm: conclusionSecondTerm,
        secondTerm: conclusionFirstTerm,
      }),
      new Premise(ALL_A_IS_B, {
        firstTerm: conclusionSecondTerm,
        secondTerm: conclusionFirstTerm,
      }),
      new Premise(SOME_A_IS_B, {
        firstTerm: conclusionSecondTerm,
        secondTerm: conclusionFirstTerm,
      }),
      new Premise(NO_A_IS_B, {
        firstTerm: conclusionSecondTerm,
        secondTerm: conclusionFirstTerm,
      }),
    ],
  };
}

const premiseToSymbolicFormQuestions = {
  title: 'Proposition to standard form',
  description: 'Translate the sentential form of a premise to standard form using letters and the turnstile symbol',
  component: PremisesToSymbolicFormQuestion,
  questions: [
    {
      id: 0,
      idx: 0,
      difficulty: EASY,
      content: new Premise(ALL_A_IS_B, {
        firstTerm: 'men',
        secondTerm: 'mortal',
      }),
    },
    {
      id: 1,
      idx: 1,
      difficulty: EASY,
      content: new Premise(SOME_A_IS_B, {
        firstTerm: 'carrots',
        secondTerm: 'blue',
      }),
    },
    {
      id: 2,
      idx: 2,
      difficulty: EASY,
      content: new Premise(NO_A_IS_B, {
        firstTerm: 'frog',
        secondTerm: 'pink',
      }),
    },
    {
      id: 3,
      idx: 3,
      difficulty: EASY,
      content: new Premise(SOME_A_IS_NOT_B, {
        firstTerm: 'chickens',
        secondTerm: 'cooked',
      }),
    },
  ],
};

const syllogismToSymbolicFormQuestions = {
  title: 'Create dictionary of syllogism',
  description: 'Translate the sentential form of each premise in an argument to standard form using letters and the turnstile symbol',
  component: SyllogismToSymbolicFormQuestion,
  questions: [
    {
      id: 4,
      idx: 0,
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
      idx: 1,
      difficulty: EASY,
      content: generatePremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'rabbits',
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
      idx: 2,
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
    {
      id: 34,
      idx: 3,
      difficulty: EASY,
      content: generatePremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'physicians',
            secondTerm: 'surgeons',
          }),
          new Premise(SOME_A_IS_B, {
            firstTerm: 'surgeons',
            secondTerm: 'ophthalmologists',
          }),
        ],
        new Premise(SOME_A_IS_B, {
          firstTerm: 'physicians',
          secondTerm: 'ophthalmologists',
        }),
      ),
    },
    {
      id: 35,
      idx: 4,
      difficulty: EASY,
      content: generatePremiseCollection(
        [
          new Premise(NO_A_IS_B, {
            firstTerm: 'earthlings',
            secondTerm: 'martians',
          }),
          new Premise(NO_A_IS_B, {
            firstTerm: 'martians',
            secondTerm: 'humans',
          }),
        ],
        new Premise(NO_A_IS_B, {
          firstTerm: 'earthlings',
          secondTerm: 'humans',
        }),
      ),
    },
    {
      id: 36,
      idx: 5,
      difficulty: MEDIUM,
      content: generatePremiseCollection(
        [
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'people',
            secondTerm: 'vegetarians',
          }),
          new Premise(NO_A_IS_B, {
            firstTerm: 'vegetarians',
            secondTerm: 'carnivores',
          }),
        ],
        new Premise(SOME_A_IS_NOT_B, {
          firstTerm: 'people',
          secondTerm: 'carnivores',
        }),
      ),
    },
    {
      id: 37,
      idx: 6,
      difficulty: MEDIUM,
      content: generatePremiseCollection(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'chickens',
            secondTerm: 'animals',
          }),
          new Premise(SOME_A_IS_B, {
            firstTerm: 'animals',
            secondTerm: 'aggressive',
          }),
          new Premise(NO_A_IS_B, {
            firstTerm: 'chickens',
            secondTerm: 'aggressive',
          }),
        ],
        new Premise(SOME_A_IS_NOT_B, {
          firstTerm: 'chickens',
          secondTerm: 'aggressive',
        }),
      ),
    },
  ],
};

const premiseToDiagramQuestions = {
  title: 'Proposition to Venn Diagram',
  description: 'Shade the Venn Diagram to represent the premise. Some compartment might be empty and some might be part of an x-sequence.',
  component: PremiseToDiagramQuestion,
  questions: [
    {
      id: 7,
      idx: 0,
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
      idx: 1,
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
      idx: 2,
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
      idx: 3,
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
      idx: 4,
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
      idx: 5,
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
      idx: 6,
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
      idx: 7,
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
      idx: 8,
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
      idx: 9,
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
      idx: 10,
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
      idx: 11,
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
  title: 'Multiple propositions to single Venn Diagram',
  description: 'Given two or three Venn Diagrams that each represent a premise, shade a three or four set Venn Diagram to represent all the premises.',
  component: CombineDiagramsQuestion,
  questions: [
    {
      id: 27,
      idx: 0,
      difficulty: EASY,
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
    {
      id: 19,
      idx: 1,
      difficulty: MEDIUM,
      content: generatePremiseCollection(
        [
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
        ],
      ),
    },
    {
      id: 23,
      idx: 2,
      difficulty: EASY,
      content: generatePremiseCollection(
        [
          new Premise(NO_A_IS_B, {
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
      id: 24,
      idx: 3,
      difficulty: MEDIUM,
      content: generatePremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'A',
            secondTerm: 'C',
          }),
        ],
      ),
    },
    {
      id: 25,
      idx: 4,
      difficulty: MEDIUM,
      content: generatePremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
        ],
      ),
    },
    {
      id: 26,
      idx: 5,
      difficulty: MEDIUM,
      content: generatePremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'C',
          }),
        ],
      ),
    },
    {
      id: 27,
      idx: 6,
      difficulty: MEDIUM,
      content: generatePremiseCollection(
        [
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
      ),
    },
    {
      id: 28,
      idx: 8,
      difficulty: HARD,
      content: generatePremiseCollection(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'C',
          }),
          new Premise(NO_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'D',
          }),
        ],
      ),
    },
  ],
};

const mapAndArgueQuestion = {
  title: 'Derive a proposition from the Venn Diagram',
  description: 'Given a shaded Venn Diagram containing three or four sets, transfer the shadings to a two set Venn Diagram. Examine the two set Venn Diagram to derive a conclusion.',
  component: MapAndArgueQuestion,
  questions: [
    {
      id: 100,
      idx: 0,
      difficulty: EASY,
      content: generatePremiseCollectionAndConclusions(
        [
          new Premise(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
        ], 'C', 'B',
      ),
    },
    {
      id: 101,
      idx: 1,
      difficulty: MEDIUM,
      content: generatePremiseCollectionAndConclusions(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
        ], 'A', 'C',
      ),
    },
    {
      id: 102,
      idx: 2,
      difficulty: EASY,
      content: generatePremiseCollectionAndConclusions(
        [
          new Premise(NO_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(SOME_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
        ], 'C', 'B',
      ),
    },
    {
      id: 103,
      idx: 3,
      difficulty: MEDIUM,
      content: generatePremiseCollectionAndConclusions(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'C',
            secondTerm: 'A',
          }),
        ], 'C', 'B',
      ),
    },
    {
      id: 104,
      idx: 4,
      difficulty: MEDIUM,
      content: generatePremiseCollectionAndConclusions(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'C',
          }),
        ], 'C', 'B',
      ),
    },
    {
      id: 105,
      idx: 5,
      difficulty: HARD,
      content: generatePremiseCollectionAndConclusions(
        [
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
        ], 'A', 'D',
      ),
    },
    {
      id: 106,
      idx: 6,
      difficulty: HARD,
      content: generatePremiseCollectionAndConclusions(
        [
          new Premise(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Premise(SOME_A_IS_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
          new Premise(SOME_A_IS_NOT_B, {
            firstTerm: 'C',
            secondTerm: 'D',
          }),
        ], 'A', 'D',
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

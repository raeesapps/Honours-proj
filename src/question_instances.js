import DIFFICULTY from './components/Questions/question_difficulty';

import CombineDiagramsQuestion from './components/CombineDiagramsQuestion/CombineDiagramsQuestion';
import MapAndArgueQuestion from './components/MapAndArgueQuestion/MapAndArgueQuestion';
import PropositionToDiagramQuestion from './components/PropositionToDiagram/PropositionToDiagramQuestion';
import PropositionsToSymbolicFormQuestion from './components/PropositionToSymbolicForm/PropositionToSymbolicFormQuestion';
import SyllogismToSymbolicFormQuestion from './components/PropositionToSymbolicForm/SyllogismToSymbolicFormQuestion';

import { Proposition, forms } from './logic/proposition';
import PropositionCollection from './logic/proposition_collection';

const {
  ALL_A_IS_B,
  SOME_A_IS_B,
  NO_A_IS_B,
  SOME_A_IS_NOT_B,
} = forms;

const { EASY, MEDIUM, HARD } = DIFFICULTY;

function generatePropositionCollection(propositions, conclusion) {
  const propositionCollection = new PropositionCollection([...propositions]);

  if (conclusion) {
    return {
      propositionCollection,
      conclusion,
    };
  }

  return propositionCollection;
}

function generatePropositionCollectionAndConclusions(propositions, conclusionFirstTerm, conclusionSecondTerm) {
  const propositionCollection = new PropositionCollection([...propositions]);

  return {
    propositionCollection,
    conclusions: [
      new Proposition(SOME_A_IS_NOT_B, {
        firstTerm: conclusionFirstTerm,
        secondTerm: conclusionSecondTerm,
      }),
      new Proposition(ALL_A_IS_B, {
        firstTerm: conclusionFirstTerm,
        secondTerm: conclusionSecondTerm,
      }),
      new Proposition(SOME_A_IS_B, {
        firstTerm: conclusionFirstTerm,
        secondTerm: conclusionSecondTerm,
      }),
      new Proposition(NO_A_IS_B, {
        firstTerm: conclusionFirstTerm,
        secondTerm: conclusionSecondTerm,
      }),
      new Proposition(SOME_A_IS_NOT_B, {
        firstTerm: conclusionSecondTerm,
        secondTerm: conclusionFirstTerm,
      }),
      new Proposition(ALL_A_IS_B, {
        firstTerm: conclusionSecondTerm,
        secondTerm: conclusionFirstTerm,
      }),
      new Proposition(SOME_A_IS_B, {
        firstTerm: conclusionSecondTerm,
        secondTerm: conclusionFirstTerm,
      }),
      new Proposition(NO_A_IS_B, {
        firstTerm: conclusionSecondTerm,
        secondTerm: conclusionFirstTerm,
      }),
    ],
  };
}

const propositionToSymbolicFormQuestions = {
  title: 'Proposition to standard form',
  description: 'Translate the sentential form of a proposition to standard form using letters and the turnstile symbol',
  component: PropositionsToSymbolicFormQuestion,
  questions: [
    {
      id: 0,
      idx: 0,
      difficulty: EASY,
      content: new Proposition(ALL_A_IS_B, {
        firstTerm: 'men',
        secondTerm: 'mortal',
      }),
    },
    {
      id: 1,
      idx: 1,
      difficulty: EASY,
      content: new Proposition(SOME_A_IS_B, {
        firstTerm: 'carrots',
        secondTerm: 'blue',
      }),
    },
    {
      id: 2,
      idx: 2,
      difficulty: EASY,
      content: new Proposition(NO_A_IS_B, {
        firstTerm: 'frog',
        secondTerm: 'pink',
      }),
    },
    {
      id: 3,
      idx: 3,
      difficulty: EASY,
      content: new Proposition(SOME_A_IS_NOT_B, {
        firstTerm: 'chickens',
        secondTerm: 'cooked',
      }),
    },
  ],
};

const syllogismToSymbolicFormQuestions = {
  title: 'Create dictionary of syllogism',
  description: 'Translate the sentential form of each proposition in an argument to standard form using letters and the turnstile symbol',
  component: SyllogismToSymbolicFormQuestion,
  questions: [
    {
      id: 4,
      idx: 0,
      difficulty: EASY,
      content: generatePropositionCollection(
        [
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'men',
            secondTerm: 'mortal',
          }),
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'greeks',
            secondTerm: 'men',
          }),
        ],
        new Proposition(ALL_A_IS_B, {
          firstTerm: 'greeks',
          secondTerm: 'mortal',
        }),
      ),
    },
    {
      id: 5,
      idx: 1,
      difficulty: EASY,
      content: generatePropositionCollection(
        [
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'rabbits',
            secondTerm: 'furry',
          }),
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'pets',
            secondTerm: 'rabbits',
          }),
        ],
        new Proposition(SOME_A_IS_B, {
          firstTerm: 'pets',
          secondTerm: 'furry',
        }),
      ),
    },
    {
      id: 6,
      idx: 2,
      difficulty: MEDIUM,
      content: generatePropositionCollection(
        [
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'lions',
            secondTerm: 'big cats',
          }),
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'big cats',
            secondTerm: 'predators',
          }),
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'predators',
            secondTerm: 'carnivores',
          }),
        ],
        new Proposition(ALL_A_IS_B, {
          firstTerm: 'lions',
          secondTerm: 'carnivores',
        }),
      ),
    },
    {
      id: 34,
      idx: 3,
      difficulty: EASY,
      content: generatePropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'physicians',
            secondTerm: 'surgeons',
          }),
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'surgeons',
            secondTerm: 'ophthalmologists',
          }),
        ],
        new Proposition(SOME_A_IS_B, {
          firstTerm: 'physicians',
          secondTerm: 'ophthalmologists',
        }),
      ),
    },
    {
      id: 35,
      idx: 4,
      difficulty: EASY,
      content: generatePropositionCollection(
        [
          new Proposition(NO_A_IS_B, {
            firstTerm: 'earthlings',
            secondTerm: 'martians',
          }),
          new Proposition(NO_A_IS_B, {
            firstTerm: 'martians',
            secondTerm: 'humans',
          }),
        ],
        new Proposition(NO_A_IS_B, {
          firstTerm: 'earthlings',
          secondTerm: 'humans',
        }),
      ),
    },
    {
      id: 36,
      idx: 5,
      difficulty: MEDIUM,
      content: generatePropositionCollection(
        [
          new Proposition(SOME_A_IS_NOT_B, {
            firstTerm: 'people',
            secondTerm: 'vegetarians',
          }),
          new Proposition(NO_A_IS_B, {
            firstTerm: 'vegetarians',
            secondTerm: 'carnivores',
          }),
        ],
        new Proposition(SOME_A_IS_NOT_B, {
          firstTerm: 'people',
          secondTerm: 'carnivores',
        }),
      ),
    },
    {
      id: 37,
      idx: 6,
      difficulty: MEDIUM,
      content: generatePropositionCollection(
        [
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'chickens',
            secondTerm: 'animals',
          }),
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'animals',
            secondTerm: 'aggressive',
          }),
          new Proposition(NO_A_IS_B, {
            firstTerm: 'chickens',
            secondTerm: 'aggressive',
          }),
        ],
        new Proposition(SOME_A_IS_NOT_B, {
          firstTerm: 'chickens',
          secondTerm: 'aggressive',
        }),
      ),
    },
  ],
};

const propositionToDiagramQuestions = {
  title: 'Proposition to Venn diagram',
  description: 'Shade the Venn diagram to represent the proposition. Some compartments might be empty and some might be part of an x-sequence.',
  component: PropositionToDiagramQuestion,
  questions: [
    {
      id: 7,
      idx: 0,
      difficulty: EASY,
      content: new PropositionCollection(
        [
          new Proposition(ALL_A_IS_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(SOME_A_IS_NOT_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(NO_A_IS_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(ALL_A_IS_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(SOME_A_IS_NOT_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(NO_A_IS_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(ALL_A_IS_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(SOME_A_IS_NOT_B, {
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
      content: new PropositionCollection(
        [
          new Proposition(NO_A_IS_B, {
            firstTerm: 'F',
            secondTerm: 'G',
          }),
        ], ['H', 'I'],
      ),
    },
  ],
};

const combineDiagramsQuestion = {
  title: 'Multiple propositions to single Venn diagram',
  description: 'Given two or three Venn diagrams that each represent a proposition, shade a three or four set Venn diagram to represent all the propositions.',
  component: CombineDiagramsQuestion,
  questions: [
    {
      id: 27,
      idx: 0,
      difficulty: EASY,
      content: generatePropositionCollection(
        [
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(ALL_A_IS_B, {
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
      content: generatePropositionCollection(
        [
          new Proposition(SOME_A_IS_NOT_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(SOME_A_IS_NOT_B, {
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
      content: generatePropositionCollection(
        [
          new Proposition(NO_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(SOME_A_IS_B, {
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
      content: generatePropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(SOME_A_IS_NOT_B, {
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
      content: generatePropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(ALL_A_IS_B, {
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
      content: generatePropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(ALL_A_IS_B, {
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
      content: generatePropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
          new Proposition(ALL_A_IS_B, {
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
      content: generatePropositionCollection(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'C',
          }),
          new Proposition(NO_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'D',
          }),
        ],
      ),
    },
  ],
};

const mapAndArgueQuestion = {
  title: 'Derive a proposition from the Venn diagram',
  description: 'Given a shaded Venn diagram containing three or four sets, transfer the shadings to a two set Venn diagram. Examine the two set Venn diagram to derive a conclusion.',
  component: MapAndArgueQuestion,
  questions: [
    {
      id: 100,
      idx: 0,
      difficulty: EASY,
      content: generatePropositionCollectionAndConclusions(
        [
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(ALL_A_IS_B, {
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
      content: generatePropositionCollectionAndConclusions(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(SOME_A_IS_NOT_B, {
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
      content: generatePropositionCollectionAndConclusions(
        [
          new Proposition(NO_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(SOME_A_IS_B, {
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
      content: generatePropositionCollectionAndConclusions(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(ALL_A_IS_B, {
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
      content: generatePropositionCollectionAndConclusions(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(ALL_A_IS_B, {
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
      content: generatePropositionCollectionAndConclusions(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(ALL_A_IS_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
          new Proposition(ALL_A_IS_B, {
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
      content: generatePropositionCollectionAndConclusions(
        [
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'A',
            secondTerm: 'B',
          }),
          new Proposition(SOME_A_IS_B, {
            firstTerm: 'B',
            secondTerm: 'C',
          }),
          new Proposition(SOME_A_IS_NOT_B, {
            firstTerm: 'C',
            secondTerm: 'D',
          }),
        ], 'A', 'D',
      ),
    },
  ],
};

export {
  propositionToSymbolicFormQuestions,
  syllogismToSymbolicFormQuestions,
  propositionToDiagramQuestions,
  combineDiagramsQuestion,
  mapAndArgueQuestion,
};

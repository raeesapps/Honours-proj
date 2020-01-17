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

const {
  ALL_A_IS_B,
  SOME_A_IS_B,
  NO_A_IS_B,
  SOME_A_IS_NOT_B,
  SOME_A_EXIST,
} = forms;

const premiseToSymbolicFormQuestions = {
  title: 'Premise To Symbolic Form',
  description: 'Translate the sentential form of a premise to symbolic form using letters and the turnstile symbol',
  path: '/premiseToSymbolicFormQuestion',
  questions: [
    {
      title: 'All men are mortal',
      content: new Premise(ALL_A_IS_B, {
        firstTerm: 'men',
        secondTerm: 'mortal',
      }),
    },
    {
      title: 'Some carrots are blue',
      content: new Premise(SOME_A_IS_B, {
        firstTerm: 'carrots',
        secondTerm: 'blue',
      }),
    },
    {
      title: 'No frog is pink',
      content: new Premise(NO_A_IS_B, {
        firstTerm: 'frog',
        secondTerm: 'pink',
      }),
    },
    {
      title: 'Some chickens are not cooked',
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
  path: '/syllogismToSymbolicFormQuestion',
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
    {
      title: 'DARII',
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
      title: 'Sorites #1',
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
    {
      title: 'Some A are B',
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
      title: 'Some A are not B',
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
      title: 'No A are B',
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
      title: 'All C are D',
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
      title: 'Some C are D',
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
      title: 'Some C are not D',
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
      title: 'No C are D',
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
      title: 'All F are G',
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
      title: 'Some F are G',
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
      title: 'Some F are not G',
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
      title: 'No F are G',
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
  path: '/combineDiagramsQuestion',
  questions: [
    {
      title: 'BARBARA diagrams',
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
      title: 'Sorites #1 diagrams',
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
  path: '/mapAndArgueQuestion',
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
    {
      title: 'Sorites #1',
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
        ], new Premise(ALL_A_IS_B, {
          firstTerm: 'A',
          secondTerm: 'D',
        }),
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

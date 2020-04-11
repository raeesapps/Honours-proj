import { Premise, forms } from './premise';
import PremiseCollection from './premise_collection';
import {
  stages,
  validateVennDiagram,
  validateMappings,
} from './validator';

function constructShadings(shadings) {
  return {
    current: {
      getShadings() {
        return shadings;
      }
    }
  }
}

const {
  REPRESENTATION_STAGE,
  COMBINATION_STAGE,
  MAPPING_STAGE,
} = stages;

const {
  ALL_A_IS_B,
  SOME_A_IS_NOT_B,
} = forms;

test('Proposition represented correctly', () => {
  const propositionCollection = new PremiseCollection([
    new Premise(ALL_A_IS_B, {
      firstTerm: 'A',
      secondTerm: 'B',
    }),
  ]);
  const shadings = constructShadings({ '(A)': ['e'] });
  const result = validateVennDiagram(propositionCollection, [shadings], REPRESENTATION_STAGE);

  expect(result).toBe(true);
});

describe('Propositions manipulate correctly', () => {
  const propositionCollection = new PremiseCollection([
    new Premise(SOME_A_IS_NOT_B, {
      firstTerm: 'A',
      secondTerm: 'B',
    }),
    new Premise(SOME_A_IS_NOT_B, {
      firstTerm: 'C',
      secondTerm: 'A',
    }),
  ]);

  test('Propositions represented correctly', () => {
    const combinationShadings = constructShadings({ '(C)': ['x_2'], '(A&C)': ['x_1'], '(B&C)': ['x_2'], '(A)': ['x_1'] });
    const combinationResult = validateVennDiagram(propositionCollection, combinationShadings, COMBINATION_STAGE);
    expect(combinationResult).toBe(true);
  });

  test('Propositions reduce correctly', () => {
    const reductionShadings = constructShadings({ '(C)': ['x_2'], '(B&C)': ['x_2'] });
    const reductionResult = validateVennDiagram(propositionCollection, reductionShadings, MAPPING_STAGE, ['C', 'B']);
    expect(reductionResult).toBe(true);
  });
});

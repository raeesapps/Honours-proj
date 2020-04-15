import { Proposition, forms } from './proposition';
import PropositionCollection from './proposition_collection';
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

function constructEntry(entry) {
  return [
    {
      content: entry,
    },
  ];
}

function constructEmptyEntry() {
  return [];
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
  const propositionCollection = new PropositionCollection([
    new Proposition(ALL_A_IS_B, {
      firstTerm: 'A',
      secondTerm: 'B',
    }),
  ]);
  const shadings = constructShadings({ '(A)': ['e'] });
  const result = validateVennDiagram(propositionCollection, [shadings], REPRESENTATION_STAGE);

  expect(result).toBe(true);
});

describe('Propositions manipulate correctly', () => {
  const propositionCollection = new PropositionCollection([
    new Proposition(SOME_A_IS_NOT_B, {
      firstTerm: 'A',
      secondTerm: 'B',
    }),
    new Proposition(SOME_A_IS_NOT_B, {
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

describe('BARBARA mapping tests', () => {
  const barbaraPropositions = [
    new Proposition(ALL_A_IS_B, {
      firstTerm: 'People',
      secondTerm: 'Mortal',
    }),
    new Proposition(ALL_A_IS_B, {
      firstTerm: 'Greeks',
      secondTerm: 'People',
    }),
    new Proposition(ALL_A_IS_B, {
      firstTerm: 'Greeks',
      secondTerm: 'Mortal',
    }),
  ];
  const firstProposition = barbaraPropositions[0];

  test('Validate mappings with 3rd item missing', () => {
    const { hint, result } = validateMappings(constructEntry('A'), constructEntry('⊨'), constructEmptyEntry(), firstProposition, {});

    const expectedHint = 'Please drag an item into the third box!';
    const expectedResult = false;

    expect(hint).toBe(expectedHint);
    expect(result).toBe(expectedResult);
  });

  test('Validate mappings with 2nd item missing', () => {
    const { hint, result } = validateMappings(constructEntry('A'), constructEmptyEntry(), constructEntry('B'), firstProposition, {});

    const expectedHint = 'Please drag an item into the second box!';
    const expectedResult = false;

    expect(hint).toBe(expectedHint);
    expect(result).toBe(expectedResult);
  });

  test('Validate mappings with 1st item missing', () => {
    const { hint, result } = validateMappings(constructEmptyEntry(), constructEntry('⊨'), constructEntry('B'), firstProposition, {});

    const expectedHint = 'Please drag an item into the first box!';
    const expectedResult = false;

    expect(hint).toBe(expectedHint);
    expect(result).toBe(expectedResult);
  });

  test('Validate mappings with incorrect turnstile', () => {
    const { hint, result } = validateMappings(constructEntry('A'), constructEntry('⊯'), constructEntry('B'), firstProposition, {});

    const expectedHint = 'Your entailment symbol is wrong!';
    const expectedResult = false;

    expect(hint).toBe(expectedHint);
    expect(result).toBe(expectedResult);
  });

  test('Validate mappings with negation', () => {
    const { hint, result } = validateMappings(constructEntry('A'), constructEntry('⊨'), constructEntry('¬B'), firstProposition, {});

    const expectedHint = 'Your mappings are wrong!';
    const expectedResult = false;

    expect(hint).toBe(expectedHint);
    expect(result).toBe(expectedResult);
  });

  test('Validate correct mappings', () => {
    const { hint, result } = validateMappings(constructEntry('A'), constructEntry('⊨'), constructEntry('B'), firstProposition, {});
    expect(result).toBe(true);
  });

  test('Validate each proposition', () => {
    let curMappingTable = {};
    const entries = [['A', 'B'], ['C', 'A'], ['C', 'B']];

    barbaraPropositions.forEach((prop, idx) => {
      const entriesForProp = entries[idx];
      const { hint, result, updatedMappingTable } =
        validateMappings(
          constructEntry(entriesForProp[0]),
          constructEntry('⊨'),
          constructEntry(entriesForProp[1]),
          prop,
          curMappingTable,
        );
      expect(result).toBe(true);
      curMappingTable = updatedMappingTable;
    });
  })
});

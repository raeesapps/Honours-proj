import { Premise, forms } from './premise';
import Table from './table';

const {
  ALL_A_IS_B,
} = forms;

test('Premise form is `All_A s B`', () => {
  const premise = new Premise(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });
  expect(premise.form).toBe(ALL_A_IS_B);
});

test('First term of premise is `a` and second term of premise is `b`', () => {
  const premise = new Premise(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

  const { firstTerm, secondTerm } = premise.terms;

  const expectedFirstTerm = 'a';
  const expectedSecondTerm = 'b';

  expect(firstTerm).toBe(expectedFirstTerm);
  expect(secondTerm).toBe(expectedSecondTerm);
});

describe('Fill table tests', () => {
  const terms = ['a', 'b'];
  let table;

  beforeEach(() => {
    table = new Table(terms);
  });

  test('Adding an `ALL_A_IS_B` premise to table results in table being filled in correctly', () => {
    const {
      ALL_A_IS_B,
    } = forms;
    const premise = new Premise(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    table.addPremise(premise);

    const compartments = table.getCompartments();
    const compartmentDictionary = table.getTableDictionary().get(premise);

    compartments.forEach((compartment) => {
      const truths = compartment.getTruths();
      const entry = compartmentDictionary.get(compartment);

      if (truths['a'] && !truths['b']) {
        expect(entry).toBe('e');
      } else {
        expect(entry).toBe(null);
      }
    });
  });

  test('Adding a `NO_A_IS_B` premise to table results in table being filled in correctly', () => {
    const {
      NO_A_IS_B,
    } = forms;
    const premise = new Premise(NO_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    table.addPremise(premise);

    const compartments = table.getCompartments();
    const compartmentDictionary = table.getTableDictionary().get(premise);

    compartments.forEach((compartment) => {
      const truths = compartment.getTruths();
      const entry = compartmentDictionary.get(compartment);

      if (truths['a'] && truths['b']) {
        expect(entry).toBe('e');
      } else {
        expect(entry).toBe(null);
      }
    });
  });

  test('Adding an `SOME_A_IS_B` premise to table results in table being filled in correctly', () => {
    const {
      SOME_A_IS_B,
    } = forms;
    const premise = new Premise(SOME_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    table.addPremise(premise);

    const compartments = table.getCompartments();
    const compartmentDictionary = table.getTableDictionary().get(premise);

    compartments.forEach((compartment) => {
      const truths = compartment.getTruths();
      const entry = compartmentDictionary.get(compartment);

      if (truths['a'] && !truths['b']) {
        expect(entry).toBe('x_1');
      } else {
        expect(entry).toBe(null);
      }
    });
  });

  test('Adding a `SOME_A_IS_NOT_B` premise to table results in table being filled in correctly', () => {
    const {
      SOME_A_IS_NOT_B,
    } = forms;
    const premise = new Premise(SOME_A_IS_NOT_B, { firstTerm: 'a', secondTerm: 'b' });

    table.addPremise(premise);

    const compartments = table.getCompartments();
    const compartmentDictionary = table.getTableDictionary().get(premise);

    compartments.forEach((compartment) => {
      const truths = compartment.getTruths();
      const entry = compartmentDictionary.get(compartment);

      if (truths.a && truths.b) {
        expect(entry).toBe('x_1');
      } else {
        expect(entry).toBe(null);
      }
    });
  });
});

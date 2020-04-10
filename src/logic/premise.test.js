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

describe('Proposition characteristic tests', () => {
  const terms = ['a', 'b'];
  let table;

  beforeEach(() => {
    table = new Table(terms);
  });

  describe('A code tests', () => {
    const {
      ALL_A_IS_B,
    } = forms;
    const premise = new Premise(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    test('Adding an A code proposition results in table column being filled in correctly', () => {
      table.addPremise(premise);

      const compartments = table.getCompartments();
      const compartmentDictionary = table.getTableDictionary().get(premise);

      compartments.forEach((compartment) => {
        const truths = compartment.getTruths();
        const entry = compartmentDictionary.get(compartment);

        if (truths.a && !truths.b) {
          expect(entry).toBe('e');
        } else {
          expect(entry).toBe(null);
        }
      });
    });

    test('A code proposition sentence is correct', () => {
      const expectedSentence = 'All a are b';
      const actualSentence = premise.toSentence();
      expect(actualSentence).toBe(expectedSentence);
    });

    test('A code proposition standard form is correct', () => {
      const expectedStandardForm = 'a ⊨ b';
      const actualStandardForm = premise.toSymbolicForm();
      expect(actualStandardForm).toBe(expectedStandardForm);
    });

    test('A code proposition standard form is correct with different subject and predicate', () => {
      const expectedStandardFormWithDifferentSubjectAndPredicate = 'c ⊨ d';
      const actualStandardFormWithDifferentSubjectAndPredicate = premise.toSymbolicForm('c', 'd');
      expect(actualStandardFormWithDifferentSubjectAndPredicate).toBe(expectedStandardFormWithDifferentSubjectAndPredicate);
    });
  });

  //Adding an E code proposition results in table column being filled in correctly
  describe('E code tests', () => {
    const {
      NO_A_IS_B,
    } = forms;
    const premise = new Premise(NO_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    test('Adding an E code proposition results in table column being filled in correctly', () => {
      table.addPremise(premise);

      const compartments = table.getCompartments();
      const compartmentDictionary = table.getTableDictionary().get(premise);

      compartments.forEach((compartment) => {
        const truths = compartment.getTruths();
        const entry = compartmentDictionary.get(compartment);

        if (truths.a && truths.b) {
          expect(entry).toBe('e');
        } else {
          expect(entry).toBe(null);
        }
      });
    });

    test('E code proposition standard form is correct', () => {
      const expectedSentence = 'No a are b';
      const actualSentence = premise.toSentence();
      expect(actualSentence).toBe(expectedSentence);
    });

    test('E code proposition standard form is correct', () => {
      const expectedStandardForm = 'a ⊨ ¬b';
      const actualStandardForm = premise.toSymbolicForm();
      expect(actualStandardForm).toBe(expectedStandardForm);
    });
  });

  describe('I code tests', () => {
    const {
      SOME_A_IS_B,
    } = forms;
    const premise = new Premise(SOME_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    test('Adding an I code proposition results in table column being filled in correctly', () => {
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

    test('I code proposition standard form is correct', () => {
      const expectedSentence = 'Some a are b';
      const actualSentence = premise.toSentence();
      expect(actualSentence).toBe(expectedSentence);
    });

    test('I code proposition standard form is correct', () => {
      const expectedStandardForm = 'a ⊯ ¬b';
      const actualStandardForm = premise.toSymbolicForm();
      expect(actualStandardForm).toBe(expectedStandardForm);
    });
  });

  describe('O code tests', () => {
    const {
      SOME_A_IS_NOT_B,
    } = forms;
    const premise = new Premise(SOME_A_IS_NOT_B, { firstTerm: 'a', secondTerm: 'b' });

    test('Adding an O code proposition results in the table column being filled in correctly', () => {
      table.addPremise(premise);

      const compartments = table.getCompartments();
      const compartmentDictionary = table.getTableDictionary().get(premise);

      compartments.forEach((compartment) => {
        const truths = compartment.getTruths();
        const entry = compartmentDictionary.get(compartment);

        if (truths.a && !truths.b) {
          expect(entry).toBe('x_1');
        } else {
          expect(entry).toBe(null);
        }
      });
    });

    test('O code proposition standard form is correct', () => {
      const expectedSentence = 'Some a are not b';
      const actualSentence = premise.toSentence();
      expect(actualSentence).toBe(expectedSentence);
    });

    test('O code proposition standard form is correct', () => {
      const expectedStandardForm = 'a ⊯ b';
      const actualStandardForm = premise.toSymbolicForm();
      expect(actualStandardForm).toBe(expectedStandardForm);
    });
  });

  test('Adding a `SOME_A_EXIST` results in table column being filled in correctly', () => {
    const {
      SOME_A_EXIST,
    } = forms;
    const premise = new Premise(SOME_A_EXIST, { firstTerm: 'a' });

    table.addPremise(premise);

    const compartments = table.getCompartments();
    const compartmentDictionary = table.getTableDictionary().get(premise);

    compartments.forEach((compartment) => {
      const truths = compartment.getTruths();
      const entry = compartmentDictionary.get(compartment);

      if (truths.a) {
        expect(entry).toBe('x_1');
      } else {
        expect(entry).toBe(null);
      }
    });
  });
});

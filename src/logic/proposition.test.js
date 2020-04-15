import { Proposition, forms } from './proposition';
import Table from './table';

const {
  ALL_A_IS_B,
} = forms;

test('Proposition form is `All_A s B`', () => {
  const proposition = new Proposition(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });
  expect(proposition.form).toBe(ALL_A_IS_B);
});

test('First term of proposition is `a` and second term of proposition is `b`', () => {
  const proposition = new Proposition(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

  const { firstTerm, secondTerm } = proposition.terms;

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
    const proposition = new Proposition(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    test('Adding an A code proposition results in table column being filled in correctly', () => {
      table.addProposition(proposition);

      const compartments = table.getCompartments();
      const compartmentDictionary = table.getTableDictionary().get(proposition);

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
      const actualSentence = proposition.toSentence();
      expect(actualSentence).toBe(expectedSentence);
    });

    test('A code proposition standard form is correct', () => {
      const expectedStandardForm = 'a ⊨ b';
      const actualStandardForm = proposition.toSymbolicForm();
      expect(actualStandardForm).toBe(expectedStandardForm);
    });

    test('A code proposition standard form is correct with different subject and predicate', () => {
      const expectedStandardFormWithDifferentSubjectAndPredicate = 'c ⊨ d';
      const actualStandardFormWithDifferentSubjectAndPredicate = proposition.toSymbolicForm('c', 'd');
      expect(actualStandardFormWithDifferentSubjectAndPredicate).toBe(expectedStandardFormWithDifferentSubjectAndPredicate);
    });
  });

  //Adding an E code proposition results in table column being filled in correctly
  describe('E code tests', () => {
    const {
      NO_A_IS_B,
    } = forms;
    const proposition = new Proposition(NO_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    test('Adding an E code proposition results in table column being filled in correctly', () => {
      table.addProposition(proposition);

      const compartments = table.getCompartments();
      const compartmentDictionary = table.getTableDictionary().get(proposition);

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
      const actualSentence = proposition.toSentence();
      expect(actualSentence).toBe(expectedSentence);
    });

    test('E code proposition standard form is correct', () => {
      const expectedStandardForm = 'a ⊨ ¬b';
      const actualStandardForm = proposition.toSymbolicForm();
      expect(actualStandardForm).toBe(expectedStandardForm);
    });
  });

  describe('I code tests', () => {
    const {
      SOME_A_IS_B,
    } = forms;
    const proposition = new Proposition(SOME_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

    test('Adding an I code proposition results in table column being filled in correctly', () => {
      table.addProposition(proposition);

      const compartments = table.getCompartments();
      const compartmentDictionary = table.getTableDictionary().get(proposition);

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
      const actualSentence = proposition.toSentence();
      expect(actualSentence).toBe(expectedSentence);
    });

    test('I code proposition standard form is correct', () => {
      const expectedStandardForm = 'a ⊯ ¬b';
      const actualStandardForm = proposition.toSymbolicForm();
      expect(actualStandardForm).toBe(expectedStandardForm);
    });
  });

  describe('O code tests', () => {
    const {
      SOME_A_IS_NOT_B,
    } = forms;
    const proposition = new Proposition(SOME_A_IS_NOT_B, { firstTerm: 'a', secondTerm: 'b' });

    test('Adding an O code proposition results in the table column being filled in correctly', () => {
      table.addProposition(proposition);

      const compartments = table.getCompartments();
      const compartmentDictionary = table.getTableDictionary().get(proposition);

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
      const actualSentence = proposition.toSentence();
      expect(actualSentence).toBe(expectedSentence);
    });

    test('O code proposition standard form is correct', () => {
      const expectedStandardForm = 'a ⊯ b';
      const actualStandardForm = proposition.toSymbolicForm();
      expect(actualStandardForm).toBe(expectedStandardForm);
    });
  });

  test('Adding a `SOME_A_EXIST` results in table column being filled in correctly', () => {
    const {
      SOME_A_EXIST,
    } = forms;
    const proposition = new Proposition(SOME_A_EXIST, { firstTerm: 'a' });

    table.addProposition(proposition);

    const compartments = table.getCompartments();
    const compartmentDictionary = table.getTableDictionary().get(proposition);

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

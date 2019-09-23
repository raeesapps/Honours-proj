import {
  ALL_A_IS_B,
} from './forms';

import Premise from './premise';

const premise = new Premise(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

test('Premise form is `All A is B`', () => {
  expect(premise.form).toBe(ALL_A_IS_B);
});

test('First term of premise is `a` and second term of premise is `b`', () => {
  const { firstTerm, secondTerm } = premise.terms;

  const expectedFirstTerm = 'a';
  const expectedSecondTerm = 'b';

  expect(firstTerm).toBe(expectedFirstTerm);
  expect(secondTerm).toBe(expectedSecondTerm);
});

test('Set representation of premise is correct', () => {
  const expectedA = [0];
  const expectedB = [0, 1];

  let actualA = new Set();
  let actualB = new Set();

  premise.copyToSet(actualA, actualB);
  actualA = [...actualA];
  actualB = [...actualB];

  expect(actualA).toEqual(expectedA);
  expect(actualB).toEqual(expectedB);
});

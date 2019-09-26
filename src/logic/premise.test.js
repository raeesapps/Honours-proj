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

import {
  M_P_S_M,
  P_M_S_M,
  M_P_M_S,
  P_M_M_S,
} from './figure';
import {
  ALL_A_IS_B,
  SOME_A_IS_B,
  SOME_A_IS_NOT_B,
  NO_A_IS_B,
} from './forms';
import Pair from './pair';
import Premise from './premise';

const allMenAreMortalPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Men', secondTerm: 'Mortal' });
const allGreeksAreMenPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Greeks', secondTerm: 'Mortal' });
const relationship = M_P_S_M;
const pair = new Pair({
  firstPremise: allMenAreMortalPremise,
  secondPremise: allGreeksAreMenPremise,
}, relationship);

test('Pair has correct premises', () => {
  const { firstPremise, secondPremise } = pair.premises;
  const expectedFirstPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Men', secondTerm: 'Mortal' });
  const expectedSecondPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Greeks', secondTerm: 'Mortal' });

  expect(firstPremise.toString()).toEqual(expectedFirstPremise.toString());
  expect(secondPremise.toString()).toEqual(expectedSecondPremise.toString());
});

test('Pair has correct relationship', () => {
  const expectedRelationship = M_P_S_M;
  const actualRelationship = pair.relationship;
  expect(expectedRelationship).toBe(actualRelationship);
});

test('Pair has correct set representation', () => {
  const expectedMSet = [0];
  const expectedPSet = []
});
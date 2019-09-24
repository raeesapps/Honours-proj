import {
  M_P_S_M,
} from './figure';
import {
  ALL_A_IS_B,
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

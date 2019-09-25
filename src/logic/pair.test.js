import {
  M_P_S_M,
} from './figure';
import {
  ALL_A_IS_B,
} from './forms';
import Logic from './logic';
import Pair from './pair';
import Premise from './premise';
import {
  threeSetRegions
} from './regions';

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

test('Pair is equivalent to BARBARA', () => {
  const {
    M,
    S,
    P,
    M_AND_S,
    M_AND_P,
    S_AND_P,
    M_AND_S_AND_P,
  } = threeSetRegions;
  const expectedRegions = JSON.stringify({
    [M]: Logic.false(),
    [S]: Logic.false(),
    [P]: Logic.true(),
    [M_AND_S]: Logic.false(),
    [M_AND_P]: Logic.true(),
    [S_AND_P]: Logic.false(),
    [M_AND_S_AND_P]: Logic.true(),
  });
  const actualRegion = JSON.stringify(pair.mergeSets());
  expect(actualRegion).toBe(expectedRegions);
});

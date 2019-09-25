import figure from './figure';
import forms from './forms';
import Logic from './logic';
import Pair from './pair';
import Premise from './premise';
import {
  threeSetRegions
} from './regions';

const {
  ALL_A_IS_B,
  NO_A_IS_B,
} = forms;

const {
  M_P_S_M
} = figure;

describe('BARBARA setup', () => {
  const allMenAreMortalPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Men', secondTerm: 'Mortal' });
  const allGreeksAreMenPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Greeks', secondTerm: 'Mortal' });
  const pair = new Pair({
    firstPremise: allMenAreMortalPremise,
    secondPremise: allGreeksAreMenPremise,
  }, M_P_S_M);

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
    const actualRegions = JSON.stringify(pair.mergeSets());
    expect(actualRegions).toBe(expectedRegions);
  });
});

describe('CELARENT SETUP', () => {
  const noReptilesHaveFurPremise = new Premise(NO_A_IS_B, { firstTerm: 'reptiles', secondTerm: 'greeks' });
  const allSnakesAreReptilesPremise = new Premise(ALL_A_IS_B, { firstTerm: 'snakes', secondTerm: 'reptiles' });
  const pair = new Pair({
    firstPremise: noReptilesHaveFurPremise,
    secondPremise: allSnakesAreReptilesPremise,
  }, M_P_S_M);

  test('Pair is equivalent to CELARENT', () => {
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
      [M]: Logic.true(),
      [S]: Logic.false(),
      [P]: Logic.true(),
      [M_AND_S]: Logic.true(),
      [M_AND_P]: Logic.false(),
      [S_AND_P]: Logic.false(),
      [M_AND_S_AND_P]: Logic.false(),
    });
    const actualRegions = JSON.stringify(pair.mergeSets());
    expect(actualRegions).toBe(expectedRegions);
  });
});

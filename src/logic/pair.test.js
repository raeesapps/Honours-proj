import forms from './forms';
import Premise from './premise';
import Premises from './premises';

const {
  ALL_A_IS_B,
  NO_A_IS_B,
  SOME_A_IS_NOT_B,
} = forms;

test('test', () => {
  const allMenAreMortalPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Men', secondTerm: 'Mortal' });
  const allGreeksAreMenPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Greeks', secondTerm: 'Men' });
  const pair = new Premises([allMenAreMortalPremise, allGreeksAreMenPremise]);
  const table = pair.formTable();
  pair.fillInTable(table);
  //console.log(JSON.stringify(table, null, 2));
  const resolvedColumn = pair.unifyAndResolve(table);
  console.log(JSON.stringify(resolvedColumn, null, 2));
});

/*describe('BARBARA setup', () => {
  const allMenAreMortalPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Men', secondTerm: 'Mortal' });
  const allGreeksAreMenPremise = new Premise(ALL_A_IS_B, { firstTerm: 'Greeks', secondTerm: 'Men' });
  const pair = new Pair({
    firstPremise: allMenAreMortalPremise,
    secondPremise: allGreeksAreMenPremise,
  });

  test('Pair is equivalent to BARBARA', () => {
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
  });

  test('Pair is equivalent to CELARENT', () => {
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

describe('BAROCO setup', () => {
  const allInformativeThingsAreUsefulPremise = new Premise(ALL_A_IS_B, {
    firstTerm: 'informative things',
    secondTerm: 'useful',
  });
  const someWebsitesAreNotUsefulPremise = new Premise(SOME_A_IS_NOT_B, {
    firstTerm: 'websites',
    secondTerm: 'useful',
  });
  const pair = new Pair({
    firstPremise: allInformativeThingsAreUsefulPremise,
    secondPremise: someWebsitesAreNotUsefulPremise,
  });

  test('Pair is equivalent to BAROCO', () => {
    const expectedRegions = JSON.stringify({
      [M]: Logic.true(),
      [S]: Logic.indeterminate(),
      [P]: Logic.false(),
      [M_AND_S]: Logic.true(),
      [M_AND_P]: Logic.true(),
      [S_AND_P]: Logic.false(),
      [M_AND_S_AND_P]: Logic.true(),
    });
    const actualRegion = JSON.stringify(pair.mergeSets());
    expect(actualRegion).toBe(expectedRegions);
  });
});

describe('BOCARDO setup', () => {
  const someCatsHaveNoTailsPremise = new Premise(SOME_A_IS_NOT_B, {
    firstTerm: 'cats',
    secondTerm: 'tails',
  });
  const allCatsAreMammals = new Premise(ALL_A_IS_B, {
    firstTerm: 'cats',
    secondTerm: 'mammals',
  });
  const pair = new Pair({
    firstPremise: someCatsHaveNoTailsPremise,
    secondPremise: allCatsAreMammals,
  });
  test('Pair is equivalent to BOCARDO', () => {
    const expectedRegions = JSON.stringify({
      [M]: Logic.false(),
      [S]: Logic.true(),
      [P]: Logic.true(),
      [M_AND_P]: Logic.false(),
      [M_AND_S]: Logic.indeterminate(),
      [S_AND_P]: Logic.true(),
      [M_AND_S_AND_P]: Logic.true(),
    });
    const actualRegions = JSON.stringify(pair.mergeSets());
    expect(actualRegions).toBe(expectedRegions);
  });
});

describe('CALEMES setup', () => {
  const allInformativeThingsAreUsefulPremise = new Premise(ALL_A_IS_B, {
    firstTerm: 'informative things',
    secondTerm: 'useful',
  });
  const noUsefulThingIsUselessPremise = new Premise(NO_A_IS_B, {
    firstTerm: 'useful',
    secondTerm: 'useless',
  });
  const pair = new Pair({
    firstPremise: allInformativeThingsAreUsefulPremise,
    secondPremise: noUsefulThingIsUselessPremise,
  });
  test('Pair is equivalent to CALEMES', () => {
    const expectedRegions = JSON.stringify({
      [M]: Logic.true(),
      [S]: Logic.true(),
      [P]: Logic.false(),
      [M_AND_S]: Logic.false(),
      [M_AND_P]: Logic.true(),
      [S_AND_P]: Logic.false(),
      [M_AND_S_AND_P]: Logic.false(),
    });
    const actualRegions = JSON.stringify(pair.mergeSets());
    expect(actualRegions).toBe(expectedRegions);
  });
});*/

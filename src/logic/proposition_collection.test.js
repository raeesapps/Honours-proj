import { Proposition, forms } from './proposition';
import PropositionCollection from './proposition_collection';
import Compartment from './compartment';

const {
  ALL_A_IS_B,
  NO_A_IS_B,
  SOME_A_IS_NOT_B,
  SOME_A_IS_B,
  SOME_A_EXIST,
} = forms;

describe('BARBARA tests', () => {
  const a = 'Men';
  const b = 'Mortal';
  const c = 'Greeks';
  let argument;

  beforeEach(() => {
    const allMenAreMortalProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${b}`,
    });
    const allGreeksAreMenProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${a}`,
    });
    argument = new PropositionCollection([allMenAreMortalProposition, allGreeksAreMenProposition]);
  });

  test('BARBARA propositions represented correctly', () => {
    const compartmentHashes = [
      new Compartment({ [a]: false, [b]: false, [c]: false }),
      new Compartment({ [a]: false, [b]: false, [c]: true }),
      new Compartment({ [a]: false, [b]: true, [c]: false }),
      new Compartment({ [a]: false, [b]: true, [c]: true }),
      new Compartment({ [a]: true, [b]: false, [c]: false }),
      new Compartment({ [a]: true, [b]: false, [c]: true }),
      new Compartment({ [a]: true, [b]: true, [c]: false }),
      new Compartment({ [a]: true, [b]: true, [c]: true }),
    ].map((compartment) => compartment.hashCode());

    const propositionResolutionColumn = argument.unifyAndResolve();

    const firstCompartmentHash = compartmentHashes[1];
    const firstCompartmentEntries = JSON.stringify(propositionResolutionColumn[firstCompartmentHash]);
    const firstCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(firstCompartmentEntries).toContain(firstCompartmentExpectedEntries);

    const thirdCompartmentHash = compartmentHashes[3];
    const thirdCompartmentEntries = JSON.stringify(propositionResolutionColumn[thirdCompartmentHash]);
    const thirdCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(thirdCompartmentEntries).toBe(thirdCompartmentExpectedEntries);

    const fourthCompartmentHash = compartmentHashes[4];
    const fourthCompartmentEntries = JSON.stringify(propositionResolutionColumn[fourthCompartmentHash]);
    const fourthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fourthCompartmentEntries).toBe(fourthCompartmentExpectedEntries);

    const fifthCompartmentHash = compartmentHashes[5];
    const fifthCompartmentEntries = JSON.stringify(propositionResolutionColumn[fifthCompartmentHash]);
    const fifthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fifthCompartmentEntries).toBe(fifthCompartmentExpectedEntries);
  });

  test('All greeks are mortal conclusion true', () => {
    const allGreeksAreMortalProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(allGreeksAreMortalProposition);
    argument.argue2(allGreeksAreMortalProposition);
    argument.getVennDiagramParts();
    expect(valid).toBe(true);
  });

  test('BARBARA reduces correctly', () => {
    const { mappedTableUnified } = argument.map([c, b]);
    const expectedReducedTableUnified = '{"bf38a1380d12d01fa9687b1fe40ab9610c85c7cc":[],"95c3c9836888fb58d400fa529d53561310516a16":[],"86fae88b9bb213eef30124b71efad707f0e882c2":["e"],"57cc6d87a4034ac07634b223d6732782436e62a1":[]}';
    expect(JSON.stringify(mappedTableUnified)).toBe(expectedReducedTableUnified);
  });

  test('No greeks are mortal conclusion false', () => {
    const noGreeksAreMortalProposition = new Proposition(NO_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(noGreeksAreMortalProposition);
    expect(valid).toBe(false);
  });

  test('Some greeks are mortal conclusion false', () => {
    const someGreeksAreMortalProposition = new Proposition(SOME_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(someGreeksAreMortalProposition);
    expect(valid).toBe(false);
  });
});

describe('BAROCO tests', () => {
  const a = 'Informative things';
  const b = 'Useful';
  const c = 'Websites';
  let argument;

  beforeEach(() => {
    const allInformativeThingsAreUsefulProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${b}`,
    });
    const someWebsitesAreNotUsefulProposition = new Proposition(SOME_A_IS_NOT_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });
    argument = new PropositionCollection([allInformativeThingsAreUsefulProposition, someWebsitesAreNotUsefulProposition]);
  });

  test('BAROCO propositions represented correctly', () => {
    const compartmentHashes = [
      new Compartment({ [a]: false, [b]: false, [c]: false }),
      new Compartment({ [a]: false, [b]: false, [c]: true }),
      new Compartment({ [a]: false, [b]: true, [c]: false }),
      new Compartment({ [a]: false, [b]: true, [c]: true }),
      new Compartment({ [a]: true, [b]: false, [c]: false }),
      new Compartment({ [a]: true, [b]: false, [c]: true }),
      new Compartment({ [a]: true, [b]: true, [c]: false }),
      new Compartment({ [a]: true, [b]: true, [c]: true }),
    ].map((compartment) => compartment.hashCode());

    const propositionResolutionColumn = argument.unifyAndResolve();

    const secondCompartmentHash = compartmentHashes[1];
    const secondCompartmentEntries = JSON.stringify(propositionResolutionColumn[secondCompartmentHash]);
    const secondCompartmentExpectedEntries = JSON.stringify(['x_1']);
    expect(secondCompartmentEntries).toContain(secondCompartmentExpectedEntries);

    const fifthCompartmentHash = compartmentHashes[4];
    const fifthCompartmentEntries = JSON.stringify(propositionResolutionColumn[fifthCompartmentHash]);
    const fifthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fifthCompartmentEntries).toBe(fifthCompartmentExpectedEntries);

    const sixthCompartmentHash = compartmentHashes[5];
    const sixthCompartmentEntries = JSON.stringify(propositionResolutionColumn[sixthCompartmentHash]);
    const sixthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(sixthCompartmentEntries).toBe(sixthCompartmentExpectedEntries);

  });

  test('Some websites are not informative conclusion true', () => {
    const someWebsitesAreNotUseful = new Proposition(SOME_A_IS_NOT_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(someWebsitesAreNotUseful);
    expect(valid).toBe(true);
  });

  test('BAROCO reduces correctly', () => {
    const { mappedTableUnified } = argument.map([c, b]);
    const expectedReducedTableUnified = '{"ff4c837315bb87b0c161002890f7718a7fcdc72c":[],"31cc6e1dcf1dc58f4bace9146f3784acac480fbf":[],"5c70e97def1dd2783e94efb118fd8c48d398b83f":["x_1"],"9502c018821cf908503eb12bea5378e6f44605c5":[]}';
    expect(JSON.stringify(mappedTableUnified)).toBe(expectedReducedTableUnified);
  });

  test('Some websites are useful conclusion false', () => {
    const someWebsitesAreUsefulProposition = new Proposition(SOME_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(someWebsitesAreUsefulProposition);
    expect(valid).toBe(false);
  });

  test('No informative things are useful conclusion false', () => {
    const noInformativeThingsAreUsefulProposition = new Proposition(NO_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(noInformativeThingsAreUsefulProposition);
    expect(valid).toBe(false);
  });

  test('No websites are useful conclusion false', () => {
    const noWebsitesAreUsefulProposition = new Proposition(NO_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(noWebsitesAreUsefulProposition);
    expect(valid).toBe(false);
  });
});

describe('BARBARI tests', () => {
  const a = 'Men';
  const b = 'Mortal';
  const c = 'Greeks';
  let argument;

  beforeEach(() => {
    const allMenAreMortalProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${b}`,
    });
    const allGreeksAreMenProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${a}`,
    });
    const someGreeksExist = new Proposition(SOME_A_EXIST, {
      firstTerm: `${c}`,
    });
    argument = new PropositionCollection([allMenAreMortalProposition, allGreeksAreMenProposition, someGreeksExist]);
  });

  test('BARBARI propositions represented correctly', () => {
    const compartmentHashes = [
      new Compartment({ [a]: false, [b]: false, [c]: false }),
      new Compartment({ [a]: false, [b]: false, [c]: true }),
      new Compartment({ [a]: false, [b]: true, [c]: false }),
      new Compartment({ [a]: false, [b]: true, [c]: true }),
      new Compartment({ [a]: true, [b]: false, [c]: false }),
      new Compartment({ [a]: true, [b]: false, [c]: true }),
      new Compartment({ [a]: true, [b]: true, [c]: false }),
      new Compartment({ [a]: true, [b]: true, [c]: true }),
    ].map((compartment) => compartment.hashCode());

    const propositionResolutionColumn = argument.unifyAndResolve();

    const firstCompartmentHash = compartmentHashes[1];
    const firstCompartmentEntries = JSON.stringify(propositionResolutionColumn[firstCompartmentHash]);
    const firstCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(firstCompartmentEntries).toContain(firstCompartmentExpectedEntries);

    const thirdCompartmentHash = compartmentHashes[3];
    const thirdCompartmentEntries = JSON.stringify(propositionResolutionColumn[thirdCompartmentHash]);
    const thirdCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(thirdCompartmentEntries).toBe(thirdCompartmentExpectedEntries);

    const fourthCompartmentHash = compartmentHashes[4];
    const fourthCompartmentEntries = JSON.stringify(propositionResolutionColumn[fourthCompartmentHash]);
    const fourthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fourthCompartmentEntries).toBe(fourthCompartmentExpectedEntries);

    const fifthCompartmentHash = compartmentHashes[5];
    const fifthCompartmentEntries = JSON.stringify(propositionResolutionColumn[fifthCompartmentHash]);
    const fifthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fifthCompartmentEntries).toBe(fifthCompartmentExpectedEntries);

    const eighthCompartmentHash = compartmentHashes[7];
    const eighthCompartmentEntries = JSON.stringify(propositionResolutionColumn[eighthCompartmentHash]);
    const eighthCompartmentExpectedEntries = JSON.stringify(['x_1']);
    expect(eighthCompartmentEntries).toBe(eighthCompartmentExpectedEntries);
  });

  test('Some greeks are mortal conclusion true', () => {
    const someGreeksAreMortalProposition = new Proposition(SOME_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(someGreeksAreMortalProposition);
    expect(valid).toBe(true);
  });

  test('Some greeks are men conclusion true', () => {
    const someGreeksAreMenProposition = new Proposition(SOME_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${a}`,
    });

    const valid = argument.argue(someGreeksAreMenProposition);
    expect(valid).toBe(true);
  });

  test('No greeks are men conclusion false', () => {
    const noGreeksAreMenProposition = new Proposition(NO_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${a}`,
    });

    const valid = argument.argue(noGreeksAreMenProposition);
    expect(valid).toBe(false);
  });
});

describe('Sorites test', () => {
  const a = 'lions';
  const b = 'big cats';
  const c = 'predators';
  const d = 'carnivores';
  let argument;

  beforeEach(() => {
    const allLionsAreBigCatsProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${b}`,
    });
    const allBigCatsArePredators = new Proposition(ALL_A_IS_B, {
      firstTerm: `${b}`,
      secondTerm: `${c}`,
    });
    const allPredatorsAreCarnivores = new Proposition(ALL_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${d}`,
    });
    argument = new PropositionCollection([allLionsAreBigCatsProposition, allBigCatsArePredators, allPredatorsAreCarnivores]);
  });

  test('Sorites reduces correctly', () => {
    const { mappedTableUnified } = argument.map([c, d]);
    const expectedReducedTableUnified = '{"463803a94735ef99c458235f1dd3b14fdab3c5d4":[],"7083c6b1f6b2b5c3398ded2de0b29b74f3ddd792":[],"ad38d618d8ffe48c38f8d16ef6af7620d58159e7":["e"],"85d933b937831171d6b5bdbecdd170e4ee339cd6":[]}';
    expect(JSON.stringify(mappedTableUnified)).toBe(expectedReducedTableUnified);
  });

  test('All lions are carnivores is valid', () => {
    const allLionsAreCarnivoresProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${d}`,
    });
    const valid = argument.argue(allLionsAreCarnivoresProposition);
    expect(valid).toBe(true);
  });

  test('All big cats are lions is invalid', () => {
    const allBigCatsAreLionsProposition = new Proposition(ALL_A_IS_B, {
      firstTerm: `${b}`,
      secodnTerm: `${a}`,
    });
    const valid = argument.argue(allBigCatsAreLionsProposition);
    expect(valid).toBe(false);
  });
});

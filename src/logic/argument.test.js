import { Premise, forms } from './premise';
import Argument from './argument';
import Compartment from './compartment';

const {
  ALL_A_IS_B,
  NO_A_IS_B,
  SOME_A_IS_NOT_B,
  SOME_A_IS_B,
} = forms;

describe('BARBARA tests', () => {
  const a = 'Mena';
  const b = 'Mortala';
  const c = 'Greeksa';
  let argument;

  beforeEach(() => {
    const allMenAreMortalPremise = new Premise(ALL_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${b}`,
    });
    const allGreeksAreMenPremise = new Premise(ALL_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${a}`,
    });
    argument = new Argument([allMenAreMortalPremise, allGreeksAreMenPremise]);
  });

  test('BARBARA premises represented correctly', () => {
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

    const premiseResolutionColumn = argument.unifyAndResolve();

    const firstCompartmentHash = compartmentHashes[1];
    const firstCompartmentEntries = JSON.stringify(premiseResolutionColumn[firstCompartmentHash]);
    const firstCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(firstCompartmentEntries).toContain(firstCompartmentExpectedEntries);

    const thirdCompartmentHash = compartmentHashes[3];
    const thirdCompartmentEntries = JSON.stringify(premiseResolutionColumn[thirdCompartmentHash]);
    const thirdCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(thirdCompartmentEntries).toBe(thirdCompartmentExpectedEntries);

    const fourthCompartmentHash = compartmentHashes[4];
    const fourthCompartmentEntries = JSON.stringify(premiseResolutionColumn[fourthCompartmentHash]);
    const fourthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fourthCompartmentEntries).toBe(fourthCompartmentExpectedEntries);

    const fifthCompartmentHash = compartmentHashes[5];
    const fifthCompartmentEntries = JSON.stringify(premiseResolutionColumn[fifthCompartmentHash]);
    const fifthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fifthCompartmentEntries).toBe(fifthCompartmentExpectedEntries);
  });

  test('All greeks are mortal conclusion true', () => {
    const allGreeksAreMortalPremise = new Premise(ALL_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(allGreeksAreMortalPremise);
    expect(valid).toBe(true);
  });

  test('No greeks are mortal conclusion false', () => {
    const noGreeksAreMortalPremise = new Premise(NO_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(noGreeksAreMortalPremise);
    expect(valid).toBe(false);
  });

  test('Some greeks are mortal conclusion false', () => {
    const someGreeksAreMortalPremise = new Premise(SOME_A_IS_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(someGreeksAreMortalPremise);
    expect(valid).toBe(false);

  });
});

describe('BAROCO premises represented correctly', () => {
  const a = 'Informative things';
  const b = 'Useful';
  const c = 'Websites';
  let argument;

  beforeEach(() => {
    const allInformativeThingsAreUsefulPremise = new Premise(ALL_A_IS_B, {
      firstTerm: `${a}`,
      secondTerm: `${b}`,
    });
    const someWebsitesAreNotUsefulPremise = new Premise(SOME_A_IS_NOT_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });
    argument = new Argument([allInformativeThingsAreUsefulPremise, someWebsitesAreNotUsefulPremise]);
  });

  test('BAROCO premises represented correctly', () => {
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

    const premiseResolutionColumn = argument.unifyAndResolve();

    const seventhCompartmentHash = compartmentHashes[7];
    const seventhCompartmentEntries = JSON.stringify(premiseResolutionColumn[seventhCompartmentHash]);
    const seventhCompartmentExpectedEntries = JSON.stringify(['x_2']);
    expect(seventhCompartmentEntries).toContain(seventhCompartmentExpectedEntries);

    const thirdCompartmentHash = compartmentHashes[3];
    const thirdCompartmentEntries = JSON.stringify(premiseResolutionColumn[thirdCompartmentHash]);
    const thirdCompartmentExpectedEntries = JSON.stringify(['x_2']);
    expect(thirdCompartmentEntries).toBe(thirdCompartmentExpectedEntries);

    const fourthCompartmentHash = compartmentHashes[4];
    const fourthCompartmentEntries = JSON.stringify(premiseResolutionColumn[fourthCompartmentHash]);
    const fourthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fourthCompartmentEntries).toBe(fourthCompartmentExpectedEntries);

    const fifthCompartmentHash = compartmentHashes[5];
    const fifthCompartmentEntries = JSON.stringify(premiseResolutionColumn[fifthCompartmentHash]);
    const fifthCompartmentExpectedEntries = JSON.stringify(['e']);
    expect(fifthCompartmentEntries).toBe(fifthCompartmentExpectedEntries);
  });

  test('Some websites are not informative conclusion true', () => {
    const someWebsitesAreNotUseful = new Premise(SOME_A_IS_NOT_B, {
      firstTerm: `${c}`,
      secondTerm: `${b}`,
    });

    const valid = argument.argue(someWebsitesAreNotUseful);
    expect(valid).toBe(true);
  });
});

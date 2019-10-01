import { Premise, forms } from './premise';
import Argument from './argument';
import Compartment from './compartment';

const {
  ALL_A_IS_B,
  SOME_A_IS_NOT_B,
} = forms;

test('BARBARA resolution column is correct', () => {
  const a = 'Men';
  const b = 'Mortal';
  const c = 'Greeks';

  const allMenAreMortalPremise = new Premise(ALL_A_IS_B, {
    firstTerm: [a],
    secondTerm: [b],
  });
  const allGreeksAreMenPremise = new Premise(ALL_A_IS_B, {
    firstTerm: [c],
    secondTerm: [a],
  });
  const argument = new Argument([allMenAreMortalPremise, allGreeksAreMenPremise]);
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

test('BAROCO resolution column is correct', () => {
  const a = 'Informative things';
  const b = 'Useful';
  const c = 'Websites';

  const allInformativeThingsAreUsefulPremise = new Premise(ALL_A_IS_B, {
    firstTerm: [a],
    secondTerm: [b],
  });
  const someWebsitesAreNotUsefulPremise = new Premise(SOME_A_IS_NOT_B, {
    firstTerm: [c],
    secondTerm: [b],
  });
  const argument = new Argument([allInformativeThingsAreUsefulPremise, someWebsitesAreNotUsefulPremise]);
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

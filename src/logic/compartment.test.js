import Compartment from './compartment';
import copy from '../utils/copy';

const truths = Object.freeze({
  a: true,
  b: true,
  c: false,
});

const compartment = new Compartment(truths);

test('compartment contains truth', () => {
  const expectedTruth = JSON.stringify(copy(truths));
  expect(compartment.toString()).toBe(expectedTruth);
});

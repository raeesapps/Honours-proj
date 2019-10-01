import Compartment from './compartment';
import HashDictionary from './dictionary';

const NOT_HASHABLE_KEY_ERROR = 'key.hashCode is not a function';
const NULL_KEY_ERROR = 'Cannot read property \'hashCode\' of null';
const UNDEFINED_KEY_ERROR = 'Cannot read property \'hashCode\' of undefined';

let dictionary;
beforeEach(() => {
  dictionary = new HashDictionary();
});

test('Dictionary add does not work on un-hashable key', () => {
  const key = {};
  const value = 1;
  expect(() => dictionary.add(key, value)).toThrow(new Error(NOT_HASHABLE_KEY_ERROR));
});

test('Dictionary add works on hashable key', () => {
  const key = new Compartment({});
  const value = 1;
  dictionary.add(key, value);
});

test('Dictionary add does not work on null key', () => {
  const key = null;
  const value = 1;
  expect(() => dictionary.add(key, value)).toThrow(new Error(NULL_KEY_ERROR));
});

test('Dictionary add does not work on undefined key', () => {
  const key = undefined;
  const value = 1;
  expect(() => dictionary.add(key, value)).toThrow(new Error(UNDEFINED_KEY_ERROR));
});

test('Dictionary get retrieves value stored', () => {
  const key = new Compartment({});
  const value = 1;

  dictionary.add(key, value);

  const actualValue = dictionary.get(key);
  expect(actualValue).toBe(value);
});

test('Dictionary size is 0 when empty', () => {
  const emptyDictionary = new HashDictionary();
  expect(emptyDictionary.size()).toBe(0);
});

test('Dictionary is 1 when 1 key-value mapping is in it', () => {
  const key = new Compartment({});
  const value = 1;

  dictionary.add(key, value);

  expect(dictionary.size()).toBe(1);
});

test('Dictionary contains key when key is in dictionary', () => {
  const key = new Compartment({});

  dictionary.add(key, 1);

  const dictionaryHasKey = dictionary.has(key);
  expect(dictionaryHasKey).toBe(true);
});

test('Dictionary does not contain key when key is not in dictionary', () => {
  const key = new Compartment({ a: 1 });
  const dictionaryHasKey = dictionary.has(key);
  expect(dictionaryHasKey).toBe(false);
});

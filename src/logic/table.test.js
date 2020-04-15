import Table from './table';
import HashDictionary from './dictionary';
import Compartment from './compartment';
import { Proposition, forms } from './proposition';

const terms = ['a', 'b'];
let table;

beforeEach(() => {
  table = new Table(terms);
});

test('Table instantiated correctly', () => {
  const tableDictionary = table.getTableDictionary();
  const tableCompartments = table.getCompartments();
  const emptyDictionary = new HashDictionary();
  const expectedCompartments = [new Compartment({ a: false, b: false }), new Compartment({ a: false, b: true }), new Compartment({ a: true, b: false }), new Compartment({ a: true, b: true })];

  const tableDictionaryStr = JSON.stringify(tableDictionary);
  const emptyDictionaryStr = JSON.stringify(emptyDictionary);
  const tableCompartmentsStr = JSON.stringify(tableCompartments);
  const expectedCompartmentsStr = JSON.stringify(expectedCompartments);

  expect(tableDictionaryStr).toBe(emptyDictionaryStr);
  expect(tableCompartmentsStr).toBe(expectedCompartmentsStr);
});

test('Table size 0 when no propositions in table', () => {
  expect(table.size()).toBe(0);
});

test('Table size is 1 when proposition is added to table', () => {
  const {
    ALL_A_IS_B,
  } = forms;
  const proposition = new Proposition(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

  table.addProposition(proposition, false);
  expect(table.size()).toBe(1);
});

test('Table has proposition when proposition is in table', () => {
  const {
    ALL_A_IS_B,
  } = forms;
  const proposition = new Proposition(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

  table.addProposition(proposition, false);
  expect(table.has(proposition)).toBe(true);
});

import Table from './table';
import HashDictionary from './dictionary';
import Compartment from './compartment';
import { Premise, forms } from './premise';

const terms = ['a', 'b'];
let table;

beforeEach(() => {
  table = new Table(terms);
});

test('Table instantiated correctly', () => {
  const tableDictionary = table.getTable();
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

test('Table size 0 when no premises in table', () => {
  expect(table.size()).toBe(0);
});

test('Table size is 1 when premise is added to table', () => {
  const {
    ALL_A_IS_B,
  } = forms;
  const premise = new Premise(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

  table.addPremise(premise);
  expect(table.size()).toBe(1);
});

test('Table has premise when premise is in table', () => {
  const {
    ALL_A_IS_B,
  } = forms;
  const premise = new Premise(ALL_A_IS_B, { firstTerm: 'a', secondTerm: 'b' });

  table.addPremise(premise);
  expect(table.has(premise)).toBe(true);
});

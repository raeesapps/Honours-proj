import Compartment from './compartment';
import HashDictionary from './dictionary';
import copy from '../utils/copy';

class Table {
  static getVennDiagramParts(table) {
    const n = table.numberOfTerms;
    const vennDiagramParts = [];
    table.compartments.forEach((compartment) => {
      let vennDiagramPart = '(';
      const truths = compartment.getTruths();
      const truthKeys = Object.keys(truths);
      truthKeys.sort();
      truthKeys.forEach((atom, i) => {
        const curAtomIsTrue = truths[atom];

        if (curAtomIsTrue) {
          vennDiagramPart += atom;

          if (i !== n - 1) {
            vennDiagramPart += '&';
          }
        }
      });
      if (vennDiagramPart[vennDiagramPart.length - 1] === '&') {
        vennDiagramPart = vennDiagramPart.substr(0, vennDiagramPart.length - 1);
      }
      vennDiagramPart += ')';
      vennDiagramParts.push({
        compartment,
        vennDiagramPart,
      });
    });
    return vennDiagramParts;
  }
  constructor(termNames) {
    function permute(compartments, terms, index, size) {
      if (index === size) {
        compartments.push(new Compartment(copy(terms)));
        return;
      }
      const termsRef = terms;
      const term = termNames[index];
      termsRef[term] = false;
      permute(compartments, terms, index + 1, size);
      termsRef[term] = true;
      permute(compartments, terms, index + 1, size);
    }
    this.tableDictionary = new HashDictionary();
    this.numberOfTerms = termNames.length;
    this.compartments = [];
    const termsMappings = {};
    termNames.forEach((term) => {
      termsMappings[term] = false;
    });
    permute(this.compartments, termsMappings, 0, termNames.length);
  }

  addPremise(premise, conclusionCompartments) {
    const compartmentDictionary = new HashDictionary();
    this.compartments.forEach((compartment) => {
      compartmentDictionary.add(compartment, null);
    });
    this.tableDictionary.add(premise, compartmentDictionary);
    premise.populateTable(this.tableDictionary, conclusionCompartments);
  }

  unify() {
    const unifiedCompartments = {};

    const emptyCompartmentDictionary = new HashDictionary();
    this.compartments.forEach((compartment) => {
      emptyCompartmentDictionary.add(compartment, null);
    });

    emptyCompartmentDictionary.forEach((key) => {
      unifiedCompartments[key] = [];
    });

    const premises = this.tableDictionary.map((keyHash) => this.tableDictionary.keyObj(keyHash));
    premises.forEach((premise) => {
      const compartmentDictionary = this.tableDictionary.get(premise);

      compartmentDictionary.forEach((key) => {
        const compartment = compartmentDictionary.keyObj(key);
        const instances = unifiedCompartments[key];
        const instance = compartmentDictionary.get(compartment);

        if (instance !== null) {
          instances.push(instance);
        }
      });
    });
    return unifiedCompartments;
  }

  resolve() {
    const unifiedCompartments = this.unify();
    const resolvedCompartments = {};
    Object.keys(unifiedCompartments).forEach((key) => {
      const instances = unifiedCompartments[key];
      const items = new Set([...instances]);

      if (items.has('e') && items.size > 1) {
        resolvedCompartments[key] = [...items].filter((item) => item === 'e');
      } else {
        resolvedCompartments[key] = [...items];
      }
    });
    return resolvedCompartments;
  }

  map(terms) {
    function getCompartments(table) {
      const compartmentDictionary = new HashDictionary();
      table.compartments.forEach((compartment) => {
        compartmentDictionary.add(compartment, null);
      });

      return compartmentDictionary.keyHashToKeyMappings;
    }
    const thisTableResolved = this.resolve();
    const thisTableCompartments = getCompartments(this);

    const mappedTable = new Table([...terms]);
    const mappedTableUnified = mappedTable.unify();
    const mappedTableCompartments = getCompartments(mappedTable);

    Object.keys(mappedTableUnified).forEach((mappedTableKey) => {
      const mappedTableCompartment = mappedTableCompartments[mappedTableKey];

      console.log(mappedTableCompartment);
      console.log(mappedTableKey);

      const aggregatedEntries = Object
        .keys(thisTableResolved)
        .filter((thisTableKey) => {
          const thisTableCompartment = thisTableCompartments[thisTableKey];

          const reducer = Object
            .keys(mappedTableCompartment.truths)
            .reduce((counter, term) => {
              if (thisTableCompartment.truths[term] === mappedTableCompartment.truths[term]) {
                return counter - 1;
              }

              return counter;
            }, 2);

          return reducer === 0;
        })
        .map((thisTableKey) => {
          const items = thisTableResolved[thisTableKey];

          if (!items.length) {
            return ['m'];
          }

          return items;
        })
        .flat();

      const aggregatedEntriesWithoutDuplicates = [...new Set([...aggregatedEntries])];
      console.log(aggregatedEntries);
      const aggregatedEntriesFilteredForXs = [...aggregatedEntriesWithoutDuplicates].filter((item) => item.startsWith('x'));
      console.log(aggregatedEntriesFilteredForXs);
      console.log(aggregatedEntriesWithoutDuplicates.indexOf('m'));
      if (aggregatedEntriesFilteredForXs.length) {
        mappedTableUnified[mappedTableKey] = aggregatedEntriesFilteredForXs;
      } else {
        if (aggregatedEntriesWithoutDuplicates.indexOf('m') !== -1) {
          mappedTableUnified[mappedTableKey] = [];
        } else {
          mappedTableUnified[mappedTableKey] = ['e'];
        }
      }
    });

    return {
      mappedTableUnified,
      vennDiagramParts: Table.getVennDiagramParts(mappedTable),
    };
  }

  validate(conclusion) {
    function getXEntries(resolvedCompartments) {
      const entries = new Set();
      Object.keys(resolvedCompartments).forEach((compartment) => {
        const instances = resolvedCompartments[compartment];
        instances.forEach((instance) => {
          if (instance !== 'e') {
            entries.add(instance);
          }
        });
      });
      return [...entries];
    }
    const resolvedCompartments = this.resolve();
    const conclusionCompartments = {};
    Object.keys(resolvedCompartments).forEach((key) => {
      conclusionCompartments[key] = null;
    });
    this.addPremise(conclusion, conclusionCompartments);

    let i = this.compartments.length - 1;
    while (i >= 0) {
      const compartment = this.compartments[i];
      const resolvedEntry = resolvedCompartments[compartment.hashCode()];
      const conclusionEntry = conclusionCompartments[compartment.hashCode()];
      if (conclusionEntry === 'e' && !resolvedEntry.includes('e')) {
        return false;
      }
      i -= 1;
    }
    const xEntries = getXEntries(resolvedCompartments);
    let xNotCompletelyContainedCount = 0;
    xEntries.forEach((x) => {
      i = this.compartments.length - 1;
      while (i >= 0) {
        const compartment = this.compartments[i];
        if (resolvedCompartments[compartment.hashCode()].includes(x)) {
          const xIndexCut = x.substring(1, 0);
          const entry = conclusionCompartments[compartment.hashCode()];
          const condition = entry === null || (entry !== null && entry !== xIndexCut);
          if (condition) {
            xNotCompletelyContainedCount += 1;
            break;
          }
        }
        i -= 1;
      }
    });
    const conclusionHasX = Object.keys(conclusionCompartments).filter((keyHash) => {
      const instance = conclusionCompartments[keyHash];
      return instance !== null && instance === 'x';
    }).length > 0;
    if (xNotCompletelyContainedCount === xEntries.length && (conclusionHasX || xEntries > 0)) {
      return false;
    }
    return true;
  }

  size() {
    return this.tableDictionary.size();
  }

  has(premise) {
    return this.tableDictionary.has(premise);
  }

  getTableDictionary() {
    return this.tableDictionary;
  }

  getCompartments() {
    return this.compartments;
  }

  toString() {
    return JSON.stringify(this.tableDictionary, this.compartments);
  }
}

export default Table;

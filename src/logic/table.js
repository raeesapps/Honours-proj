import Compartment from './compartment';
import copy from '../utils/copy';
import HashDictionary from './dictionary';

class Table {
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
    const premises = this.tableDictionary.map((keyHash) => this.tableDictionary.keyObj(keyHash));
    premises.forEach((premise) => {
      const compartmentDictionary = this.tableDictionary.get(premise);

      compartmentDictionary.forEach((key) => {
        if (unifiedCompartments[key] === undefined) {
          unifiedCompartments[key] = [];
        }
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

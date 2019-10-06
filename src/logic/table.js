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
    this.compartments = [];
    const termsMappings = {};
    termNames.forEach((term) => {
      termsMappings[term] = false;
    });
    permute(this.compartments, termsMappings, 0, termNames.length);
  }

  addPremise(premise) {
    const compartmentDictionary = new HashDictionary();
    this.compartments.forEach((compartment) => {
      compartmentDictionary.add(compartment, null);
    });
    this.tableDictionary.add(premise, compartmentDictionary);
    premise.populateTable(this.tableDictionary);
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
        resolvedCompartments[key] = [...items].filter((item) => item !== 'e');
      } else {
        resolvedCompartments[key] = [...items];
      }
    });
    return resolvedCompartments;
  }

  validate(conclusion) {
    // when there exists an 'e' in the conclusion but there doesn't exist an 'e'
    // in the resolved column, conclusion is invalid

    // when there is an x_i in the resolved column that is not in the corresponding row
    // in the conclusion column, the premise is invalid if this situation persists after
    // trying to remove any number of x sequences from the resolved column 1822

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
    this.addPremise(conclusion);
    const conclusionCompartments = this.tableDictionary.get(conclusion);

    let i = this.compartments.length - 1;
    while (i) {
      const compartment = this.compartments[i];
      const resolvedEntry = resolvedCompartments[compartment.hashCode()];
      const conclusionEntry = conclusionCompartments.get(compartment);
      if (conclusionEntry === 'e' && !resolvedEntry.includes('e')) {
        return false;
      }
      i -= 1;
    }
    const xEntries = getXEntries(resolvedCompartments);
    let xNotCompletelyContainedCount = 0;
    xEntries.forEach((x) => {
      i = this.compartments.length - 1;
      while (i) {
        const compartment = this.compartments[i];
        if (resolvedCompartments[compartment.hashCode()].includes(x)) {
          if (!conclusionCompartments.get(compartment).includes(x)) {
            // should check if the conclusion starts with x' instead of includes the exact x entry
            xNotCompletelyContainedCount += 1;
            break;
          }
        }
        i -= 1;
      }
    });
    const conclusionHasX = conclusionCompartments.filter((keyHash) => {
      const keyObj = conclusionCompartments.keyObj(keyHash);
      const instance = conclusionCompartments.get(keyObj);
      return instance !== null && instance.startsWith('x');
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

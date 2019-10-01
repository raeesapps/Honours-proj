import Compartment from './compartment';
import HashDictionary from './dictionary';

class Table {
  constructor(termNames) {
    function copyTerms(terms) {
      return Object.freeze(JSON.parse(JSON.stringify(terms)));
    }
    function permute(compartments, terms, index, size) {
      if (index === size) {
        compartments.push(new Compartment(copyTerms(terms)));
        return;
      }
      const termsRef = terms;
      const term = termNames[index];
      termsRef[term] = false;
      permute(compartments, terms, index + 1, size);
      termsRef[term] = true;
      permute(compartments, terms, index + 1, size);
    }
    this.table = new HashDictionary();
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

    this.table.add(premise, compartmentDictionary);
    premise.populateTable(this.table);
  }

  unify() {
    const unifiedCompartments = {};
    const premises = this.table.map((keyHash) => this.table.keyObj(keyHash));
    premises.forEach((premise) => {
      const compartmentDictionary = this.table.get(premise);

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

  validate(premise) {
    throw new Error(`${this} ${premise} not implemented`);
  }

  size() {
    return this.table.size();
  }

  has(premise) {
    return this.table.has(premise);
  }

  getTable() {
    return this.table;
  }

  getCompartments() {
    return this.compartments;
  }

  toString() {
    return JSON.stringify(this.table, this.compartments);
  }
}

export default Table;

import Compartment from './compartment';
import copy from '../utils/copy';
import HashDictionary from './dictionary';

class Table {
  static mapToVennDiagram() {
    const atoms = ['A', 'B', 'C'];
    const n = atoms.length;
    const compartments = Compartment.getAllCompartments(atoms);
    const vennDiagramParts = [];
    compartments.forEach((compartment) => {
      let vennDiagramPart = '(';
      const truths = compartment.getTruths();
      Object.keys(truths).forEach((atom, i) => {
        const curAtomIsTrue = truths[atom];

        if (curAtomIsTrue) {
          vennDiagramPart += atom;

          if (i !== n - 1) {
            vennDiagramPart += 'n';
          }
        }
      });
      if (vennDiagramPart[vennDiagramPart.length - 1] === 'n') {
        vennDiagramPart = vennDiagramPart.substr(0, vennDiagramPart.length - 1);
      }
      const rightSideCompartments = compartments.filter((anotherCompartment) => {
        const anotherTruths = anotherCompartment.getTruths();
        const truths = compartment.getTruths();

        const anotherTruthsLen = Object.keys(anotherTruths).filter((anotherAtom) => !!anotherTruths[anotherAtom]).length;
        const truthsLen = Object.keys(truths).filter((atom) => !!truths[atom]).length;
        return anotherTruthsLen > truthsLen;
      });
      rightSideCompartments.forEach((anotherCompartment, j) => {
        if (j === 0) {
          vennDiagramPart += ')\\(';
        }
        const anotherTruths = anotherCompartment.getTruths();
        Object.keys(anotherTruths).forEach((anotherAtom, i) => {
          if (anotherTruths[anotherAtom]) {
            vennDiagramPart += anotherAtom;

            if (i !== n - 1) {
              vennDiagramPart += 'n';
            }
          }
        });
        vennDiagramPart += 'u';
      });
      if (vennDiagramPart[vennDiagramPart.length - 1] === 'u') {
        vennDiagramPart = vennDiagramPart.substr(0, vennDiagramPart.length - 1);
      }
      vennDiagramPart += ')';
      vennDiagramParts.push(vennDiagramPart);
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
    this.compartments = [];
    const termsMappings = {};
    termNames.forEach((term) => {
      termsMappings[term] = false;
    });
    permute(this.compartments, termsMappings, 0, termNames.length);
  }

  addPremise(premise, isConclusion) {
    const compartmentDictionary = new HashDictionary();
    this.compartments.forEach((compartment) => {
      compartmentDictionary.add(compartment, null);
    });
    this.tableDictionary.add(premise, compartmentDictionary);
    premise.populateTable(this.tableDictionary, isConclusion);
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
    this.addPremise(conclusion, true);
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
          const xIndexCut = x.substring(1, 0);
          const entry = conclusionCompartments.get(compartment);
          const condition = entry === null || (entry !== null && entry !== xIndexCut);
          if (condition) {
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

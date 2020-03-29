import Compartment from './compartment';
import HashDictionary from './dictionary';
import { forms } from './premise';
import copy from '../utils/copy';

const {
  SOME_A_IS_NOT_B,
  SOME_A_IS_B,
  SOME_A_EXIST,
} = forms;

class Table {
  static getVennDiagramPart(compartment, n) {
    let vennDiagramPart = '(';
    const truths = compartment.getTruths();
    const truthKeys = Object.keys(truths);
    truthKeys.sort();
    truthKeys.forEach((atom, i) => {
      const curAtomIsTrue = truths[atom];

      if (curAtomIsTrue) {
        vennDiagramPart += atom;

        if ((!!n && i !== n - 1) || !n) {
          vennDiagramPart += '&';
        }
      }
    });
    if (vennDiagramPart[vennDiagramPart.length - 1] === '&') {
      vennDiagramPart = vennDiagramPart.substr(0, vennDiagramPart.length - 1);
    }
    vennDiagramPart += ')';
    return vennDiagramPart;
  }
  static getVennDiagramParts(table) {
    const n = table.numberOfTerms;
    const vennDiagramParts = [];
    table.compartments.forEach((compartment) => {
      const vennDiagramPart = Table.getVennDiagramPart(compartment, n);
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
    this.xCount = 0;
    const termsMappings = {};
    termNames.forEach((term) => {
      termsMappings[term] = false;
    });
    permute(this.compartments, termsMappings, 0, termNames.length);
  }

  addPremise(premise, conclusionCompartments) {
    switch (premise.form) {
      case SOME_A_IS_NOT_B:
      case SOME_A_IS_B:
      case SOME_A_EXIST:
        this.xCount += 1;
        break;
      default:
        break;
    }

    const compartmentDictionary = new HashDictionary();
    this.compartments.forEach((compartment) => {
      compartmentDictionary.add(compartment, null);
    });
    this.tableDictionary.add(premise, compartmentDictionary);
    premise.populateTable(this.tableDictionary, conclusionCompartments, this.xCount);
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

      resolvedCompartments[key].sort();
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
        .flat()
        .filter((item) => {
          let keepX = true;
          if (item.startsWith('x')) {
            const tableKeys = Object
              .keys(thisTableResolved)
              .filter((thisTableKey) => {
                const thisTableCompartment = thisTableCompartments[thisTableKey];

                const reducer = terms
                  .reduce((counter, term) => {
                    if (!thisTableCompartment.truths[term]) {
                      return counter - 1;
                    }

                    return counter;
                  }, 2);

                return reducer === 0;
              });

            let n = tableKeys.length - 1;
            while (n >= 0) {
              const key = tableKeys[n];
              const instances = thisTableResolved[key];
              keepX = instances.indexOf(item) === -1;

              if (keepX === false) {
                break;
              }

              n -= 1;
            }
          }
          return keepX;
        });

      const aggregatedEntriesWithoutDuplicates = [...new Set([...aggregatedEntries])];
      const aggregatedEntriesFilteredForXs = [...aggregatedEntriesWithoutDuplicates].filter((item) => item.startsWith('x'));
      aggregatedEntriesFilteredForXs.sort();
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
        return {
          reason: `there is no guarantee the compartment "${Table.getVennDiagramPart(compartment)}" is empty.`,
          result: false,
        };
      }
      i -= 1;
    }
    const xEntries = getXEntries(resolvedCompartments);
    const unsatisfiableXSequences = {};
    xEntries.forEach((x) => {
      i = this.compartments.length - 1;
      while (i >= 0) {
        const compartment = this.compartments[i];
        if (resolvedCompartments[compartment.hashCode()].includes(x)) {
          const xIndexCut = x.substring(1, 0);
          const entry = conclusionCompartments[compartment.hashCode()];
          const condition = entry === null || (entry !== null && entry !== xIndexCut);
          if (condition) {
            unsatisfiableXSequences[x] = compartment;
            break;
          }
        }
        i -= 1;
      }
    });
    const unsatisfiableXSequencesKeys = Object.keys(unsatisfiableXSequences);
    if (unsatisfiableXSequencesKeys.length === xEntries.length && (conclusion.form === SOME_A_IS_B || conclusion.form === SOME_A_IS_NOT_B)) {
      const reason = unsatisfiableXSequencesKeys.length > 0 ? unsatisfiableXSequencesKeys.reduce((partialReason, x) => {
        const compartment = unsatisfiableXSequences[x];
        const part = Table.getVennDiagramPart(compartment);
        return partialReason + `${part} is part of ${x}; `;
      }, "") : "there are no existentially quantified premises in the syllogism.";
      return {
        reason,
        result: false,
      }
    }
    return {
      reason: '',
      result: true,
    };
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

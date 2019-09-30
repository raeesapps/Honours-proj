import Compartment from './compartment';
import forms from './forms';

const tableEntryFunctions = Object.freeze({
  e: function entryForE() {
    return 'e';
  },
  x: function entryForX(seqIdx) {
    return `x_${seqIdx.toString()}`;
  },
});

class Premises {
  constructor(premises) {
    this.premises = premises;

    this.getPremises = this.getPremises.bind(this);
    this.formTable = this.formTable.bind(this);
    this.fillInTable = this.fillInTable.bind(this);
  }

  formTable() {
    function copyTerms(terms) {
      return Object.freeze(JSON.parse(JSON.stringify(terms)));
    }
    function getTermNames(premises) {
      const allTerms = premises.map((premise) => {
        const { firstTerm, secondTerm } = premise.terms;
        return [firstTerm, secondTerm];
      }).flat();
      const uniqueTerms = new Set([...allTerms]);
      return [...uniqueTerms];
    }
    const compartments = [];
    const terms = {};
    const termNames = getTermNames(this.premises);
    termNames.forEach((term) => {
      terms[term] = false;
    });
    function permuteCompartments(index, size) {
      if (index === size) {
        compartments.push(new Compartment(copyTerms(terms)));
        return;
      }
      const term = termNames[index];
      terms[term] = false;
      permuteCompartments(index + 1, size);
      terms[term] = true;
      permuteCompartments(index + 1, size);
    }
    permuteCompartments(0, termNames.length);
    const table = {};
    const premiseHashToObjMappings = {};
    this.premises.forEach((premise) => {
      const compartmentMap = {};
      const compartmentHashToObjMappings = {};
      compartments.forEach((compartment) => {
        compartmentMap[compartment.hashCode()] = null;
        compartmentHashToObjMappings[compartment.hashCode()] = compartment;
      });
      table[premise.hashCode()] = { compartmentMap, compartmentHashToObjMappings };
      premiseHashToObjMappings[premise.hashCode()] = premise;
    });
    return { table, premiseHashToObjMappings };
  }

  fillInTable(result) {
    const {
      ALL_A_IS_B,
      NO_A_IS_B,
      SOME_A_IS_NOT_B,
      SOME_A_IS_B,
    } = forms;

    const {
      e,
      x,
    } = tableEntryFunctions;

    const { table, premiseHashToObjMappings } = result;

    this.premises.forEach((premise, idx) => {
      const { firstTerm, secondTerm } = premise.terms;
      const { compartmentMap, compartmentHashToObjMappings } = table[premise.hashCode()];
      switch (premise.form) {
        case ALL_A_IS_B:
          Object.keys(compartmentHashToObjMappings).forEach((k) => {
            const compartment = compartmentHashToObjMappings[k];
            const truths = compartment.getTruths();
            const criteriaHolds = Object.keys(truths).filter(() => truths[firstTerm] && !truths[secondTerm]).length > 0;
            if (criteriaHolds) {
              compartmentMap[compartment.hashCode()] = e();
            }
          });
          break;
        case NO_A_IS_B:
          Object.keys(compartmentHashToObjMappings).forEach((k) => {
            const compartment = compartmentHashToObjMappings[k];
            const truths = compartment.getTruths();
            const criteriaHolds = Object.keys(truths).filter(() => truths[firstTerm] && truths[secondTerm]).length > 0;
            if (criteriaHolds) {
              compartmentMap[compartment.hashCode()] = e();
            }
          });
          break;
        case SOME_A_IS_NOT_B:
          Object.keys(compartmentHashToObjMappings).forEach((k) => {
            const compartment = compartmentHashToObjMappings[k];
            const truths = compartment.getTruths();
            const criteriaHolds = Object.keys(truths).filter(() => truths[firstTerm] && truths[secondTerm]).length > 0;
            if (criteriaHolds) {
              compartmentMap[compartment.hashCode()] = x(idx + 1);
            }
          });
          break;
        case SOME_A_IS_B:
          Object.keys(compartmentHashToObjMappings).forEach((k) => {
            const compartment = compartmentHashToObjMappings[k];
            const truths = compartment.getTruths();
            const criteriaHolds = Object.keys(truths).filter(() => truths[firstTerm] && !truths[secondTerm]).length > 0;
            if (criteriaHolds) {
              compartmentMap[compartment.hashCode()] = x(idx + 1);
            }
          });
          break;
        default:
          break;
      }
    });
  }

  unifyAndResolve(result) {
    function unify(premises) {
      const { table } = result;
      const unifiedCompartments = {};
      premises.forEach((premise) => {
        const { compartmentMap } = table[premise.hashCode()];

        Object.keys(compartmentMap).forEach((key) => {
          if (unifiedCompartments[key] === undefined) {
            unifiedCompartments[key] = [];
          }
          const instances = unifiedCompartments[key];
          const instance = compartmentMap[key];

          if (instance !== null) {
            instances.push(instance);
          }
        });
      });
      return unifiedCompartments;
    }
    function resolve(unifiedCompartments) {
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
    const unifiedCompartments = unify(this.premises);
    const resolvedCompartments = resolve(unifiedCompartments);
    return resolvedCompartments;
  }

  getPremises() {
    return this.premises;
  }

  toString() {
    return JSON.stringify(this.premises);
  }
}

export default Premises;

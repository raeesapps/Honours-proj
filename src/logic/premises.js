import Compartment from './compartment';
import forms from './forms';

const relationship = Object.freeze({
  M_P_S_M: 1,
  P_M_S_M: 2,
  M_P_M_S: 3,
  P_M_M_S: 4,
});

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
    //this.mergeSets = this.mergeSets.bind(this);
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

  getPremises() {
    return this.premises;
  }

  toString() {
    return JSON.stringify(this.premises);
  }

  /*
  mergeSets() {
    const { firstPremise, secondPremise } = this.premises;
    const setsOfFirstPremise = firstPremise.sets;
    const setsOfSecondPremise = secondPremise.sets;
    const {
      M,
      S,
      P,
      M_AND_S,
      M_AND_P,
      S_AND_P,
      M_AND_S_AND_P,
    } = threeSetRegions;
    const {
      A,
      B,
      A_AND_B,
      A_AND_X,
      B_AND_X,
      A_AND_B_AND_X,
    } = twoSetRegions;
    const {
      M_P_S_M,
      P_M_S_M,
      M_P_M_S,
      P_M_M_S,
    } = relationship;
    function minimumOf(firstSet, secondSet) {
      return Math.min(firstSet.getValue(), secondSet.getValue());
    }
    function inferRelationship() {
      const firstPremiseTerms = firstPremise.terms;
      const secondPremiseTerms = secondPremise.terms;

      if (firstPremiseTerms.firstTerm === secondPremiseTerms.secondTerm) {
        return M_P_S_M;
      }
      if (firstPremiseTerms.secondTerm === secondPremiseTerms.secondTerm) {
        return P_M_S_M;
      }
      if (firstPremiseTerms.firstTerm === secondPremiseTerms.firstTerm) {
        return M_P_M_S;
      }
      if (firstPremiseTerms.secondTerm === secondPremiseTerms.firstTerm) {
        return P_M_M_S;
      }

      return undefined;
    }
    const inferredRelationship = inferRelationship();
    if (inferredRelationship === M_P_S_M) {
      const sets = {
        [M]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A], setsOfSecondPremise[B])),
        [S]: setsOfSecondPremise[A],
        [P]: setsOfFirstPremise[B],
        [M_AND_S]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_X], setsOfSecondPremise[A_AND_B])),
        [M_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_B], setsOfSecondPremise[B_AND_X])),
        [S_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[B_AND_X], setsOfSecondPremise[A_AND_X])),
        [M_AND_S_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_B_AND_X], setsOfSecondPremise[A_AND_B_AND_X])),
      };
      return sets;
    }
    if (inferredRelationship === M_P_M_S) {
      const sets = {
        [M]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A], setsOfSecondPremise[A])),
        [S]: setsOfSecondPremise[B],
        [P]: setsOfFirstPremise[B],
        [M_AND_S]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_X], setsOfSecondPremise[A_AND_B])),
        [M_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_B], setsOfSecondPremise[A_AND_X])),
        [S_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[B_AND_X], setsOfSecondPremise[B_AND_X])),
        [M_AND_S_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_B_AND_X], setsOfSecondPremise[A_AND_B_AND_X])),
      };

      return sets;
    }
    if (inferredRelationship === P_M_M_S) {
      const sets = {
        [M]: Logic.fromNumber(minimumOf(setsOfFirstPremise[B], setsOfSecondPremise[A])),
        [S]: setsOfSecondPremise[B],
        [P]: setsOfFirstPremise[A],
        [M_AND_S]: Logic.fromNumber(minimumOf(setsOfFirstPremise[B_AND_X], setsOfSecondPremise[A_AND_B])),
        [M_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_B], setsOfSecondPremise[A_AND_X])),
        [S_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_X], setsOfSecondPremise[B_AND_X])),
        [M_AND_S_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_B_AND_X], setsOfSecondPremise[A_AND_B_AND_X])),
      };

      return sets;
    }
    if (inferredRelationship === P_M_S_M) {
      const sets = {
        [M]: Logic.fromNumber(minimumOf(setsOfFirstPremise[B], setsOfSecondPremise[B])),
        [S]: setsOfSecondPremise[A],
        [P]: setsOfFirstPremise[A],
        [M_AND_S]: Logic.fromNumber(minimumOf(setsOfFirstPremise[B_AND_X], setsOfSecondPremise[A_AND_B])),
        [M_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_B], setsOfSecondPremise[B_AND_X])),
        [S_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_X], setsOfSecondPremise[A_AND_X])),
        [M_AND_S_AND_P]: Logic.fromNumber(minimumOf(setsOfFirstPremise[A_AND_B_AND_X], setsOfSecondPremise[A_AND_B_AND_X])),
      };

      return sets;
    }

    return undefined;
  }*/
}

export default Premises;

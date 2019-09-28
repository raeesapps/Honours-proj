import figure from './figure';
import Logic from './logic'
import {
  threeSetRegions,
  twoSetRegions,
} from './regions';

class Pair {
  constructor(premises) {
    this.premises = premises;

    this.getPremises = this.getPremises.bind(this);
    this.mergeSets = this.mergeSets.bind(this);
  }

  getPremises() {
    return this.premises;
  }

  toString() {
    return JSON.stringify(this.premises);
  }

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
    } = figure;
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
    const relationship = inferRelationship();
    console.log(relationship);
    if (relationship === M_P_S_M) {
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
    if (relationship === M_P_M_S) {
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
    if (relationship === P_M_M_S) {
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
    if (relationship === P_M_S_M) {
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
  }
}

export default Pair;

import figure from './figure';
import Logic from './logic'
import {
  threeSetRegions,
  twoSetRegions,
} from './regions';

class Pair {
  constructor(premises, relationship) {
    this.premises = premises;
    this.relationship = relationship;

    this.getRelationship = this.getRelationship.bind(this);
    this.getPremises = this.getPremises.bind(this);
    this.mergeSets = this.mergeSets.bind(this);
  }

  getRelationship() {
    return this.relationship;
  }

  getPremises() {
    return this.premises;
  }

  toString() {
    return JSON.stringify(this.premises, this.relationship);
  }

  mergeSets() {
    const { firstPremise, secondPremise } = this.premises;
    const setsOfFirstPremise = firstPremise.sets;
    const setsOfSecondPremise = secondPremise.sets;
    const {
      M_P_S_M,
      P_M_S_M,
      M_P_M_S,
      P_M_M_S,
    } = figure;
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
    function minimumOf(firstSet, secondSet) {
      return Math.min(firstSet.getValue(), secondSet.getValue());
    }

    if (this.relationship === M_P_S_M) {
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
    if (this.relationship === M_P_M_S) {
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
    if (this.relationship === P_M_M_S) {
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
    if (this.relationship === P_M_S_M) {
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

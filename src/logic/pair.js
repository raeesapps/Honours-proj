import {
  M_P_S_M,
  P_M_S_M,
  M_P_M_S,
  P_M_M_S,
} from './figure';

class Pair {
  constructor(premises, relationship) {
    this.premises = premises;
    this.relationship = relationship;

    this.getRelationship = this.getRelationship.bind(this);
    this.getPremises = this.getPremises.bind(this);
    this.toSetTheoreticRepresentation = this.toSetTheoreticRepresentation.bind(this);
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
}

export default Pair;

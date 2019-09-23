import {
  M_P_S_M,
  P_M_S_M,
  M_P_M_S,
  P_M_M_S,
} from './figure';

class PremisePair {
  constructor(premises, relationship) {
    this.premises = premises;
    this.relationship = relationship;

    this.getRelationship = this.getRelationship.bind(this);
    this.getPremises = this.getPremises.bind(this);
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

  toSetTheoreticRepresentation() {
    const { firstPremise, secondPremise } = this.getPremises();
    const relationship = this.getRelationship();

    const m = new Set();
    const p = new Set();
    const s = new Set();

    switch (relationship) {
      case M_P_M_S:
        firstPremise.copyToSet(m, p);
        secondPremise.copyToSet(m, s);
        break;
      case P_M_S_M:
        firstPremise.copyToSet(p, m);
        secondPremise.copyToSet(s, m);
        break;
      case M_P_S_M:
        firstPremise.copyToSet(m, p);
        secondPremise.copyToSet(s, m);
        break;
      case P_M_M_S:
        firstPremise.copyToSet(p, m);
        secondPremise.copyToSet(m, s);
        break;
      default:
        break;
    }

    return { m, p, s };
  }
}

export default PremisePair;

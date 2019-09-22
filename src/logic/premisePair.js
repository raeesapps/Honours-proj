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
}

export default PremisePair;

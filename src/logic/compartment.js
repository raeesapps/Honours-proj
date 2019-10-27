import hash from 'object-hash';

class Compartment {
  constructor(truths) {
    this.truths = truths;

    this.hashCode = this.hashCode.bind(this);
  }

  getTruths() {
    return this.truths;
  }

  toString() {
    return JSON.stringify(this.truths);
  }

  hashCode() {
    return hash(this);
  }
}

export default Compartment;

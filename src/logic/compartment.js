import hash from 'object-hash';
import Table from './table';

class Compartment {
  static getAllCompartments(atoms) {
    const table = new Table(atoms);
    return table.getCompartments();
  }

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

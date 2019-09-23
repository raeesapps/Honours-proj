import {
  ALL_A_IS_B,
  SOME_A_IS_B,
  SOME_A_IS_NOT_B,
  NO_A_IS_B,
} from './forms';

class Premise {
  constructor(form, terms) {
    this.form = form;
    this.terms = terms;

    this.getForm = this.getForm.bind(this);
    this.getTerms = this.getTerms.bind(this);
  }

  getForm() {
    return this.form;
  }

  getTerms() {
    return this.terms;
  }

  toString() {
    return JSON.stringify(this);
  }

  copyToSet(a = new Set(), b = new Set()) {
    switch (this.form) {
      case ALL_A_IS_B:
        a.add(0);
        b.add(0);
        b.add(1);
        break;
      case SOME_A_IS_NOT_B:
      case SOME_A_IS_B:
        a.add(2);
        a.add(3);
        b.add(3);
        b.add(4);
        break;
      case NO_A_IS_B:
        a.add(5);
        b.add(6);
        break;
      default:
        break;
    }
  }
}

export default Premise;

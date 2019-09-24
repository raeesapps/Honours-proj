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
    this.copyToSet = this.copyToSet.bind(this);
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
}

export default Premise;

import hash from 'object-hash';

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

  hashCode() {
    return hash(this);
  }

  toString() {
    return JSON.stringify(this.form, this.terms);
  }
}

export default Premise;

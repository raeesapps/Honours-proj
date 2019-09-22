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
}

export default Premise;

import Table from './table';

class Premises {
  constructor(premises) {
    function getTermNames() {
      const allTerms = premises.map((premise) => {
        const { firstTerm, secondTerm } = premise.terms;
        return secondTerm ? [firstTerm, secondTerm] : [firstTerm];
      }).flat();
      const uniqueTerms = new Set([...allTerms]);
      return [...uniqueTerms];
    }
    const termNames = getTermNames(this.premises);

    this.premises = premises;
    this.table = new Table(termNames);
    this.premises.forEach((premise) => {
      this.table.addPremise(premise, false);
    });
  }

  unifyAndResolve() {
    return this.table.resolve();
  }

  argue(conclusion) {
    return this.table.validate(conclusion);
  }

  toString() {
    return JSON.stringify(this.table, this.premises);
  }
}

export default Premises;

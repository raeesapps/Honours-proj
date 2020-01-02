import Table from './table';

class PremiseCollection {
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
    this.terms = termNames;
  }

  unifyAndResolve() {
    return this.table.resolve();
  }

  size() {
    return this.table.size();
  }

  getVennDiagramParts() {
    const n = this.table.numberOfTerms;
    const vennDiagramParts = [];
    this.table.compartments.forEach((compartment) => {
      let vennDiagramPart = '(';
      const truths = compartment.getTruths();
      Object.keys(truths).forEach((atom, i) => {
        const curAtomIsTrue = truths[atom];

        if (curAtomIsTrue) {
          vennDiagramPart += atom;

          if (i !== n - 1) {
            vennDiagramPart += '&';
          }
        }
      });
      if (vennDiagramPart[vennDiagramPart.length - 1] === '&') {
        vennDiagramPart = vennDiagramPart.substr(0, vennDiagramPart.length - 1);
      }
      vennDiagramPart += ')';
      vennDiagramParts.push({
        compartment,
        vennDiagramPart,
      });
    });
    return vennDiagramParts;
  }

  argue(conclusion) {
    const { firstTerm, secondTerm } = conclusion.terms;
    const termSet = new Set([...this.terms]);
    termSet.add(firstTerm);
    termSet.add(secondTerm);
    this.terms = [...termSet];

    return this.table.validate(conclusion);
  }

  addConclusionButDoNotArgue(conclusion) {
    this.premises = [...this.premises, conclusion];
    this.table.addPremise(conclusion);
  }

  toString() {
    return JSON.stringify(this.table, this.premises);
  }
}

export default PremiseCollection;

import hash from 'object-hash';

import Table from './table';

class PremiseCollection {
  constructor(premises, additionalTerms) {
    function getTermNames() {
      const allTerms = premises.map((premise) => {
        const { firstTerm, secondTerm } = premise.terms;
        return secondTerm ? [firstTerm, secondTerm] : [firstTerm];
      }).flat();
      const uniqueTerms = new Set([...allTerms]);

      if (additionalTerms) {
        additionalTerms.forEach((term) => {
          uniqueTerms.add(term);
        });
      }
      return [...uniqueTerms];
    }
    const termNames = getTermNames(this.premises);

    this.premises = premises;
    this.table = new Table(termNames);
    this.premises.forEach((premise) => {
      this.table.addPremise(premise);
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
      const truthKeys = Object.keys(truths);
      truthKeys.sort();
      truthKeys.forEach((atom, i) => {
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

  map(ignoredTerms) {
    return this.table.map(ignoredTerms);
  }

  argue(conclusion) {
    const { firstTerm, secondTerm } = conclusion.terms;
    const termSet = new Set([...this.terms]);
    termSet.add(firstTerm);
    termSet.add(secondTerm);
    this.terms = [...termSet];

    return this.table.validate(conclusion);
  }

  toString() {
    return JSON.stringify(this.table, this.premises);
  }

  hashCode() {
    return hash(this);
  }
}

export default PremiseCollection;

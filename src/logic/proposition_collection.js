import hash from 'object-hash';

import Table from './table';

class PropositionCollection {
  constructor(propositions, additionalTerms) {
    function getTermNames() {
      const allTerms = propositions.map((proposition) => {
        const { firstTerm, secondTerm } = proposition.terms;
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
    const termNames = getTermNames(this.propositions);

    this.propositions = propositions;
    this.table = new Table(termNames);
    this.propositions.forEach((proposition) => {
      this.table.addProposition(proposition);
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
    return Table.getVennDiagramParts(this.table);
  }

  reduce(terms) {
    return this.table.reduce(terms);
  }

  argue(conclusion) {
    const { firstTerm, secondTerm } = conclusion.terms;
    const termSet = new Set([...this.terms]);
    termSet.add(firstTerm);
    termSet.add(secondTerm);
    this.terms = [...termSet];

    const { reason, result } = this.table.validate(conclusion);
    return result;
  }

  argue2(conclusion) {
    const { firstTerm, secondTerm } = conclusion.terms;
    const termSet = new Set([...this.terms]);
    termSet.add(firstTerm);
    termSet.add(secondTerm);
    this.terms = [...termSet];

    return this.table.validate(conclusion);
  }

  toString() {
    return JSON.stringify(this.table, this.propositions);
  }

  hashCode() {
    return hash(this);
  }
}

export default PropositionCollection;

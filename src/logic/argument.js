import Table from './table';

class Argument {
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
      const rightSideCompartments = this.table.compartments.filter((anotherCompartment) => {
        const anotherTruths = anotherCompartment.getTruths();

        const anotherTruthsLen = Object.keys(anotherTruths).filter((anotherAtom) => !!anotherTruths[anotherAtom]).length;
        const truthsLen = Object.keys(truths).filter((atom) => !!truths[atom]).length;
        return anotherTruthsLen > truthsLen;
      });
      rightSideCompartments.forEach((anotherCompartment, j) => {
        if (j === 0) {
          vennDiagramPart += ')\\(';
        }
        const anotherTruths = anotherCompartment.getTruths();
        Object.keys(anotherTruths).forEach((anotherAtom, i) => {
          if (anotherTruths[anotherAtom]) {
            vennDiagramPart += anotherAtom;

            if (i !== n - 1) {
              vennDiagramPart += '&';
            }
          }
        });
        vennDiagramPart += '|';
      });
      if (vennDiagramPart[vennDiagramPart.length - 1] === '|') {
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

  getSets() {
    const compartments = this.table.getCompartments();
    return compartments
      .filter((compartment) => {
        const values = Object.values(compartment.getTruths())
          .filter((truthValue) => !!truthValue);

        return !!values.length;
      })
      .map((compartment) => {
        const truths = compartment.getTruths();
        const truthKeys = Object.keys(truths).filter((key) => !!truths[key]);
        return {
          sets: truthKeys,
          size: truthKeys.length > 1 ? 2 : 8,
        };
      });
  }

  argue(conclusion) {
    return this.table.validate(conclusion);
  }

  toString() {
    return JSON.stringify(this.table, this.premises);
  }
}

export default Argument;

import hash from 'object-hash';

const tableEntryFunctions = Object.freeze({
  e: function entryForE() {
    return 'e';
  },
  x: function entryForX(seqIdx) {
    return `x_${seqIdx.toString()}`;
  },
  x_i: function entryForAnyX() {
    return 'x';
  },
});

const forms = Object.freeze({
  ALL_A_IS_B: 0,
  NO_A_IS_B: 1,
  SOME_A_IS_B: 2,
  SOME_A_IS_NOT_B: 3,
  SOME_A_EXIST: 4,
});

const symbolicForms = Object.freeze({
  A_ENTAILS_B: 0,
  A_DOES_NOT_ENTAIL_B: 1,
  A_ENTAILS_NOT_B: 2,
  A_DOES_NOT_ENTAIL_NOT_B: 3,
});

function getSymbolicForm(premise) {
  const {
    ALL_A_IS_B,
    NO_A_IS_B,
    SOME_A_IS_B,
    SOME_A_IS_NOT_B,
  } = forms;

  const {
    A_ENTAILS_B,
    A_DOES_NOT_ENTAIL_B,
    A_ENTAILS_NOT_B,
    A_DOES_NOT_ENTAIL_NOT_B,
  } = symbolicForms;

  switch (premise.form) {
    case ALL_A_IS_B:
      return A_ENTAILS_B;
    case NO_A_IS_B:
      return A_ENTAILS_NOT_B;
    case SOME_A_IS_B:
      return A_DOES_NOT_ENTAIL_NOT_B;
    case SOME_A_IS_NOT_B:
      return A_DOES_NOT_ENTAIL_B;
    default:
      break;
  }

  return null;
}

function getEntailmentSymbol(symbolicForm) {
  const {
    A_ENTAILS_B,
    A_DOES_NOT_ENTAIL_B,
    A_ENTAILS_NOT_B,
    A_DOES_NOT_ENTAIL_NOT_B,
  } = symbolicForms;

  let expectedEntailmentSymbol;
  switch (symbolicForm) {
    case A_DOES_NOT_ENTAIL_NOT_B:
    case A_DOES_NOT_ENTAIL_B:
      expectedEntailmentSymbol = '!⊨';
      break;
    case A_ENTAILS_B:
    case A_ENTAILS_NOT_B:
      expectedEntailmentSymbol = '⊨';
      break;
    default:
      break;
  }
  return expectedEntailmentSymbol;
}

class Premise {
  constructor(form, terms) {
    this.form = form;
    this.terms = terms;

    this.hashCode = this.hashCode.bind(this);
  }

  getForm() {
    return this.form;
  }

  getTerms() {
    return this.terms;
  }

  populateTable(table, conclusionCompartments) {
    function addEntry(
      compartmentDictionary,
      compartment,
      criteriaCallbackFn,
      entryIfConclusion,
      entryIfNotConclusion,
    ) {
      const truthKeys = Object.keys(compartment.getTruths());
      const criteria = truthKeys.filter(criteriaCallbackFn).length > 0;
      if (criteria) {
        if (conclusionCompartments) {
          const conclusionCompartmentsReference = conclusionCompartments;
          conclusionCompartmentsReference[compartment.hashCode()] = entryIfConclusion;
        } else {
          compartmentDictionary.add(compartment, entryIfNotConclusion);
        }
      }
    }

    if (!conclusionCompartments && !table.has(this)) {
      return;
    }

    const {
      ALL_A_IS_B,
      NO_A_IS_B,
      SOME_A_IS_NOT_B,
      SOME_A_IS_B,
      SOME_A_EXIST,
    } = forms;
    const { e, x, x_i } = tableEntryFunctions;
    const { firstTerm, secondTerm } = this.terms;
    const compartmentDictionary = table.get(this);
    const i = table.size();
    compartmentDictionary.forEach((keyHash) => {
      const compartment = compartmentDictionary.keyObj(keyHash);
      const truths = compartment.getTruths();
      switch (this.form) {
        case ALL_A_IS_B:
          addEntry(
            compartmentDictionary,
            compartment,
            () => truths[firstTerm] && !truths[secondTerm],
            e(),
            e(),
          );
          break;
        case NO_A_IS_B:
          addEntry(
            compartmentDictionary,
            compartment,
            () => truths[firstTerm] && truths[secondTerm],
            e(),
            e(),
          );
          break;
        case SOME_A_IS_NOT_B:
          addEntry(
            compartmentDictionary,
            compartment,
            () => truths[firstTerm] && !truths[secondTerm],
            x_i(),
            x(i),
          );
          break;
        case SOME_A_IS_B:
          addEntry(
            compartmentDictionary,
            compartment,
            () => truths[firstTerm] && truths[secondTerm],
            x_i(),
            x(i),
          );
          break;
        case SOME_A_EXIST:
          addEntry(
            compartmentDictionary,
            compartment,
            () => truths[firstTerm],
            x_i(),
            x(i),
          );
          break;
        default:
          break;
      }
    });
  }

  hashCode() {
    return hash(this);
  }

  toString() {
    return JSON.stringify(this.form, this.terms);
  }

  toSentence() {
    const {
      ALL_A_IS_B,
      NO_A_IS_B,
      SOME_A_IS_NOT_B,
      SOME_A_IS_B,
    } = forms;
    const {
      firstTerm,
      secondTerm,
    } = this.terms;
    switch (this.form) {
      case ALL_A_IS_B:
        return `All ${firstTerm} are ${secondTerm}`;
      case NO_A_IS_B:
        return `No ${firstTerm} are ${secondTerm}`;
      case SOME_A_IS_NOT_B:
        return `Some ${firstTerm} are not ${secondTerm}`;
      case SOME_A_IS_B:
        return `Some ${firstTerm} are ${secondTerm}`;
      default:
        break;
    }
    return undefined;
  }

  toSymbolicForm(firstSymbol, secondSymbol) {
    const {
      A_ENTAILS_B,
      A_DOES_NOT_ENTAIL_B,
      A_ENTAILS_NOT_B,
      A_DOES_NOT_ENTAIL_NOT_B,
    } = symbolicForms;

    const symbolicFormOfPremise = getSymbolicForm(this);

    let firstSymbolOrTerm;
    let secondSymbolOrTerm;

    if (firstSymbol && secondSymbol) {
      firstSymbolOrTerm = firstSymbol;
      secondSymbolOrTerm = secondSymbol;
    } else if (!(firstSymbol && secondSymbol)) {
      const {
        firstTerm,
        secondTerm,
      } = this.terms;

      firstSymbolOrTerm = firstTerm;
      secondSymbolOrTerm = secondTerm;
    }

    switch (symbolicFormOfPremise) {
      case A_ENTAILS_B:
        return `${firstSymbolOrTerm} ⊨ ${secondSymbolOrTerm}`;
      case A_DOES_NOT_ENTAIL_B:
        return `${firstSymbolOrTerm} !⊨ ${secondSymbolOrTerm}`;
      case A_ENTAILS_NOT_B:
        return `${firstSymbolOrTerm} ⊨ !${secondSymbolOrTerm}`;
      case A_DOES_NOT_ENTAIL_NOT_B:
        return `${firstSymbolOrTerm} !⊨ !${secondSymbolOrTerm}`;
      default:
        break;
    }
    return null;
  }
}

export {
  Premise,
  forms,
  symbolicForms,
  getSymbolicForm,
  getEntailmentSymbol,
};

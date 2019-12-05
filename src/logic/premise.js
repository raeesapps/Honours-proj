import hash from 'object-hash';
import singularise from '../utils/inflector';
import capitaliseAndRemoveWhitespace from '../utils/string';

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

  populateTable(table, isConclusion) {
    if (!table.has(this)) {
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
      const truthKeys = Object.keys(truths);
      let criteria = false;

      switch (this.form) {
        case ALL_A_IS_B:
          criteria = truthKeys.filter(() => truths[firstTerm] && !truths[secondTerm]).length > 0;
          if (criteria) {
            compartmentDictionary.add(compartment, e());
          }
          break;
        case NO_A_IS_B:
          criteria = truthKeys.filter(() => truths[firstTerm] && truths[secondTerm]).length > 0;
          if (criteria) {
            compartmentDictionary.add(compartment, e());
          }
          break;
        case SOME_A_IS_NOT_B:
          criteria = truthKeys.filter(() => truths[firstTerm] && !truths[secondTerm]).length > 0;
          if (criteria) {
            compartmentDictionary.add(compartment, isConclusion ? x_i() : x(i));
          }
          break;
        case SOME_A_IS_B:
          criteria = truthKeys.filter(() => truths[firstTerm] && truths[secondTerm]).length > 0;
          if (criteria) {
            compartmentDictionary.add(compartment, isConclusion ? x_i() : x(i));
          }
          break;
        case SOME_A_EXIST:
          criteria = truthKeys.filter(() => truths[firstTerm]).length > 0;
          if (criteria) {
            compartmentDictionary.add(compartment, isConclusion ? x_i() : x(i));
          }
          break;
        default:
          break;
      }
    });
  }

  getSets() {
    const {
      firstTerm,
      secondTerm,
    } = this.terms;

    return [
      { sets: [firstTerm], size: 8 },
      { sets: [secondTerm], size: 8 },
      { sets: [firstTerm, secondTerm], size: 2 },
    ];
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

  formatAndSingularise() {
    const { firstTerm, secondTerm } = this.terms;

    const singularisedFirstTerm = singularise(firstTerm);
    const singularisedSecondTerm = singularise(secondTerm);

    if (!singularisedFirstTerm) {
      throw new Error(`Inflector cannot singularise the word ${firstTerm}`);
    }

    if (!singularisedSecondTerm) {
      throw new Error(`Inflector cannot singularise the phrase ${secondTerm}`);
    }

    const formattedFirstTerm = capitaliseAndRemoveWhitespace(singularisedFirstTerm);
    const formattedSecondTerm = capitaliseAndRemoveWhitespace(singularisedSecondTerm);

    return { formattedFirstTerm, formattedSecondTerm };
  }

  toFunctions() {
    const { formattedFirstTerm, formattedSecondTerm } = this.formatAndSingularise();

    return [
      {
        id: 'item-3',
        content: `not (is${formattedFirstTerm} x)`,
      },
      {
        id: 'item-4',
        content: `is${formattedFirstTerm} x`,
      },
      {
        id: 'item-5',
        content: `is${formattedSecondTerm} x`,
      },
      {
        id: 'item-6',
        content: `not (is${formattedSecondTerm} x)`,
      },
      {
        id: 'item-7',
        content: `not is${formattedSecondTerm}`,
      },
      {
        id: 'item-8',
        content: `not is${formattedFirstTerm}`,
      },
      {
        id: 'item-9',
        content: `is${formattedSecondTerm}`,
      },
      {
        id: 'item-10',
        content: `is${formattedFirstTerm}`,
      },
    ];
  }

  toHaskellRepresentation() {
    const {
      ALL_A_IS_B,
      NO_A_IS_B,
      SOME_A_IS_NOT_B,
      SOME_A_IS_B,
    } = forms;

    const { formattedFirstTerm, formattedSecondTerm } = this.formatAndSingularise();

    switch (this.form) {
      case ALL_A_IS_B:
        return [['and'], `${formattedFirstTerm} x`, 'x <- things', `${formattedSecondTerm}x`];
      case NO_A_IS_B:
        return [['and', 'not'], `not(${formattedFirstTerm} x)`, 'x <- things', `${formattedSecondTerm}x`];
      case SOME_A_IS_NOT_B:
        return [['not', 'and'], `${formattedFirstTerm} x`, 'x <- things', `${formattedSecondTerm}x`];
      case SOME_A_IS_B:
        return [['not', 'and'], `not(${formattedFirstTerm} x)`, 'x <- things', `${formattedSecondTerm}x`];
      default:
        break;
    }

    return undefined;
  }

  validate(parentList, grandparentList, contentsList, drawnFromList, conditionList) {
    const {
      ALL_A_IS_B,
      NO_A_IS_B,
      SOME_A_IS_NOT_B,
      SOME_A_IS_B,
    } = forms;

    const { formattedFirstTerm, formattedSecondTerm } = this.formatAndSingularise();

    const contentsNegated = contentsList.length && contentsList[0].content === `not(is${formattedFirstTerm} x)`;
    const contentsNotNegated = contentsList.length && contentsList[0].content === `is${formattedFirstTerm} x`;

    if (this.form === ALL_A_IS_B) {
      const firstForm = grandparentList.length && grandparentList[0].content === 'not' && parentList.length && parentList[0].content === 'or' && contentsNegated;
      const secondForm = !grandparentList.length && parentList.length && parentList[0].content === 'and' && contentsNotNegated;
      const thirdForm = grandparentList.length && grandparentList[0].content === 'and' && !parentList.length && contentsNotNegated;

      if (!firstForm && !secondForm && !thirdForm) {
        return {
          hint: 'No hint defined yet!',
          result: false,
        };
      }
    } else if (this.form === NO_A_IS_B) {
      const firstForm = grandparentList.length && grandparentList[0].content === 'and' && parentList.length && parentList[0].content === 'not' && contentsNotNegated;
      const secondForm = grandparentList.length && grandparentList[0].content === 'not' && parentList.length && parentList[0].content === 'or' && contentsNotNegated;
      const thirdForm = grandparentList.length && grandparentList[0].content === 'and' && !parentList.length && contentsNegated;
      const fourthForm = !grandparentList.length && parentList.length && parentList[0].content === 'and' && contentsNegated;

      if (!firstForm && !secondForm && !thirdForm && !fourthForm) {
        return {
          hint: 'No hint defined yet!',
          result: false,
        };
      }
    } else if (this.form === SOME_A_IS_B) {
      const firstForm = grandparentList.length && grandparentList[0].content === 'not' && parentList.length && parentList[0].content === 'and' && contentsNotNegated;
      const secondForm = grandparentList.length && grandparentList[0].content === 'or' && parentList.length && parentList[0].content === 'not' && contentsNotNegated;
      const thirdForm = grandparentList.length && grandparentList[0].content === 'or' && !parentList.length && contentsNegated;
      const fourthForm = !grandparentList.length && parentList.length && parentList[0].content === 'or' && contentsNegated;

      if (!firstForm && !secondForm && !thirdForm && !fourthForm) {
        return {
          hint: 'No hint defined yet!',
          result: false,
        };
      }
    } else if (this.form === SOME_A_IS_NOT_B) {
      const firstForm = grandparentList.length && grandparentList[0].content === 'not' && parentList.length && parentList[0].content === 'and' && contentsNegated;
      const secondForm = grandparentList.length && grandparentList[0].content === 'or' && !parentList.length && contentsNotNegated;
      const thirdForm = !grandparentList.length && parentList.length && parentList[0].content === 'or' && contentsNotNegated;

      if (!firstForm && !secondForm && !thirdForm) {
        return {
          hint: 'No hint defined yet!',
          result: false,
        };
      }
    }

    if (drawnFromList.length && drawnFromList[0].content !== 'x <- things') {
      return {
        hint: 'Is your generator correct?',
        result: false,
      };
    }

    if (conditionList.length && conditionList[0].content !== `is${formattedSecondTerm} x`) {
      return {
        hint: 'Are you sure you are using the correct function for the second term?',
        result: false,
      };
    }

    return {
      result: true,
    };
  }
}

export { Premise, forms };

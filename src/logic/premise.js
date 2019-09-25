import {
  ALL_A_IS_B,
  SOME_A_IS_B,
  SOME_A_IS_NOT_B,
  NO_A_IS_B,
} from './forms';

import Logic from './logic';

import {
  twoSetRegions,
} from './regions';

class Premise {
  constructor(form, terms) {
    this.form = form;
    this.terms = terms;

    this.getForm = this.getForm.bind(this);
    this.getTerms = this.getTerms.bind(this);
    this.createSets = this.createSets.bind(this);

    this.createSets();
  }

  createSets() {
    const {
      A,
      B,
      A_AND_B,
      A_AND_X,
      B_AND_X,
      A_AND_B_AND_X,
    } = twoSetRegions;
    switch (this.form) {
      case ALL_A_IS_B:
        this.sets = {
          [A_AND_B]: Logic.true(),
          [A_AND_B_AND_X]: Logic.true(),
          [A]: Logic.false(),
          [A_AND_X]: Logic.false(),
          [B]: Logic.true(),
          [B_AND_X]: Logic.true(),
        };
        break;
      case NO_A_IS_B:
        this.sets = {
          [A_AND_B]: Logic.false(),
          [A_AND_B_AND_X]: Logic.false(),
          [B]: Logic.true(),
          [B_AND_X]: Logic.true(),
          [A]: Logic.true(),
          [A_AND_X]: Logic.true(),
        };
        break;
      case SOME_A_IS_NOT_B:
      case SOME_A_IS_B:
        this.sets = {
          [A_AND_B]: Logic.indeterminate(),
          [A_AND_B_AND_X]: Logic.indeterminate(),
          [B]: Logic.true(),
          [B_AND_X]: Logic.true(),
          [A]: Logic.true(),
          [A_AND_X]: Logic.true(),
        };
        break;
      default:
        break;
    }
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

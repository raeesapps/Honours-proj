const logicValues = Object.freeze({
  TRUE: 1,
  FALSE: -1,
  INDETERMINATE: 0,
});

class Logic {
  constructor(value) {
    this.value = value;

    this.isTrue = this.isTrue.bind(this);
    this.isFalse = this.isFalse.bind(this);
    this.isIndeterminate = this.isIndeterminate.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  isTrue() {
    return this.value === 1;
  }

  isFalse() {
    return this.value === -1;
  }

  isIndeterminate() {
    return this.value === 0;
  }

  toString() {
    return this.getValue();
  }

  getValue() {
    return this.value;
  }

  static fromNumber(number) {
    const { TRUE, FALSE } = logicValues;

    if (number === TRUE) {
      return Logic.true();
    }

    if (number === FALSE) {
      return Logic.false();
    }

    return Logic.indeterminate();
  }

  static true() {
    const { TRUE } = logicValues;
    return new Logic(TRUE);
  }

  static false() {
    const { FALSE } = logicValues;
    return new Logic(FALSE);
  }

  static indeterminate() {
    const { INDETERMINATE } = logicValues;
    return new Logic(INDETERMINATE);
  }
}

export default Logic;

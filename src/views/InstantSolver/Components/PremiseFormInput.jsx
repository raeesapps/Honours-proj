import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';

import { Premise, forms } from '../../../logic/premise';

import styles from '../../../assets/views/jss/InstantSolver/Components/premise_form_input_styles';

const quantifiers = Object.freeze({
  SOME: 'Some',
  ALL: 'All',
  NO: 'No',
});

const relations = Object.freeze({
  ARE: 'are',
  ARE_NOT: 'are not',
});

class PremiseFormInput extends React.PureComponent {
  constructor() {
    super();
    const {
      ALL,
    } = quantifiers;
    const {
      ARE,
    } = relations;
    this.state = {
      a: 'A',
      b: 'B',
      quantifier: ALL,
      relationship: ARE,
    };
  }

  getPremiseObj() {
    const { ALL, SOME, NO } = quantifiers;
    const { ARE, ARE_NOT } = relations;

    const {
      ALL_A_IS_B,
      NO_A_IS_B,
      SOME_A_IS_NOT_B,
      SOME_A_IS_B,
    } = forms;

    const {
      a,
      b,
      quantifier,
      relationship,
    } = this.state;

    let form;
    if (quantifier === ALL && relationship === ARE) {
      form = ALL_A_IS_B;
    } else if (quantifier === NO && relationship === ARE) {
      form = NO_A_IS_B;
    } else if (quantifier === SOME && relationship === ARE_NOT) {
      form = SOME_A_IS_NOT_B;
    } else if (quantifier === SOME && relationship === ARE) {
      form = SOME_A_IS_B;
    }
    const premise = new Premise(form, {
      firstTerm: a,
      secondTerm: b,
    });

    return premise;
  }

  render() {
    const {
      ALL,
      SOME,
      NO,
    } = quantifiers;
    const {
      ARE,
      ARE_NOT,
    } = relations;
    const {
      a,
      b,
      quantifier,
      relationship,
    } = this.state;
    const {
      classes,
      name,
      onRemove,
      idx,
    } = this.props;
    const displayName = name === 'Conclusion' ? 'Conclusion' : 'Premise';
    const paddingTopPercentage = relationship === ARE_NOT ? '22.55%' : '34%';
    return (
      <div>
        <div className={classes.formControlParent}>
          <FormControl>
            <InputLabel id={`${name}QuantifierDropdownLabel`}>{displayName}</InputLabel>
            <Select
              id={`${name}SelectQuantifier`}
              value={quantifier}
              onChange={(event) => this.setState({ quantifier: event.target.value })}
            >
              <MenuItem value={ALL}>{ALL}</MenuItem>
              <MenuItem value={SOME}>{SOME}</MenuItem>
              <MenuItem value={NO}>{NO}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id={`${name}TextFieldA`}
            value={a}
            className={classes.textField}
            margin="normal"
            onChange={(event) => this.setState({ a: event.target.value })}
          />
          <br />
          <FormControl>
            <Select
              id={`${name}SelectRelationship`}
              style={{ paddingTop: paddingTopPercentage }}
              value={relationship}
              onChange={(event) => this.setState({ relationship: event.target.value })}
            >
              <MenuItem value={ARE}>{ARE}</MenuItem>
              <MenuItem value={ARE_NOT}>{ARE_NOT}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id={`${name}TextFieldB`}
            value={b}
            className={classes.textField}
            margin="normal"
            onChange={(event) => this.setState({ b: event.target.value })}
          />
        </div>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => onRemove(idx)}>
          <RemoveIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(PremiseFormInput);

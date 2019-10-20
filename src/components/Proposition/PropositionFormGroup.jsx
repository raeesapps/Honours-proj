import React from 'react';
import {
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { Premise, forms } from '../../logic/premise';

const quantifiers = Object.freeze({
  SOME: 'Some',
  ALL: 'All',
  NO: 'No',
});

const relations = Object.freeze({
  ARE: 'are',
  ARE_NOT: 'are not',
});

const epsilion = '';

class PropositionFormGroup extends React.Component {
  constructor(props) {
    super(props);
    const {
      ALL,
    } = quantifiers;
    const {
      ARE,
    } = relations;
    this.state = {
      a: epsilion,
      b: epsilion,
      quantifier: ALL,
      relationship: ARE,
      quantifierDropdownOpen: false,
      relationshipDropdownOpen: false,
    };
    this.getPropositionObj = this.getPropositionObj.bind(this);
  }

  getPropositionObj() {
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
      quantifier,
      relationship,
      quantifierDropdownOpen,
      relationshipDropdownOpen,
    } = this.state;
    const {
      name,
    } = this.props;
    return (
      <FormGroup style={{ display: 'inline-block' }}>
        <Label for="majorPremiseObj">{name}</Label>
        <Dropdown style={{ marginBottom: '10px' }} isOpen={quantifierDropdownOpen} toggle={() => this.setState({ quantifierDropdownOpen: !quantifierDropdownOpen })}>
          <DropdownToggle caret>
            {quantifier}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.setState({ quantifier: ALL })}>All</DropdownItem>
            <DropdownItem onClick={() => this.setState({ quantifier: SOME })}>Some</DropdownItem>
            <DropdownItem onClick={() => this.setState({ quantifier: NO })}>No</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input style={{ width: '75%', marginBottom: '10px' }} type="text" name="premiseObj" id="premiseObj" placeholder="A" onChange={(event) => this.setState({ a: event.target.value })} />
        <Dropdown style={{ marginBottom: '10px' }} isOpen={relationshipDropdownOpen} toggle={() => this.setState({ relationshipDropdownOpen: !relationshipDropdownOpen })}>
          <DropdownToggle caret>
            {relationship}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.setState({ relationship: ARE })}>are</DropdownItem>
            <DropdownItem onClick={() => this.setState({ relationship: ARE_NOT })}>are not</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input style={{ width: '75%', marginBottom: '10px' }} type="text" name="premiseObj2" id="premiseObj2" placeholder="B" onChange={(event) => this.setState({ b: event.target.value })} />
      </FormGroup>
    );
  }
}

export default PropositionFormGroup;

import React from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { Premise, forms } from '../../logic/premise';
import Argument from '../../logic/argument';

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

class ArgumentForm extends React.Component {
  constructor(props) {
    super(props);
    const { ALL } = quantifiers;
    const { ARE } = relations;
    this.state = {
      a: epsilion,
      b: epsilion,
      c: epsilion,
      d: epsilion,
      e: epsilion,
      f: epsilion,
      majorQuantifier: ALL,
      minorQuantifier: ALL,
      conclusionQuantifier: ALL,
      majorRelationship: ARE,
      minorRelationship: ARE,
      conclusionRelationship: ARE,
      majorQuantifierDropdownOpen: false,
      minorQuantifierDropdownOpen: false,
      conclusionQuantifierDropdownOpen: false,
      majorRelationshipDropdownOpen: false,
      minorRelationshipDropdownOpen: false,
      conclusionRelationshipDropdownOpen: false,
      alertVisible: false,
      validationSuccessful: false,
    };

    this.validate = this.validate.bind(this);
  }

  validate() {
    const {
      a, b, c, d, e, f,
      majorQuantifier,
      majorRelationship,
      minorQuantifier,
      minorRelationship,
      conclusionQuantifier,
      conclusionRelationship,
    } = this.state;

    const { ALL, SOME, NO } = quantifiers;
    const { ARE, ARE_NOT } = relations;

    const {
      ALL_A_IS_B,
      NO_A_IS_B,
      SOME_A_IS_NOT_B,
      SOME_A_IS_B,
    } = forms;

    let majorForm;
    if (majorQuantifier === ALL && majorRelationship === ARE) {
      majorForm = ALL_A_IS_B;
    } else if (majorQuantifier === NO && majorRelationship === ARE) {
      majorForm = NO_A_IS_B;
    } else if (majorQuantifier === SOME && majorRelationship === ARE_NOT) {
      majorForm = SOME_A_IS_NOT_B;
    } else if (majorQuantifier === SOME && majorRelationship === ARE) {
      majorForm = SOME_A_IS_B;
    }
    const majorPremise = new Premise(majorForm, {
      firstTerm: a,
      secondTerm: b,
    });

    let minorForm;
    if (minorQuantifier === ALL && minorRelationship === ARE) {
      minorForm = ALL_A_IS_B;
    } else if (minorQuantifier === NO && minorRelationship === ARE) {
      minorForm = NO_A_IS_B;
    } else if (minorQuantifier === SOME && minorRelationship === ARE_NOT) {
      minorForm = SOME_A_IS_NOT_B;
    } else if (minorQuantifier === SOME && minorRelationship === ARE) {
      minorForm = SOME_A_IS_B;
    }
    const minorPremise = new Premise(minorForm, {
      firstTerm: c,
      secondTerm: d,
    });

    let conclusionForm;
    if (conclusionQuantifier === ALL && conclusionRelationship === ARE) {
      conclusionForm = ALL_A_IS_B;
    } else if (conclusionQuantifier === NO && conclusionRelationship === ARE) {
      conclusionForm = NO_A_IS_B;
    } else if (conclusionQuantifier === SOME && conclusionRelationship === ARE_NOT) {
      conclusionForm = SOME_A_IS_NOT_B;
    } else if (conclusionQuantifier === SOME && conclusionRelationship === ARE) {
      conclusionForm = SOME_A_IS_B;
    }
    const conclusion = new Premise(conclusionForm, {
      firstTerm: e,
      secondTerm: f,
    });

    const argument = new Argument([majorPremise, minorPremise]);

    this.setState({ validationSuccessful: argument.argue(conclusion), alertVisible: true });
  }

  render() {
    const { ALL, SOME, NO } = quantifiers;
    const { ARE, ARE_NOT } = relations;
    const {
      majorQuantifierDropdownOpen,
      majorQuantifier,
      majorRelationship,
      majorRelationshipDropdownOpen,
      minorQuantifierDropdownOpen,
      minorQuantifier,
      minorRelationship,
      minorRelationshipDropdownOpen,
      conclusionQuantifierDropdownOpen,
      conclusionQuantifier,
      conclusionRelationship,
      conclusionRelationshipDropdownOpen,
      validationSuccessful,
      alertVisible,
    } = this.state;
    return (
      <>
        <Form>
          <FormGroup style={{ display: 'inline-block' }}>
            <Label for="majorPremiseObj">Major premise</Label>
            <Dropdown style={{ marginBottom: '10px' }} isOpen={majorQuantifierDropdownOpen} toggle={() => this.setState({ majorQuantifierDropdownOpen: !majorQuantifierDropdownOpen })}>
              <DropdownToggle caret>
                {majorQuantifier}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.setState({ majorQuantifier: ALL })}>All</DropdownItem>
                <DropdownItem onClick={() => this.setState({ majorQuantifier: SOME })}>Some</DropdownItem>
                <DropdownItem onClick={() => this.setState({ majorQuantifier: NO })}>No</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input style={{ width: '75%', marginBottom: '10px' }} type="text" name="majorPremiseObj" id="majorPremiseObj" placeholder="A" onChange={(event) => this.setState({ a: event.target.value })} />
            <Dropdown style={{ marginBottom: '10px' }} isOpen={majorRelationshipDropdownOpen} toggle={() => this.setState({ majorRelationshipDropdownOpen: !majorRelationshipDropdownOpen })}>
              <DropdownToggle caret>
                {majorRelationship}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.setState({ majorRelationship: ARE })}>are</DropdownItem>
                <DropdownItem onClick={() => this.setState({ majorRelationship: ARE_NOT })}>are not</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input style={{ width: '75%', marginBottom: '10px' }} type="text" name="majorPremiseObj2" id="majorPremiseObj2" placeholder="B" onChange={(event) => this.setState({ b: event.target.value })} />
          </FormGroup>
          <FormGroup style={{ display: 'inline-block' }}>
            <Label for="minorPremiseObj">Minor premise</Label>
            <Dropdown style={{ marginBottom: '10px' }} isOpen={minorQuantifierDropdownOpen} toggle={() => this.setState({ minorQuantifierDropdownOpen: !minorQuantifierDropdownOpen })}>
              <DropdownToggle caret>
                {minorQuantifier}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.setState({ minorQuantifier: ALL })}>All</DropdownItem>
                <DropdownItem onClick={() => this.setState({ minorQuantifier: SOME })}>Some</DropdownItem>
                <DropdownItem onClick={() => this.setState({ minorQuantifier: NO })}>No</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input style={{ width: '75%', marginBottom: '10px' }} type="text" name="minorPremiseObj" id="minorPremiseObj" placeholder="A" onChange={(event) => this.setState({ c: event.target.value })} />
            <Dropdown style={{ marginBottom: '10px' }} isOpen={minorRelationshipDropdownOpen} toggle={() => this.setState({ minorRelationshipDropdownOpen: !minorRelationshipDropdownOpen })}>
              <DropdownToggle caret>
                {minorRelationship}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.setState({ minorRelationship: ARE })}>are</DropdownItem>
                <DropdownItem onClick={() => this.setState({ minorRelationship: ARE_NOT })}>are not</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input style={{ width: '75%', marginBottom: '10px' }} type="text" name="minorPremiseObj2" id="minorPremiseObj2" placeholder="B" onChange={(event) => this.setState({ d: event.target.value })} />
          </FormGroup>
          <FormGroup style={{ display: 'inline-block' }}>
            <Label for="minorPremiseObj">Conclusion</Label>
            <Dropdown style={{ marginBottom: '10px' }} isOpen={conclusionQuantifierDropdownOpen} toggle={() => this.setState({ conclusionQuantifierDropdownOpen: !conclusionQuantifierDropdownOpen })}>
              <DropdownToggle caret>
                {conclusionQuantifier}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.setState({ conclusionQuantifier: ALL })}>All</DropdownItem>
                <DropdownItem onClick={() => this.setState({ conclusionQuantifier: SOME })}>Some</DropdownItem>
                <DropdownItem onClick={() => this.setState({ conclusionQuantifier: NO })}>No</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input style={{ width: '75%', marginBottom: '10px' }} type="text" name="conclusionPremiseObj" id="conclusionPremiseObj" placeholder="E" onChange={(event) => this.setState({ e: event.target.value })} />
            <Dropdown style={{ marginBottom: '10px' }} isOpen={conclusionRelationshipDropdownOpen} toggle={() => this.setState({ conclusionRelationshipDropdownOpen: !conclusionRelationshipDropdownOpen })}>
              <DropdownToggle caret>
                {conclusionRelationship}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.setState({ conclusionRelationship: ARE })}>are</DropdownItem>
                <DropdownItem onClick={() => this.setState({ conclusionRelationship: ARE_NOT })}>are not</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input style={{ width: '75%', marginBottom: '10px' }} type="text" name="conclusionPremiseObj2" id="conclusionPremiseObj2" placeholder="B" onChange={(event) => this.setState({ f: event.target.value })} />
          </FormGroup>
          <FormGroup>
            <Button onClick={this.validate}>Validate</Button>
          </FormGroup>
        </Form>
        <Alert style={{ display: alertVisible ? epsilion : 'none' }} color={validationSuccessful ? 'success' : 'danger'}>
          {validationSuccessful ? 'Valid' : 'Invalid'}
        </Alert>
      </>
    );
  }
}

export default ArgumentForm;

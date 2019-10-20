import React from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
} from 'reactstrap';

import Argument from '../../logic/argument';
import PropositionFormGroup from '../Proposition/PropositionFormGroup';

class ArgumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      validationSuccessful: false,
    };
    this.majorRef = React.createRef();
    this.minorRef = React.createRef();
    this.conclusionRef = React.createRef();
    this.validate = this.validate.bind(this);
  }

  validate() {
    const {
      minorRef,
      majorRef,
      conclusionRef,
    } = this;

    const minorProposition = minorRef.current.getPropositionObj();
    const majorProposition = majorRef.current.getPropositionObj();
    const argument = new Argument([minorProposition, majorProposition]);
    const conclusion = conclusionRef.current.getPropositionObj();
    this.setState({ validationSuccessful: argument.argue(conclusion), alertVisible: true });
  }

  render() {
    const {
      minorRef,
      majorRef,
      conclusionRef,
    } = this;
    const {
      validationSuccessful,
      alertVisible,
    } = this.state;
    return (
      <>
        <Form>
          <PropositionFormGroup ref={minorRef} name="Major premise" />
          <PropositionFormGroup ref={majorRef} name="Minor premise" />
          <PropositionFormGroup ref={conclusionRef} name="Conclusion" />
          <FormGroup>
            <Button onClick={this.validate}>Validate</Button>
          </FormGroup>
        </Form>
        <Alert style={{ display: alertVisible ? '' : 'none' }} color={validationSuccessful ? 'success' : 'danger'}>
          {validationSuccessful ? 'Valid' : 'Invalid'}
        </Alert>
      </>
    );
  }
}

export default ArgumentForm;

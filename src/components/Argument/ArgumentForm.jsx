import React from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import Argument from '../../logic/argument';
import PropositionFormGroup from '../Proposition/PropositionFormGroup';

import plus from '../../assets/img/plus.png';

class ArgumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      validationSuccessful: false,
      propositions: [
        {
          name: 'Minor premise',
          ref: React.createRef(),
        },
        {
          name: 'Major premise',
          ref: React.createRef(),
        },
        {
          name: 'Conclusion',
          ref: React.createRef(),
        },
      ],
    };
    this.validate = this.validate.bind(this);
    this.addProposition = this.addProposition.bind(this);
  }

  addProposition() {
    const {
      propositions,
    } = this.state;

    const conclusion = propositions.pop();

    propositions.push({
      name: 'ayy lmao',
      ref: React.createRef(),
    });

    propositions.push(conclusion);

    this.setState({ propositions: [...propositions] });
  }

  validate() {
    const {
      propositions,
    } = this.state;

    const argument = new Argument(propositions
      .filter((proposition) => proposition.name !== 'Conclusion')
      .map((proposition) => proposition.ref.current.getPropositionObj()));

    const conclusion = propositions
      .find((proposition) => proposition.name === 'Conclusion')
      .ref.current.getPropositionObj();

    this.setState({ validationSuccessful: argument.argue(conclusion), alertVisible: true });
  }

  render() {
    const {
      validationSuccessful,
      alertVisible,
      propositions,
    } = this.state;
    return (
      <>
        <Form>
          {
            propositions.map((proposition) => {
              const { name, ref } = proposition;
              return <PropositionFormGroup ref={ref} name={name} />;
            })
          }
          <FormGroup style={{ display: 'inline-block' }}>
            <Button onClick={this.addProposition}><img style={{ height: '200px', width: '200px' }} src={plus} alt="plus" /></Button>
          </FormGroup>
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

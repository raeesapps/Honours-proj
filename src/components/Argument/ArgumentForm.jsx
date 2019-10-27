import React from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import PropositionFormGroup from '../Proposition/PropositionFormGroup';

import plus from '../../assets/img/plus.png';

class ArgumentForm extends React.Component {
  constructor(props) {
    super(props);
    const propositions = [
      {
        name: 'Premise',
        ref: React.createRef(),
      },
      {
        name: 'Premise',
        ref: React.createRef(),
      },
      {
        name: 'Conclusion',
        ref: React.createRef(),
      },
    ];
    this.state = {
      alertVisible: false,
      validationSuccessful: false,
      propositions,
    };
    this.addProposition = this.addProposition.bind(this);
  }

  addProposition() {
    const {
      propositions,
    } = this.state;

    const conclusion = propositions.pop();

    propositions.push({
      name: 'Premise',
      ref: React.createRef(),
    });

    propositions.push(conclusion);

    this.setState({
      propositions: [...propositions],
    });
  }

  render() {
    const {
      validationSuccessful,
      alertVisible,
      propositions,
    } = this.state;
    const {
      onSubmit
    } = this.props;
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
            <Button onClick={onSubmit}>Validate</Button>
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

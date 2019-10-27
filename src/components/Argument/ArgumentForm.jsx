import React from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import PremiseFormGroup from '../Premise/PremiseFormGroup';

import plus from '../../assets/img/plus.png';

class ArgumentForm extends React.Component {
  constructor(props) {
    super(props);
    const premises = [
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
      premises,
    };

    this.addPremise = this.addPremise.bind(this);
  }

  addPremise() {
    const {
      premises,
    } = this.state;

    const conclusion = premises.pop();

    premises.push({
      name: 'Premise',
      ref: React.createRef(),
    });

    premises.push(conclusion);

    this.setState({
      premises: [...premises],
    });
  }

  render() {
    const {
      validationSuccessful,
      alertVisible,
      premises,
    } = this.state;
    const {
      onSubmit,
    } = this.props;
    return (
      <>
        <Form>
          {
            premises.map((premise) => {
              const { name, ref } = premise;
              return <PremiseFormGroup ref={ref} name={name} />;
            })
          }
          <FormGroup style={{ display: 'inline-block' }}>
            <Button onClick={this.addPremise}><img style={{ height: '200px', width: '200px' }} src={plus} alt="plus" /></Button>
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

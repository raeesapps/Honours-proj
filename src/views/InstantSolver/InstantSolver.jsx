import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import ArgumentForm from '../../components/Argument/ArgumentForm';
import UninteractiveVennDiagram from '../../components/VennDiagram/UninteractiveVennDiagram';

import Argument from '../../logic/argument';

class InstantSolver extends React.Component {
  constructor(props) {
    super(props);

    this.argumentFormRef = React.createRef();
    this.vennDiagramRef = React.createRef();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm() {
    const argumentForm = this.argumentFormRef.current;
    const { premises } = argumentForm.state;
    const vennDiagram = this.vennDiagramRef.current;
    const argument = new Argument(premises
      .filter((premise) => premise.name !== 'Conclusion')
      .map((premise) => premise.ref.current.getPremiseObj()));
    const conclusion = premises
      .find((premise) => premise.name === 'Conclusion')
      .ref.current.getPremiseObj();
    vennDiagram.applyShading(argument);
    argumentForm.setState({ validationSuccessful: argument.argue(conclusion), alertVisible: true });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ArgumentForm onSubmit={this.onSubmitForm} ref={this.argumentFormRef} />
          </Col>
        </Row>
        <Row>
          <Col>
            <UninteractiveVennDiagram ref={this.vennDiagramRef} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default InstantSolver;

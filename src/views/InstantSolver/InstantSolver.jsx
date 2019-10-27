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
    const { propositions } = argumentForm.state;
    const vennDiagram = this.vennDiagramRef.current;
    const argument = new Argument(propositions
      .filter((proposition) => proposition.name !== 'Conclusion')
      .map((proposition) => proposition.ref.current.getPropositionObj()));
    const conclusion = propositions
      .find((proposition) => proposition.name === 'Conclusion')
      .ref.current.getPropositionObj();
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

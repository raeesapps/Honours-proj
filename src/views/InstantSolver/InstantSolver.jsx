import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ArgumentForm from '../../components/Argument/ArgumentForm';

function InstantSolver() {
  return (
    <Container>
      <Row>
        <Col>
          <ArgumentForm />
        </Col>
      </Row>
    </Container>
  );
}

export default InstantSolver;

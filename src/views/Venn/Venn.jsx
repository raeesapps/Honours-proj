import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import VennDiagram from '../../components/VennDiagram/VennDiagram';

function Venn() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <VennDiagram />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Venn;

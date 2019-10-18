import React from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';
import '../../assets/css/footer.css';

function Footer() {
  return (
    <footer className="footer">

      <Container>
        <Row>
          <Col>
            Soak Up Syllogisms was engineered by Raees Aamir and created as part of the Honours Project at The University of Edinburgh,
          </Col>
        </Row>
        <Row>
          <Col>
            and is licensed under a GNU General Public License (GNU GPL).
          </Col>
        </Row>
        <Row>
          <Col>
            <img alt="license" src="https://www.gnu.org/graphics/gplv3-with-text-84x42.png" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

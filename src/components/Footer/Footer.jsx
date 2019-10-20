import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import '../../assets/css/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            Soak Up Syllogisms was engineered by
            <a href="http://raeesaamir.net"> Raees Aamir </a>
            and created as part of the
            <a href="https://www.inf.ed.ac.uk/teaching/courses/proj/"> Honours Project </a>
            at
            <a href="https://ed.ac.uk"> The University of Edinburgh </a>
          </Col>
        </Row>
        <Row>
          <Col>
            and is licensed under a GNU General Public License (
            <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL</a>
            ).
          </Col>
        </Row>
        <Row>
          <Col>
            <img style={{ marginBottom: '10px' }} alt="license" src="https://www.gnu.org/graphics/gplv3-with-text-84x42.png" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

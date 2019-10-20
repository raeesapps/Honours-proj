import React from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';

function Home() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="lead">Welcome to Soak Up Syllogisms</h1>
              <p className="lead">Learn how to become an undefeated grandmaster of logical reasoning. Enjoy!</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ marginBottom: '10px' }}>
              Syllogisms are logical arguments that arrive at a conclusion based on two or more propositions. Soak Up Syllogisms is a tool to help you get familiar with logical reasoning with syllogisms. A number of exercises are available to help you understand the concepts more clearly, you can see the exercises on the practice section. If you are feeling confident, you can go to the quiz section to test yourself.
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ marginBottom: '10px' }}>
              If syllogisms are completely new to you then you should read the tutorial before proceeding onto the exercises. In the tutorial you will find explanations on the anatomy of a syllogism and how to represent and manipulate them diagrammatically.
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ marginBotom: '10px' }}>
              The web app also provides the instant solver where you can check if a syllogistic argument is valid.
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;

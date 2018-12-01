import React, { Component } from 'react';
import { Container, Row, Col, Fa, Button } from 'mdbreact';

class FeaturesPage extends Component {
  render() {
    return(
      <Container>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">Why is it so quality and prestige?</h2>
          <p className="lead grey-text w-responsive text-center mx-auto mb-5">We always try to bring customers peace of mind, trust when using products. Products are supplied to customers are always strict quality assurance and ensure the loyalty of customers and partners.</p>
          <Row>
            <Col md="4" className="md-0 mb-5">
              <Row>
                <Col lg="2" md="3" size="2">
                  <Fa icon="bullhorn" size="2x" className="blue-text"/>
                </Col>
                <Col lg="10" md="9" size="10">
                  <h4 className="font-weight-bold">Marketing</h4>
                  <p className="grey-text">We always try to bring customers peace of mind, trust when using products. Products are supplied to customers are always strict quality assurance and ensure the loyalty of customers and partners.</p>
                  <Button color="primary" size="sm">CONTACT US</Button>
                </Col>
              </Row>
            </Col>
            <Col md="4" className="md-0 mb-5">
              <Row>
                <Col lg="2" md="3" size="2">
                  <Fa icon="cogs" size="2x" className="pink-text"/>
                </Col>
                <Col lg="10" md="9" size="10">
                  <h4 className="font-weight-bold">Partner</h4>
                  <p className="grey-text">We always try to bring customers peace of mind, trust when using products. Products are supplied to customers are always strict quality assurance and ensure the loyalty of customers and partners.</p>
                  <Button color="pink" size="sm">CONTACT US</Button>
                </Col>
              </Row>
            </Col>
            <Col md="4" className="md-0 mb-5">
              <Row>
                <Col lg="2" md="3" size="2">
                  <Fa icon="dashboard" size="2x" className="purple-text"/>
                </Col>
                <Col lg="10" md="9" size="10">
                  <h4 className="font-weight-bold">Support</h4>
                  <p className="grey-text">We always try to bring customers peace of mind, trust when using products. Products are supplied to customers are always strict quality assurance and ensure the loyalty of customers and partners.</p>
                  <Button color="purple" size="sm">CONTACT US</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
      </Container>
    );
  };
}

export default FeaturesPage;
import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";

class FooterPage extends React.Component {
render() {
return (
<Footer color="blue" className="font-small pt-4 mt-4">
  <Container fluid className="text-center text-md-left">
    <Row>
      <Col md="6">
      <h5 className="title">Block Vision</h5>
      <p>
      Life will be better if everything becomes clean and transparent.
      </p>
      <p>
      The quality of the product is customer satisfaction.  
      </p>
      </Col>
      <Col md="6">
      <h5 className="title">Block Vision</h5>
      <ul>
        <li className="list-unstyled">
          <a href="#!">Hiếu Phan</a>
        </li>
        <li className="list-unstyled">
          <a href="#!">Hải Nguyễn</a>
        </li>
        <li className="list-unstyled">
          <a href="#!">Bảo Hưng</a>
        </li>
        <li className="list-unstyled">
          <a href="#!">Ấn Lê</a>
        </li>
      </ul>
      </Col>
    </Row>
  </Container>
  <div className="footer-copyright text-center py-3">
    <Container fluid>
      &copy; {new Date().getFullYear()} Copyright:{" "}
      <a href="https://www.hieudeptrai.com"> BlockState.com </a>
    </Container>
  </div>
</Footer>
);
}
}

export default FooterPage;
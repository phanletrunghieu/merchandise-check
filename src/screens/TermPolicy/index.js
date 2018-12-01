import React from "react";
import {  MDBRow, MDBCol, MDBIcon } from "mdbreact";

const TermPolicy = () => {
  return (
    <section className="my-5" style={{width: '85%',marginLeft: "auto",marginRight: "auto",marginTop: 20}}>
        <h2 className="h1-responsive font-weight-bold text-center my-5">
        You need to comply with these terms and policies
        </h2>
        <p className="lead grey-text w-responsive text-center mx-auto mb-5">
        The policies we offer to give you a healthy and clean brand, contributing to promoting your reputation and reputation go far with us. We always look in our customers and partners.
        </p>

        <MDBRow>
          <MDBCol lg="5" className="text-center text-lg-left">
            <img
              className="img-fluid"
              src="https://i.pinimg.com/originals/99/fd/ee/99fdee5fa7ff29484b0d5b49b0844ee8.jpg"
              alt=""
            />
          </MDBCol>
          <MDBCol lg="7">
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="mail-forward" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Safety</h5>
                <p className="grey-text">
                The policies we offer to give you a healthy and clean brand, contributing to promoting your reputation and reputation go far with us. We always look in our customers and partners.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="mail-forward" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Trust</h5>
                <p className="grey-text">
                The policies we offer to give you a healthy and clean brand, contributing to promoting your reputation and reputation go far with us. We always look in our customers and partners.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="mail-forward" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Honest</h5>
                <p className="grey-text">
                The policies we offer to give you a healthy and clean brand, contributing to promoting your reputation and reputation go far with us. We always look in our customers and partners.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </section>
  );
}

export default TermPolicy;
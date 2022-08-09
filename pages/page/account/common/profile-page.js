import React from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";

const ProfilePage = () => {
  return (
    <div className="contact-page register-page account-page">
      <Row>
        <Col sm="12">
          <h3>PERSONAL DETAIL</h3>
          <Form className="theme-form">
            <Row>
              <Col md="6">
                <Label for="name">First Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your name"
                  required=""
                />
              </Col>
              <Col md="6">
                <Label for="email">Last Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="last-name"
                  placeholder="Email"
                  required=""
                />
              </Col>
              <Col md="6">
                <Label for="review">Phone number</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="review"
                  placeholder="Enter your number"
                  required=""
                />
              </Col>
              <Col md="6">
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required=""
                />
              </Col>
              <Col md="12">
                <Label for="review">Write Your Message</Label>
                <textarea
                  className="form-control mb-0"
                  placeholder="Write Your Message"
                  id="exampleFormControlTextarea1"
                  rows="6"
                ></textarea>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;

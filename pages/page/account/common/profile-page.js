import React from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";
import { useForm } from "react-hook-form";

const ProfilePage = ({user, saveUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data !== "") {
      saveUser(data);
    } else {
      errors.showMessages();
    }
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="contact-page register-page account-page">
      <Row>
        <Col sm="12">
          <h3>PERSONAL DETAIL</h3>
          <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6">
                <Label for="name">First Name</Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your name"
                  {...register("first_name", { value: user?.first_name, required: true })}
                />
              </Col>
              <Col md="6">
                <Label for="email">Last Name</Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your last name"
                  {...register("last_name", { value: user?.last_name, required: true })}
                />
              </Col>
              <Col md="12">
                <Label for="email">Email</Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", { value: user?.email, required: true })}
                />
              </Col>
              <Col md="6">
                <Label for="review">Date Of Birth</Label>
                <input
                  type="date"
                  className="form-control"
                  name="date_of_birth"
                  max = {today}
                  {...register("date_of_birth", { value: user?.date_of_birth, required: true })}
                />
              </Col>
            </Row>
            <button type="submit" className="btn btn-solid">
              save
            </button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;

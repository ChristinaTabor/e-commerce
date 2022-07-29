import React from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Form, Label, Col } from "reactstrap";

const NewAddress = ({ address, saveAddress }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data !== "") {
      saveAddress({
        data,
        action: address._id ? "edit" : "create",
      });
      reset();
    } else {
      errors.showMessages();
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="12">
          <h3>New Address</h3>
          <div className="theme-card">
            <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md="12" className="form-col">
                  <Label for="title">Title</Label>
                  <input
                    type="text"
                    className={`${errors.title ? "error_border" : ""}`}
                    name="title"
                    {...register("title", { value: address?.title, required: true })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12" className="form-col">
                  <Label for="review">Country</Label>
                  <input
                    className={`${errors.country ? "error_border" : ""}`}
                    name="country"
                    {...register("country", { value: address?.country, required: true })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12" className="form-col">
                  <Label for="review">City</Label>
                  <input
                    className={`${errors.city ? "error_border" : ""}`}
                    name="city"
                    {...register("city", { value: address?.city, required: true })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12" className="form-col">
                  <Label for="review">State</Label>
                  <input
                    className={`${errors.state ? "error_border" : ""}`}
                    name="state"
                    {...register("state", { value: address?.state, required: true })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12" className="form-col">
                  <Label for="review">Address</Label>
                  <input
                    className={`${errors.address ? "error_border" : ""}`}
                    name="address"
                    {...register("address", { value: address?.address, required: true })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12" className="form-col">
                  <Label for="review">Postal Code</Label>
                  <input
                    type="number"
                    className={`${errors.postal_code ? "error_border" : ""}`}
                    name="postal_code"
                    {...register("postal_code", {
                      value: address?.postal_code,
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12" className="form-col">
                  <Label for="review">Phone</Label>
                  <input
                    className={`${errors.phone ? "error_border" : ""}`}
                    name="phone"
                    {...register("phone", { value: address?.phone, required: true })}
                  />
                </Col>
              </Row>
              <button type="submit" className="btn btn-solid">
                save address
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewAddress;

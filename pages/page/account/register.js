import React from "react";
import { useForm } from "react-hook-form";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Form, Label, Col } from "reactstrap";
import { userRegister } from "../../../services/api/user.service";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data !== "") {
      userRegister(data)
        .then((_) => {
          router.push("page/account/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      errors.showMessages();
    }
  };

  return (
    <CommonLayout parent="home" title="register">
      <section className="register-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <h3>create account</h3>
              <div className="theme-card">
                <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="6" className="form-col">
                      <Label for="email">First Name</Label>
                      <input
                        type="text"
                        className={`${errors.first_name ? "error_border" : ""}`}
                        name="first_name"
                        placeholder="First Name"
                        {...register("first_name", { required: true })}
                      />
                    </Col>
                    <Col md="6" className="form-col">
                      <Label for="review">Last Name</Label>
                      <input
                        className={`${errors.last_name ? "error_border" : ""}`}
                        name="last_name"
                        placeholder="Last Name"
                        {...register("last_name", { required: true })}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="form-col">
                      <Label for="email">email</Label>
                      <input
                        type="text"
                        className={`${errors.email ? "error_border" : ""}`}
                        name="email"
                        placeholder="Email"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                    </Col>
                    <Col md="6" className="form-col">
                      <Label for="review">Password</Label>
                      <input
                        type="password"
                        className={`${errors.password ? "error_border" : ""}`}
                        name="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                      />
                    </Col>
                    <button type="submit" className="btn btn-solid">
                      create Account
                    </button>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Register;

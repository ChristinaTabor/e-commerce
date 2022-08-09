import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Form, Label, Input, Col } from "reactstrap";
import { userLogin } from "../../../services/api/user.service";
import UserContext from "../../../helpers/user/UserContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data !== "") {
      const user = await userLogin(data.email, data.password).catch((err) => {
        toast.error(err.message || "Error! Please try again later");
      });

      if (user) {
        context.setUser(user);
        router.push("/page/account/dashboard");
      }
    } else {
      errors.showMessages();
    }
  };

  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <Label for="email">Email</Label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <Label for="review">Password</Label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <button type="submit" className="btn btn-solid">
                    Login
                  </button>
                </Form>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create A Account</h6>
                <p>
                  Sign up for a free account at our store. Registration is quick and easy.
                  It allows you to be able to order from our shop. To start shopping click
                  register.
                </p>
                <a href="/page/account/register" className="btn btn-solid">
                  Create an Account
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;

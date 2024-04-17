import React, {useState} from "react";
import { useForm } from "react-hook-form";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Form, Label, Col, Spinner } from "reactstrap";
import { userRegister } from "../../../services/api/user.service";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { countryList } from "../../../services/countries";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data !== "") {
      setLoading(true);
      userRegister(data)
        .then((_) => {
          toast.success("Register is successfully");
          router.push("login");
        })
        .catch((err) => {
          toast.error(err.message || "Error! Please try again later");
        })
        .finally(() => {
          setLoading(false);
        });

    } else {
      errors.showMessages();
    }
  };

  const today = new Date().toISOString().split("T")[0];
  

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
                    <Label for="review">Date Of Birth</Label>
                      <input
                      
                        type="date"
                        className={`${errors.date_of_birth ? "error_border" : ""}`}
                        name="date_of_birth"
                        max = {today}
                        {...register("date_of_birth", { required: true })}
                      />
                      {/* <Label for="review">Date Of Birth</Label>
                      <input
                        type="date"
                        className={`${errors.date_of_birth ? "error_border" : ""}`}
                        name="date_of_birth"
                        {...register("date_of_birth", { required: true,
                        validate:{
                          notFutureDate: value => {
                            const selectedDate =new Date(value);
                            const today = new Date();
                            return selectedDate <= today;
                          }
                        } 
                      })}
                      />
                      {errors.date_of_birth && errors.date_of_birth.type === "notFutureDate" && (
                      <span className="error_message">Invalid date of Birth!</span>
                      )} */}
                    </Col>
                  </Row>
                  <Row>
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
                  </Row>
                    <Row>
                      <Col md="12">
                        <div className="checkout-title">
                          <h3>Billing Details</h3>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <Label>Country</Label>
                        <select
                          className="form-group form-control"
                          placeholder="Country"
                          {...register("userData.country", { required: true })}
                        >
                          {countryList.map((country) => (
                            <option value={country.code} key={country.code}>{country.name}</option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Label>Address</Label>
                        <input
                          className="form-group form-control"
                          placeholder="Address"
                          {...register("userData.address", { required: true })}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Label>Town / City</Label>
                        <input
                          className="form-group form-control"
                          placeholder="Town/City"
                          {...register("userData.city", { required: true })}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Label>State / County</Label>
                        <input
                          className="form-group form-control"
                          placeholder="State / County"
                          {...register("userData.state", { required: true })}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Label>Postal Code</Label>
                        <input
                          className="form-group form-control"
                          placeholder="Postal Code"
                          {...register("userData.postal_code")}
                        />
                      </Col>
                    </Row>
                  <Row>
                  <Col md="12">
                        <Label>Phone Number</Label>
                        <input
                          type="tel"
                          className="form-group form-control"
                          placeholder="Phone Number"
                          {...register("userData.phone", { required: true })}
                        />
                      </Col>
                  </Row>
                  <Row>
                    <button type="submit" className="btn btn-solid" diasabled={loading}>
                      {loading ? <Spinner animation="border" /> : "Create Account"}
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

import React, { useContext, useState, useCallback } from "react";
import { Container, Form, Row, Col, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { httpPost } from "../../services/api/data.service";

const Gateway = () => {
  const month = ["Month", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const year = [
    "Year",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];

  const [obj, setObj] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [creq, setCreq] = useState("");

  const onSubmit = (data) => {
    if (data !== "") {
      const products = [];

      cartItems.forEach((el) => {
        products.push({ _id: el._id, qty: el.qty });
      });

      const metaData = {
        browserIP: "192.168.1.107",
        browserUserAgent: navigator.userAgent,
        browserLanguage: navigator.language,
        browserJavaEnabled: navigator.javaEnabled(),
        browserScreenWidth: screen.width,
        browserScreenHeight: screen.height,
        browserColorDepth: screen.colorDepth,
        browserTZ: new Date().getTimezoneOffset(),
      };

      // httpPost("placeOrder", {
      //   userData: Object.keys(data).length ? data.userData : userContext.user,
      //   cardData: data.cardData,
      //   productData: products,
      //   metaData: metaData,
      // })
      //   .then((res) => {
      //     if (!res) {
      //       return;
      //     }

      //     if (res.messagetype == "threeDSRes") {
      //       setCreq(res.message.creq);
      //       if (typeof document.getElementById("creq-form").submit === "object") {
      //         document.getElementById("creq-form").submit.remove();
      //       }
      //       document.getElementById("creq-form").submit();
      //       return;
      //     }

      //     router.push({
      //       pathname: "/page/order-success",
      //       state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
      //       query: JSON.stringify({ status: "successful", refNo: res.message.refNo }),
      //     });
      //   })
      //   .catch(() => {});
    } else {
      errors.showMessages();
    }
  };

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };

  return (
    <section className="section-b-space gateway">
      <form
        autoComplete="off"
        action="https://www.threedsecurempi.com/EMVTDS/AUT?Action=ProcessCReq"
        method="post"
        id="creq-form"
      >
        <input type="hidden" name="creq" value={creq} />
      </form>
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="main-row">
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-details">
                    <div className="payment-box">
                      <Row>
                        <Col md="12">
                          <div className="checkout-title">
                            <h3>Credit Card Details</h3>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Label>Card Number</Label>
                          <input
                            type="tel"
                            className="form-group form-control"
                            placeholder="Card Number"
                            minLength="16"
                            maxLength="16"
                            {...register("cardData.cardNumber", {
                              required: true,
                              maxLength: 16,
                              minLength: 16,
                            })}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Label>First Name</Label>
                          <input
                            type="text"
                            className="form-group form-control"
                            placeholder="First Name"
                            {...register("cardData.firstName", {
                              required: true,
                            })}
                          />
                        </Col>
                        <Col md="6">
                          <Label>Lats Name</Label>
                          <input
                            type="tel"
                            className="form-group form-control"
                            placeholder="Lats Name"
                            {...register("cardData.lastName", {
                              required: true,
                            })}
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
                            {...register("cardData.phoneNumber", {
                              required: true,
                            })}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Exp Date</Label>
                          <select
                            {...register("cardData.month", {
                              required: true,
                            })}
                          >
                            {month.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </Col>
                        <Col md="4">
                          <Label>&nbsp;</Label>
                          <select
                            {...register("cardData.year", {
                              required: true,
                            })}
                          >
                            {year.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </Col>
                        <Col md="4">
                          <Label>CVC</Label>
                          <input
                            type="tel"
                            className="form-group form-control"
                            placeholder="CVC"
                            maxLength="4"
                            minLength="3"
                            {...register("cardData.cvc", {
                              required: true,
                              maxLength: 4,
                              minLength: 3,
                            })}
                          />
                        </Col>
                      </Row>
                      <button type="submit" className="btn btn-solid">
                        Pay
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Gateway;

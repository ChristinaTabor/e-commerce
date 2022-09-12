import React, { useContext, useState, useCallback } from "react";
import { Container, Form, Row, Col, Label, Spinner } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import cards from "../../../../public/assets/img/cards.png";

import UserContext from "../../../../helpers/user/UserContext";
import { httpPost } from "../../../../services/api/data.service";

const CheckoutPage = () => {
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

  const [isSubmiting, setIsSubmiting] = useState(false);
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
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

      const userData = data.userData && Object.keys(data.userData).length ? data.userData : userContext.user

      setIsSubmiting(true)
      
      httpPost("placeOrder", {
        userData: userData,
        cardData: data.cardData,
        productData: products,
        metaData: metaData,
      })
        .then((res) => {
          if (!res) {
            return;
          }

          if (res.messagetype == "threeDSRes") {
            setCreq(res.message.creq);
            if (typeof document.getElementById("creq-form").submit === "object") {
              document.getElementById("creq-form").submit.remove();
            }
            document.getElementById("creq-form").submit();
            return;
          }

          router.push({
            pathname: "/page/order-success",
            state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
            query: JSON.stringify({ status: "successful", refNo: res.message.refNo }),
          });
        })
        .catch(() => {})
        .finally(() => setIsSubmiting(false))
    } else {
      errors.showMessages();
    }
  };

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };

  return (
    <section className="section-b-space">
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
                {!userContext.user && (
                  <Col lg="6" sm="12" xs="12">
                    <Row>
                      <Col md="12">
                        <div className="checkout-title">
                          <h3>Billing Details</h3>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label>First Name</Label>
                        <input
                          className="form-group form-control"
                          placeholder="First Name"
                          {...register("userData.first_name", { required: true })}
                        />
                      </Col>
                      <Col md="6">
                        <Label>Last Name</Label>
                        <input
                          className="form-group form-control"
                          placeholder="Last Name"
                          {...register("userData.last_name", { required: true })}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label>Phone</Label>
                        <input
                          className="form-group form-control"
                          placeholder="Phone"
                          {...register("userData.phone", { pattern: /\d+/ })}
                        />
                      </Col>
                      <Col md="6">
                        <Label>Email Address</Label>
                        <input
                          className="form-group form-control"
                          placeholder="Email Address"
                          {...register("userData.email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
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
                          <option>United State</option>
                          <option>Australia</option>
                          <option>South Africa</option>
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
                  </Col>
                )}
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Product <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item, index) => (
                            <li key={index}>
                              {item.title} × {item.qty}{" "}
                              <span>
                                {symbol}
                                {item.total}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <Row>
                          <Col md="12">
                            <div className="checkout-title">
                              <h3>Credit Card Details</h3>
                            </div>
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
                        <Row>
                          <Col md="12">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <div className="check-box-container">
                              <div className="check-box">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setTermsChecked(e.target.checked);
                                  }}
                                />
                                <label> Terms & Conditions</label>
                              </div>
                              <div className="check-box">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setPrivacyChecked(e.target.checked);
                                  }}
                                />
                                <label> Privacy Policy</label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <button
                          type="submit"
                          className="btn btn-solid place-order-btn"
                          disabled={!termsChecked || !privacyChecked}
                        >
                          {isSubmiting ? <Spinner animation="border" /> : 'Place Order'}
                        </button>
                        <Row>
                          <Col md="12">
                            <span>Your charge descriptor is: test.com</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <img className="cards" src={cards.src} />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;

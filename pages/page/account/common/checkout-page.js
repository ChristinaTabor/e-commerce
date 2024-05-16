import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Row, Col, Label, Spinner } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import CurrencyContext from "../../../../helpers/Currency/CurrencyContext";
import cards from "../../../../public/assets/img/cards.png";

import UserContext from "../../../../helpers/user/UserContext";
import { httpPost } from "../../../../services/api/data.service";
import { verifyToken } from "../../../../services/api/user.service";
import { toast } from "react-toastify";
import { countryList } from "../../../../services/countries";

const CheckoutPage = () => {
  const month = ["Month", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const year = [
    "Year",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const currency = curContext.selectedCurr;
  const symbol = curContext.selectedCurr.symbol;
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter()

  const onSubmit = (data) => {
    if (!data) {
      errors.showMessages();
      return;
    }

    const products = [];

    cartItems.forEach((el) => {
      products.push({ _id: el._id, qty: el.qty });
    });

    const metaData = {
      browserIP: "192.168.1.107",
      browserUserAgent: navigator.userAgent,
      browserLanguage: navigator.language,
      browserJavaEnabled: navigator.javaEnabled(),
      browserScreenWidth: window.screen.width,
      browserScreenHeight: window.screen.height,
      browserColorDepth: window.screen.colorDepth,
      browserTZ: new Date().getTimezoneOffset(),
    };

    const customer =
      data.userData && Object.keys(data.userData).length
        ? data.userData
        : userContext.user;

    setIsSubmiting(true);

    let postBody = {
      customer: { ...customer },
      creditCard: data.creditCard,
      productData: products,
      metaData: metaData,
    }

    if (customer.addresses && customer.addresses[0]) {
      postBody = { ...postBody, ...customer.addresses[0] }
    }

    httpPost("placeOrder", postBody)
      .then((res) => {
        if (!res) {
          return;
        }
        const redirectUrl = res.message?.redirectUrl;
        if (res.message.error) {
          toast.error(res.message.error);
          return;
        }
        if (redirectUrl) {
          localStorage.setItem("successCart", JSON.stringify({ items: cartItems, total: cartTotal }))
          cartContext.setCartItems([]);
          window.location.href = res.message.redirectUrl;
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setIsSubmiting(false));

  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="section-b-space">
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
                      <Col md="6" className="form-col">
                        <Label for="review">Date Of Birth</Label>
                        <input
                          type="date"
                          //className={`${errors.date_of_birth ? "error_border" : ""}`}
                          className="form-group form-control"
                          name="date_of_birth"
                          max={today}
                          {...register("userData.date_of_birth", { required: true })}
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
                          {...register("userData.phone", {
                            required: true,
                          })}
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
                                {(item.total * currency.value).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              {symbol}
                              {(cartTotal * currency.value).toFixed(2)}
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
                          <Col md="12">
                            <Label>Card Holder</Label>
                            <input
                              type="text"
                              className="form-group form-control"
                              placeholder="Card Holder"
                              {...register("creditCard.holder", {
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
                              {...register("creditCard.number", {
                                required: true,
                                maxLength: 16,
                                minLength: 16,
                              })}
                            />
                          </Col>
                        </Row>
                        <Row>

                          <Col md="4">
                            <Label>Exp Date</Label>
                            <select
                              {...register("creditCard.expiryMonth", {
                                required: true,
                                validate: (value) => value !== 'Month',
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
                              {...register("creditCard.expiryYear", {
                                required: true,
                                validate: (value) => value !== 'Year',
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
                            <Label>&nbsp;</Label>
                            <input
                              type="tel"
                              className="form-group form-control"
                              placeholder="CVC/CVV"
                              maxLength="4"
                              minLength="3"
                              {...register("creditCard.cvv", {
                                required: true,
                                maxLength: 4,
                                minLength: 3,
                              })}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            By proceeding, you are confirming that you have read and accepted the Terms & Conditions and Privacy Policy.
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
                          disabled={!termsChecked || !privacyChecked || isSubmiting || Object.keys(errors).length > 0}
                        >
                          {isSubmiting ? <Spinner animation="border" /> : "Place Order"}
                        </button>
                        {/* <Row>
                          <Col md="12">
                            <span>Your charge descriptor is: test.com</span>
                          </Col>
                        </Row> */}
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

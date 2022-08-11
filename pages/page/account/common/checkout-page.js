import React, { useContext, useState, useCallback } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import mastercard from "../../../../public/assets/img/mastercard.png";
import visa from "../../../../public/assets/img/visa.png";
import chip from "../../../../public/assets/img/chip.png";

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [obj, setObj] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    firstName: "",
    lastName: "",
    expireDate: "",
    cvc: "",
  });
  const [backSide, setBackSide] = useState(false);
  const [cardType, setCardType] = useState(mastercard);

  const onSubmit = (data) => {
    if (data !== "") {
      console.log("data", data);
      console.log("cardData", cardForm);
      // alert("You submitted the form and stuff!");
      // router.push({
      //   pathname: "/page/order-success",
      //   state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
      // });
    } else {
      errors.showMessages();
    }
  };

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };

  const formatCardNumber = (value) => {
    setCardForm({
      ...cardForm,
      cardNumber: value.replace(/\s/g, "").replace(/\d{4}(?=.)/g, "$& "),
    });
    if (cardForm.cardNumber[0] == 4) {
      // visa
      setCardType(visa);
    } else {
      // mastercard
      setCardType(mastercard);
    }
  };

  const formatExpireDate = (value) => {
    let newValue = value;
    if (value.length > 2) {
      newValue = value.substring(0, 2) + "/" + value.substring(2 + 1);
    }
    setCardForm({
      ...cardForm,
      expireDate: newValue,
    });
  };

  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Billing Details</h3>
                  </div>
                  <div className="row check-out">
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">First Name</div>
                      <input
                        type="text"
                        className={`${errors.first_name ? "error_border" : ""}`}
                        name="first_name"
                        {...register("first_name", { required: true })}
                      />
                      <span className="error-message">
                        {errors.first_name && "First name is required"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Last Name</div>
                      <input
                        type="text"
                        className={`${errors.last_name ? "error_border" : ""}`}
                        name="last_name"
                        {...register("last_name", { required: true })}
                      />
                      <span className="error-message">
                        {errors.last_name && "Last name is required"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Phone</div>
                      <input
                        type="text"
                        name="phone"
                        className={`${errors.phone ? "error_border" : ""}`}
                        {...register("phone", { pattern: /\d+/ })}
                      />
                      <span className="error-message">
                        {errors.phone && "Please enter number for phone."}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Email Address</div>
                      <input
                        className={`${errors.email ? "error_border" : ""}`}
                        type="text"
                        name="email"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      <span className="error-message">
                        {errors.email && "Please enter proper email address ."}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Country</div>
                      <select name="country" {...register("country", { required: true })}>
                        <option>India</option>
                        <option>South Africa</option>
                        <option>United State</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Address</div>
                      <input
                        className={`${errors.address ? "error_border" : ""}`}
                        type="text"
                        name="address"
                        {...register("address", { required: true, min: 20, max: 120 })}
                        placeholder="Street address"
                      />
                      <span className="error-message">
                        {errors.address && "Please right your address ."}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Town/City</div>
                      <input
                        type="text"
                        className={`${errors.city ? "error_border" : ""}`}
                        name="city"
                        {...register("city", { required: true })}
                        onChange={setStateFromInput}
                      />
                      <span className="error-message">
                        {errors.city && "select one city"}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">State / County</div>
                      <input
                        type="text"
                        className={`${errors.state ? "error_border" : ""}`}
                        name="state"
                        {...register("state", { required: true })}
                        onChange={setStateFromInput}
                      />
                      <span className="error-message">
                        {errors.state && "select one state"}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Postal Code</div>
                      <input
                        type="text"
                        name="pincode"
                        className={`${errors.pincode ? "error_border" : ""}`}
                        {...register("pincode", { pattern: /\d+/ })}
                      />
                      <span className="error-message">
                        {errors.pincode && "Required integer"}
                      </span>
                    </div>
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <input type="checkbox" name="create_account" id="account-option" />
                      &ensp; <label htmlFor="account-option">Create An Account?</label>
                    </div>
                  </div>
                </Col>
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
                        <ul className="sub-total">
                          <li>
                            Subtotal{" "}
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                          <li>
                            Shipping
                            <div className="shipping">
                              <div className="shopping-option">
                                <input
                                  type="checkbox"
                                  name="free-shipping"
                                  id="free-shipping"
                                />
                                <label htmlFor="free-shipping">Free Shipping</label>
                              </div>
                              <div className="shopping-option">
                                <input
                                  type="checkbox"
                                  name="local-pickup"
                                  id="local-pickup"
                                />
                                <label htmlFor="local-pickup">Local Pickup</label>
                              </div>
                            </div>
                          </li>
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
                        <div className="custom-card-container">
                          <div className={`card-container ${backSide && "back-side"}`}>
                            <div className="front">
                              <div className="top">
                                <img className="chip" src={chip.src} />
                                <img className="logo" src={cardType.src} />
                              </div>
                              <span className="card-number">{cardForm.cardNumber}</span>
                              <div className="bottom">
                                <span className="user-name">
                                  {cardForm.firstName + " " + cardForm.lastName}
                                </span>
                                <div className="valid-container">
                                  <span>
                                    VALID
                                    <br />
                                    DATE
                                  </span>
                                  <span>{cardForm.expireDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="back">
                              <div className="top-back"></div>
                              <span></span>
                              <div className="middle-back">
                                <div className="left">
                                  <span>{cardForm.cvc}</span>
                                </div>
                              </div>
                              <div className="bottom-back">
                                <div className="sticky"></div>
                                <span>
                                  Lorem ipsum dolor sit, amet consectetur adipisicing
                                  elit. Dolorem totam, consequuntur reiciendis nihil
                                  labore ipsa sed! Magnam fugiat cum, iure nihil quasi
                                  sunt delectus voluptate!
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="card-data">
                            <input
                              placeholder="Card Number"
                              type="tel"
                              maxLength="19"
                              minLength="19"
                              value={cardForm.cardNumber}
                              onChange={(e) => formatCardNumber(e.target.value)}
                            />
                            <div className="card-data-middle">
                              <input
                                placeholder="First Name"
                                type="text"
                                onChange={(e) =>
                                  setCardForm({
                                    ...cardForm,
                                    firstName: e.target.value,
                                  })
                                }
                              />
                              <input
                                placeholder="Lats Name"
                                type="text"
                                onChange={(e) =>
                                  setCardForm({
                                    ...cardForm,
                                    lastName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="card-data-bottom">
                              <input
                                placeholder="Exp Date"
                                maxLength="7"
                                minLength="7"
                                type="text"
                                value={cardForm.expireDate}
                                onChange={(e) => formatExpireDate(e.target.value)}
                              />
                              <input
                                placeholder="CVC"
                                type="text"
                                maxLength="3"
                                minLength="3"
                                onFocus={() => setBackSide(true)}
                                onBlur={() => setBackSide(false)}
                                onChange={(e) =>
                                  setCardForm({
                                    ...cardForm,
                                    cvc: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <button type="submit" className="btn-solid btn">
                            Place Order
                          </button>
                        </div>
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

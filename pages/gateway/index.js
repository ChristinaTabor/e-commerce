import React, { useState } from "react";
import { Container, Form, Row, Col, Label, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const cubixpayUrl = "https://spica.cubixpay.com";
const Gateway = () => {
  const purchaseUrl = `${cubixpayUrl}/api/fn-execute/payment/purchase`;
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
  const [obj, setObj] = useState({});
  const [resultObj, setResultObj] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { referenceNo, result } = router.query;
  const [creq, setCreq] = useState("");

  if (result) {
    result = JSON.parse(result);
    if (!resultObj) {
      setResultObj(result);
    }
  }
  
  const onSubmit = (data) => {
    if (data !== "") {
      setIsSubmiting(true);

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

      const obj = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creditCard: {
            holder: data.cardData.holder,
            number: data.cardData.cardNumber,
            expiryMonth: data.cardData.month,
            expiryYear: data.cardData.year,
            cvv: data.cardData.cvc,
          },
          referenceNo: referenceNo,
          description: "",
          bankDescriptor: "",
          is3d: "",
          only3d: "",
          isPreAuth: "",
          returnUrl: "",
          browserMetadata: metaData,
          isProvison: true,
        }),
      };

      fetch(purchaseUrl, obj)
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }

          const resErr = await res.json();
          throw resErr.message.error || "Something went wrong";
        })
        .then((resJson) => {
          console.log("resJson", resJson);
          if (resJson.status == "failure") {
            toast.error(resJson.message.error);
            return;
          }

          if (resJson.messagetype == "threeDSRes") {
            setCreq(resJson.message.creq);
            if (typeof document.getElementById("creq-form").submit === "object") {
              document.getElementById("creq-form").submit.remove();
            }
            document.getElementById("creq-form").submit();
            return;
          }
        })
        .catch((err) => toast.error(err))
        .finally(() => setIsSubmiting(false));
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
      {resultObj ? (
        <section className="section-b-space light-layout">
          <Container>
            <Row>
              <Col md="12">
                {result.status == "successful" ? (
                  <div className="result-text success-text">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2>thank you</h2>
                    <p>Payment is successfully processsed</p>
                    <p>Reference No:{result.referenceNo}</p>
                  </div>
                ) : (
                  <div className="result-text fail-text">
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                    <h2>payment failure</h2>
                    <p>An error occurred during payment. Please try again later</p>
                    <p>Reference No:{result.referenceNo}</p>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
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
                          <Col md="12">
                            <Label>Card Holder</Label>
                            <input
                              type="text"
                              className="form-group form-control"
                              placeholder="Card Holder"
                              {...register("cardData.holder", {
                                required: true,
                              })}
                            />
                          </Col>
                          {/* <Col md="6">
                            <Label>Lats Name</Label>
                            <input
                              type="tel"
                              className="form-group form-control"
                              placeholder="Lats Name"
                              {...register("cardData.lastName", {
                                required: true,
                              })}
                            />
                          </Col> */}
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
                        <button
                          type="submit"
                          className="btn btn-solid"
                          disabled={isSubmiting}
                        >
                          {isSubmiting ? <Spinner animation="border" /> : "Pay"}
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Container>
      )}
    </section>
  );
};

export default Gateway;

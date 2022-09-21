import React, { useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";
import CartContext from "../../helpers/cart";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import { useRouter } from "next/router";

const OrderSuccess = () => {
  const router = useRouter();

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;

  const result = JSON.parse(router.query.result);

  return (
    <CommonLayout parent="home" title="order success">
      <section className="section-b-space light-layout">
        <Container>
          <Row>
            <Col md="12">
              {result.status == "successful" ? (
                <div className="result-text success-text">
                  <i className="fa fa-check-circle" aria-hidden="true"></i>
                  <h2>thank you</h2>
                  <p>Payment is successfully processsed</p>
                  <p>Reference No:{result.refNo}</p>
                </div>
              ) : (
                <div className="result-text fail-text">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                  <h2>payment failure</h2>
                  <p>An error occurred during payment. Please try again later</p>
                  <p>Reference No:{result.refNo}</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <div className="product-order">
                <h3>your order details</h3>

                {cartItems.map((item, i) => (
                  <Row className="product-order-detail" key={i}>
                    <Col xs="3">
                      <Media
                        src={item.images[0].src}
                        alt=""
                        className="img-fluid blur-up lazyload"
                      />
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>product name</h4>
                        <h5>{item.title}</h5>
                      </div>
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>quantity</h4>
                        <h5>{item.qty}</h5>
                      </div>
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>price</h4>
                        <h5>
                          {symbol}
                          {item.price}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                ))}
                <div className="total-sec">
                  <ul>
                    <li>
                      subtotal{" "}
                      <span>
                        {symbol}
                        {cartTotal}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="final-total">
                  <h3>
                    total{" "}
                    <span>
                      {symbol}
                      {cartTotal}
                    </span>
                  </h3>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <Row className="order-success-sec">
                <Col sm="6">
                  <h4>summery</h4>
                  <ul className="order-detail">
                    <li>Reference No: {result.refNo}</li>
                    <li>Order Date: {new Date().toLocaleDateString()}</li>
                    <li>Order Total: ${cartTotal}</li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default OrderSuccess;

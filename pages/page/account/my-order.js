import React, { useState, useContext } from "react";
import { Row, Col } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import AccountLayout from "../../../components/account/account-layout";
import CurrencyContext from "../../../helpers/Currency/CurrencyContext";


const status_msg = {
  PENDING_PAYMENT: 'Pending Payment',
  ORDER_PROCESSING: 'Order Processing',
  SHIPPED: 'Shipped',
  CANCELED: 'Canceled'
}

const MyOrder = () => {
  const userContext = useContext(UserContext);
  const currencyContext = useContext(CurrencyContext);
  const user = userContext.user;
  const currency = currencyContext.selectedCurr;
  
  return (
    <>
      <AccountLayout>
        <div className="my-order">
          <div className="page-title top-sec">
            <h2>My Orders</h2>
          </div>
          <div className="order-section">
            <Row className="header">
              <Col lg="2">Reference Id</Col>
              <Col lg="4">Product</Col>
              <Col lg="2">Quantity</Col>
              <Col lg="2">Price</Col>
              <Col lg="2">Status</Col>
            </Row>
            {user?.orders.map((order) => (
              <Row>
                <Col lg="2">{order.reference_no}</Col>
                <Col lg="4" className="product">
                  {order.products.map((soldProduct) => (
                    <span>
                      <img src={soldProduct.product.images[0].src} />
                      {soldProduct.product.title}
                    </span>
                  ))}
                </Col>
                <Col lg="2">
                  {order.products.map((soldProduct) => (
                    <span>{soldProduct.quantity}</span>
                  ))}
                </Col>
                <Col lg="2">
                  {order.products.map((soldProduct) => (
                    <span>{currency.symbol} {(soldProduct.price * soldProduct.quantity * currency.value).toFixed(2)}</span>
                  ))}
                </Col>
                <Col lg="2">
                  <span className={`status ${order.status}`}>
                    {status_msg[order.status]}
                  </span>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </AccountLayout>
    </>
  );
};

export default MyOrder;

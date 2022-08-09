import React, { useState, useContext } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import { useRouter } from "next/router";
import AccountLayout from "../../../components/account/account-layout";
import NewAddress from "../../../components/account/new-address";
import { buckets, post, patch, remove, update } from "../../../services/api/data.service";

const MyOrder = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  return (
    <>
      <AccountLayout>
        <div className="my-order">
          <div className="page-title top-sec">
            <h2>My Orders</h2>
          </div>
          <div className="order-section">
            <Row className="header">
              <Col lg="2">Order Id</Col>
              <Col lg="4">Product</Col>
              <Col lg="2">Quantity</Col>
              <Col lg="2">Price</Col>
              <Col lg="2">Status</Col>
            </Row>
            {user?.orders.map((order) => (
              <Row>
                <Col lg="2">{order.order_id}</Col>
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
                    <span>${soldProduct.price * soldProduct.quantity}</span>
                  ))}
                </Col>
                <Col lg="2">
                  <span className={`status ${order.status}`}>
                  {order.status}
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

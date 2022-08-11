import React, { useState, useContext } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Col } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import { useRouter } from "next/router";
import AccountLayout from "../../../components/account/account-layout";

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const user = userContext.user;

  const navigateToPage = (path) => {
    router.push(path);
  };

  return (
    <AccountLayout>
      <div className="dashboard">
        <div className="page-title">
          <h2>My Dashboard</h2>
        </div>
        <div className="welcome-msg">
          <p>
            Hello, {user.first_name} {user.last_name}!
          </p>
          <p>
            From your My Account Dashboard you have the ability to view a snapshot of your
            recent account activity and update your account information. Select a link
            below to view or edit information.
          </p>
        </div>
        <div className="box-account box-info">
          <div className="box-head">
            <h2>Account Information</h2>
          </div>
          <Row>
            <Col>
              <div className="box">
                <div className="box-title">
                  <h3>Contact Information</h3>
                  <a onClick={() => navigateToPage("profile")}>Edit</a>
                </div>
                <div className="box-content">
                  <h6>
                    {user.first_name} {user.last_name}
                  </h6>
                  <h6>{user.email}</h6>
                  <h6>
                    <a onClick={() => navigateToPage("change-password")}>Change Password</a>
                  </h6>
                </div>
              </div>
            </Col>
          </Row>
          <div>
            <div className="box">
              <div className="box-title">
                <h3>Address Book</h3>
              </div>
              <Row>
                <Col>
                  <h6>Default Shipping Address</h6>
                  <address>
                    {user.addresses[0]
                      ? `${user.addresses[0].address} ${user.addresses[0].state}/${user.addresses[0].city}`
                      : "You have not set a default shipping address."}

                    <br />
                    <a onClick={() => navigateToPage("address-book")}>Edit Address</a>
                  </address>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Dashboard;

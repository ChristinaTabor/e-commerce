import React, { useState, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import UserContext from "../../helpers/user/UserContext";
import CommonLayout from "../shop/common-layout";
import { useRouter } from "next/router";

const AccountLayout = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState(false);
  const userContext = useContext(UserContext);
  const router = useRouter();

  let pathArr = router.pathname.split("/");
  let activePath = pathArr[pathArr.length - 1];

  const handleLogout = () => {
    navigateToPage("/page/account/login");
    userContext.setUser();
    //userLogout();
    
  };

  const navigateToPage = (path) => {
    router.push(path);
  };

  return (
    <CommonLayout parent="home" title="dashboard">
      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="3">
              {window.innerWidth <= 991 ? (
                <div
                  className="account-sidebar"
                  onClick={() => setAccountInfo(!accountInfo)}
                >
                  <a className="popup-btn">my account</a>
                </div>
              ) : (
                ""
              )}
              <div className="dashboard-left" style={accountInfo ? { left: "0px" } : {}}>
                <div
                  className="collection-mobile-back"
                  onClick={() => setAccountInfo(!accountInfo)}
                >
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true"></i> back
                  </span>
                </div>
                <div className="block-content">
                  <ul>
                    <li className={`${activePath == "dashboard" && "active"}`}>
                      <a onClick={() => navigateToPage("dashboard")}>Account Info</a>
                    </li>
                    <li className={`${activePath == "address-book" && "active"}`}>
                      <a onClick={() => navigateToPage("address-book")}>Address Book</a>
                    </li>
                    <li className={`${activePath == "my-order" && "active"}`}>
                      <a onClick={() => navigateToPage("my-order")}>My Orders</a>
                    </li>
                    <li className={`${activePath == "profile" && "active"}`}>
                      <a onClick={() => navigateToPage("profile")}>My Account</a>
                    </li>
                    <li className={`${activePath == "change-password" && "active"}`}>
                      <a onClick={() => navigateToPage("change-password")}>
                        Change Password
                      </a>
                    </li>
                    <li className="last">
                      <a onClick={handleLogout}>
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg="9">
              <div className="dashboard-right">
                <>{children}</>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default AccountLayout;

import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "../../../helpers/user/UserContext";
import { userLogout } from "../../../services/api/user.service";

const TopBarDark = ({ data, topClass, fluid }) => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    userContext.setUser();
    userLogout();
    router.push("/page/account/login");
  };

  const navigateToDashboar = () => {
    if (!userContext.user) return;
    router.push("/page/account/dashboard");
  };

  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>{data?.welcome_message}</li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-right">
            <ul className="header-dropdown">
              <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  <a>
                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  </a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <span onClick={() => navigateToDashboar()}>
                  <i className="fa fa-user" aria-hidden="true"></i>
                  My Account
                </span>
                <ul className="onhover-show-div">
                  {userContext.user ? (
                    <li onClick={() => handleLogout()}>
                      <a>Logout</a>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link href={`/page/account/login`}>
                          <a>Login</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/page/account/register`}>
                          <a>Register</a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;

import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "../../../helpers/user/UserContext";
import CommonContext from "/helpers/common/CommonContext";
import CurrencyContext from "/helpers/Currency/CurrencyContext";
import { userLogout } from "../../../services/api/user.service";

const TopBarDark = ({ data, topClass, fluid }) => {
  const userContext = useContext(UserContext);
  const commonContext = useContext(CommonContext);
  const currencyContext = useContext(CurrencyContext);
  const router = useRouter();

  const availableCurrencies = commonContext.commonData.available_currencies;
  const primaryCurrency = currencyContext.selectedCurr.currency;

  const handleLogout = () => {
    userContext.setUser();
    userLogout();
    router.push("/page/account/login");
  };

  const navigateToDashboar = () => {
    if (!userContext.user) return;
    router.push("/page/account/dashboard");
  };

  const handleChangeCurrency = (event) => {
    const currencyObj = availableCurrencies.find(el => el.code == event.target.value);
    const currency = {
      currency: currencyObj.code,
      symbol: currencyObj.symbol,
      value: currencyObj.value,
    }
    currencyContext.selectedCurrency(currency)
    localStorage.setItem("currency", JSON.stringify(currency))
  }

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
              {availableCurrencies.length ? <li>
                <select value={primaryCurrency} onChange={handleChangeCurrency} className="select-currency">
                  {availableCurrencies?.map((item) => (
                    <option className="currency-option" value={item.code} key={item.code}>{item.code}</option>
                  ))}
                </select>
              </li> : null}
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

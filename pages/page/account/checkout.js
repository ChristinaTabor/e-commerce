import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import CheckoutPage from "./common/checkout-page";

const Checkout = () => {
  const [currentUser, setCurrentUser] = useState(false);

  return (
    <CommonLayout parent="home" title="checkout">
      <CheckoutPage />
    </CommonLayout>
  );
};

export default Checkout;

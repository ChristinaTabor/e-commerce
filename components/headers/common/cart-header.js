import React, { Fragment, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../helpers/cart";
import CurrencyContext from "/helpers/Currency/CurrencyContext";
import { Media } from "reactstrap";

const CartHeader = ({ item, symbol }) => {
  const context = useContext(CartContext);
  const CurContect = useContext(CurrencyContext);
  const currency = CurContect.selectedCurr;

  return (
    <Fragment>
      <li>
        <div className="media">
          <Link href={"/product-details/" + item._id}>
            <a>
              <Media alt="" className="mr-3 shopping-cart-media" src={`${item.images[0].src}`} />
            </a>
          </Link>
          <div className="media-body">
            <Link href={"/product-details/" + item._id}>
              <a>
                <h4>{item.name}</h4>
              </a>
            </Link>

            <h4>
              <span>
                {item.qty} x {symbol}{" "}
                {((item.price - (item.price * item.discount) / 100) * currency.value).toFixed(2)}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => context.removeFromCart(item)}
          ></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;

import React, { useState, useContext } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import MasterSocial from "./master_social";
import { useRouter } from "next/router";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  const context = useContext(CartContext);
  const stock = context.stock;
  const plusQty = context.plusQty;
  const minusQty = context.minusQty;
  const quantity = context.quantity;
  const uniqueColor = [];
  const uniqueSize = [];

  const onBuy = () => {
    context.addToCart(product, quantity);
    router.push(`/page/account/checkout`);
  }

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        Detail Price
        <h2> {product?.title} </h2>
        <h4>
          <del>
            {symbol}
            {product.price}
          </del>
          <span>{product.discount}% off</span>
        </h4>
        <h3>
          {symbol}
          {product.price - (product.price * product.discount) / 100}
        </h3>
        {product?.variants?.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color?.title);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })}
        {changeColorVar === undefined ? (
          <>
            {uniqueColor ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li className={vari.color.title} key={i} title={vari.color.title}></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {uniqueColor ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li
                      className={vari.color?.title}
                      key={i}
                      title={vari.color?.title}
                      onClick={() => changeColorVar(i)}
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )}
        <div className="product-description border-product">
          {product.variants && (
            <div>
              <h6 className="product-title size-text">
                select size
                <span>
                  <a
                    href={null}
                    data-toggle="modal"
                    data-target="#sizemodal"
                    onClick={toggle}
                  >
                    size chart
                  </a>
                </span>
              </h6>
              <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                <ModalBody>
                  <Media src={sizeChart} alt="size" className="img-fluid" />
                </ModalBody>
              </Modal>
              <div className="size-box">
                <ul>
                  {uniqueSize.map((data, i) => {
                    return (
                      <li key={i}>
                        <a href={null}>{data.title}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="product-buttons">
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => context.addToCart(product, quantity)}
          >
            add to cart
          </a> 
            {/* <a className="btn btn-solid" onClick={onBuy}>buy now</a> */}
        </div>
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          <div dangerouslySetInnerHTML={{__html: product.description}}></div>
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
         
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;

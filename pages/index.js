import React, { useContext } from "react";
import Banner from "./layouts/Components/Banner";
import TopCollection from "../components/common/Collections/Collection3";
import Parallax from "./layouts/Components/Parallax";
import SpecialProducts from "../components/common/Collections/TabCollection1";
import ServiceLayout from "../components/common/Service/service1";
import LogoBlock from "../components/common/logo-block";
import HeaderOne from "../components/headers/header-one";
import { Product4 } from "../services/script";
import Paragraph from "../components/common/Paragraph";
import Helmet from "react-helmet";
import MasterFooter from "../components/footers/common/MasterFooter";
import { CAT_ID } from "../services/api/data.service";
import { getProducts } from "../services/api/shop.service";
import CommonContext from "../helpers/common/CommonContext";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import BannerImg1 from "../public/assets/img/game/1.jpeg";
import BannerImg2 from "../public/assets/img/game/2.jpeg";
import ImgSupport from "../public/assets/img/support.svg";
import ImgReliable from "../public/assets/img/reliable.png";

const Fashion = ({ specialProducts, topCollection, isLoading }) => {
  const commonContext = useContext(CommonContext);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={"/assets/images/favicon/1.png"} />
      </Helmet>
      <HeaderOne data={commonContext.commonData} topClass="top-header" />
      <Banner />
      <Paragraph title="title1 section-t-space" inner="title-inner1" hrClass={false} />
      <TopCollection
        noTitle="null"
        backImage={false}
        type="fashion"
        title="gift cards"
        subtitle="special offer"
        productSlider={Product4}
        designClass="p-t-0 ratio_asos"
        noSlider="false"
        cartClass="cart-info cart-wrap"
        data={topCollection}
        loading={isLoading}
      />

      <Container>
        <div className="middle-box-1">
          <div className="middle-box-inner">
            <h3>Lorem ipsum</h3>
            <span>
            Make a purchase at a favorable price and win a discount coupon.
            </span>
            <Link href={"/shop"}>
              <a className={`btn btn-solid`}>Shop Now</a>
            </Link>
          </div>
        </div>
      </Container>

      <section className="home-banner-2">
        <Container>
          <Row>
            <Col md="6" className="form-col left">
              <img src={BannerImg1.src}></img>
              <div className="offer">
                <h4>for xbox</h4>
                <h2>save 10%</h2>
              </div>
            </Col>
            <Col md="6" className="form-col right">
              <img src={BannerImg2.src}></img>
              <div className="offer">
                <h4>for psp</h4>
                <h2>save 15%</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Parallax />
      <SpecialProducts
        type="fashion"
        backImage={false}
        productSlider={Product4}
        line={true}
        title="title1 section-t-space"
        inner="title-inner1"
        designClass="section-b-space p-t-0 ratio_asos"
        noSlider="true"
        cartClass="cart-info cart-wrap"
        data={specialProducts}
        loading={isLoading}
      />
      {commonContext?.commonData?.service_layout && (
        <ServiceLayout sectionClass="border-section small-section" />
      )}

      <Container>
        <div className="middle-box-1">
          <div className="middle-box-inner bottom">
            <h3>Support <br/>and<br/> Reliability</h3>
            <span>
              You can contact us at any time. We provide continuous support and guarantee
              the safety of your purchases
            </span>
            {/* <Link href={"/shop"}>
              <a className={`btn btn-solid`}>Shop Now</a>
            </Link> */}
            <img src={ImgReliable.src} />
            <img src={ImgSupport.src} />
          </div>
        </div>
      </Container>

      <MasterFooter
        footerClass={`footer-light`}
        belowSection={"section-b-space"}
        logoName={"logo.png"}
        data={commonContext.commonData}
      />
    </>
  );
};


export async function getStaticProps() {
  const topCollection = await getProducts({
    queryParams: {
      relation: true,
      filter: { "category._id": CAT_ID, type: "gift_card" },
    },
  });

  const specialProducts = await getProducts({
    queryParams: {
      relation: true,
      filter: { "category._id": CAT_ID, type: "game" },
    },
  });

  return { props: { isLoading: false, specialProducts, topCollection }, revalidate: 10 };
}

export default Fashion;
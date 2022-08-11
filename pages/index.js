import React, { useContext } from "react";
import Banner from "./layouts/Components/Banner";
import CollectionBanner from "./layouts/Components/Collection-Banner";
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
import { FASHION_CAT_ID } from "../services/api/data.service";
import { getProducts } from "../services/api/shop.service";
import CommonContext from "../helpers/common/CommonContext";

const Fashion = ({ specialProducts, isLoading }) => {
  const commonContext = useContext(CommonContext);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={"/assets/images/favicon/1.png"} />
      </Helmet>
      <HeaderOne data={commonContext.commonData} topClass="top-header" />
      <Banner />
      <CollectionBanner />
      <Paragraph title="title1 section-t-space" inner="title-inner1" hrClass={false} />
      <TopCollection
        noTitle="null"
        backImage={false}
        type="fashion"
        title="top collection"
        subtitle="special offer"
        productSlider={Product4}
        designClass="section-b-space p-t-0 ratio_asos"
        noSlider="false"
        cartClass="cart-info cart-wrap"
        data={specialProducts}
        loading={isLoading}
      />
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
      <ServiceLayout sectionClass="border-section small-section" />
      <div className="section-b-space">
        <LogoBlock />
      </div>
      <MasterFooter
        footerClass={`footer-light`}
        belowSection={"section-b-space light-layout"}
        logoName={"logo.png"}
        data={commonContext.commonData}
      />
    </>
  );
};

export default Fashion;

export async function getServerSideProps() {
  const specialProducts = await getProducts({
    queryParams: {
      relation: true,
      filter: { "category._id": FASHION_CAT_ID },
    },
  });

  return { props: { isLoading: false, specialProducts } };
}

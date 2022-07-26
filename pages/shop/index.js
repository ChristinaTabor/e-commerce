import React, { useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import ProductList from "./common/productList";
import { Container, Row } from "reactstrap";
import FilterPage from "./common/filter";
import {
  getColors,
  getSizes,
  getBrands,
  getProducts,
  FASHION_CAT_ID,
} from "../../services/api/data.service";

const LeftSidebar = ({ filterData, productsData, isLoading }) => {
  const [sidebarView, setSidebarView] = useState(false);

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  return (
    <CommonLayout title="collection" parent="home">
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <FilterPage
                sm="3"
                data={filterData}
                loading={isLoading}
                sidebarView={sidebarView}
                closeSidebar={() => openCloseSidebar(sidebarView)}
              />
              <ProductList
                loading={isLoading}
                data={productsData}
                colClass="col-xl-3 col-6 col-grid-box"
                layoutList=""
                openSidebar={() => openCloseSidebar(sidebarView)}
              />
            </Row>
          </Container>
        </div>
      </section>
    </CommonLayout>
  );
};

export default LeftSidebar;

export async function getServerSideProps() {
  const colors = await getColors();
  const sizes = await getSizes();
  const brands = await getBrands();
  const newProducts = await getProducts({
    queryParams: {
      relation: true,
      filter: { new: true, "category._id": FASHION_CAT_ID },
    },
  });
  const filterData = {
    colors,
    sizes,
    brands,
    newProducts,
  };

  const products = await getProducts({
    queryParams: {
      relation: true,
      filter: { "category._id": FASHION_CAT_ID },
    },
  });

  const productsData = {
    items: products,
    total: products.length,
  };

  return { props: { isLoading: false, filterData, productsData } };
}

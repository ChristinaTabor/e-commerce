import React, { useContext, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import ProductList from "./common/productList";
import { Container, Row } from "reactstrap";
import { CAT_ID } from "../../services/api/data.service";
import { getProducts } from "../../services/api/shop.service";
import FilterDataContext from "../../helpers/filter-data/FilterDataContext";

const LeftSidebar = ({ productsData, isLoading }) => {
  const [sidebarView, setSidebarView] = useState(false);
  const filterDataContext = useContext(FilterDataContext)

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
  const products = await getProducts({
    queryParams: {
      relation: true,
      filter: { "category._id": CAT_ID },
      paginate: true,
      limit: 8,
    },
  });

  const productsData = {
    items: products.data,
    total: products.meta.total,
  };

  return { props: { isLoading: false, productsData } };
}

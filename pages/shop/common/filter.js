import React from "react";
import { Col } from "reactstrap";
import NewProduct from "./newProduct";
import Brand from "./brand";
import Color from "./color";
import Size from "./size";
import Price from "./price";

const FilterPage = ({ data, loading, sm, sidebarView, closeSidebar }) => {
  return (
    <>
      <Col
        sm={sm}
        className="collection-filter"
        style={sidebarView ? { left: "0px" } : {}}
      >
        <div className="collection-filter-block">
          <div className="collection-mobile-back" onClick={() => closeSidebar()}>
            <span className="filter-back">
              <i className="fa fa-angle-left" aria-hidden="true"></i> back
            </span>
          </div>
          <Brand data={data.brands} loading={loading} />
          <Color data={data.colors} />
          <Size data={data.sizes} loading={loading} />
          <Price />
        </div>
        <NewProduct data={data.newProducts} loading={loading} />
      </Col>
    </>
  );
};

export default FilterPage;

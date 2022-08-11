import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CommonLayout from "../../components/shop/common-layout";
import ProductSection from "./common/product_section";
// import { withApollo } from '../../helpers/apollo/apollo';
import LeftSidebarPage from "./product/leftSidebarPage";
import { getProduct, getProducts } from "../../services/api/shop.service";
import { FASHION_CAT_ID } from "../../services/api/data.service";

const LeftSidebar = () => {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id, {
      queryParams: {
        relation: true,
        filter: { "category._id": FASHION_CAT_ID },
      },
    })
      .then((res) => {
        setProduct(res);
      })
      .catch(console.error);

    getProducts({
      queryParams: {
        relation: true,
        filter: { "category._id": FASHION_CAT_ID },
        limit: 8,
      },
    }).then((res) => {
      setLoading(false);
      setProducts(res);
    });
  }, []);

  return (
    <CommonLayout parent="Home" title="Product">
      <LeftSidebarPage data={product} loading={loading} />
      <ProductSection data={products} loading={loading} />
    </CommonLayout>
  );
};

export default LeftSidebar;

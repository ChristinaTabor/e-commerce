import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import CommonLayout from "../../components/shop/common-layout";
import ProductSection from "./common/product_section";
import LeftSidebarPage from "./product/leftSidebarPage";
import { getProduct, getProducts } from "../../services/api/shop.service";
import { CAT_ID } from "../../services/api/data.service";
import FilterDataContext from "../../helpers/filter-data/FilterDataContext";

const LeftSidebar = () => {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id, {
      queryParams: {
        relation: ["brand", "category", "variants.color", "variants.size"],
        filter: { "category._id": CAT_ID },
      },
    })
      .then((res) => {
        console.log("res", res)
        // res.variants.forEach((el) => {
        //   el.color = colors.find((color) => {
        //     return color._id == el.color;
        //   });

        //   el.size = sizes.find((size) => {
        //     return size._id == el.size;
        //   });
        // });

        setProduct(res);
      })
      .catch(console.error);

    getProducts({
      queryParams: {
        relation: true,
        filter: { "category._id": CAT_ID },
        limit: 8,
      },
    }).then((res) => {
      setProducts(res);
      setLoading(false);
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

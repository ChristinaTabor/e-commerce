import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import ProductItem from "../../../components/common/product-box/ProductBox1";
import CurrencyContext from "../../../helpers/Currency/CurrencyContext";
import PostLoader from "../../../components/common/PostLoader";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CAT_ID } from "../../../services/api/data.service";
import { getProducts } from "../../../services/api/shop.service";

const sortKeys = {
  AscOrder: {},
  HighToLow: { price: -1 },
  LowToHigh: { price: 1 },
  Newest: { _id: 1 },
};
let sortBy = "AscOrder";
const filter = { "category._id": CAT_ID };

const ProductList = ({ data, loading, colClass, layoutList, openSidebar, noSidebar }) => {
  let [products, setProducts] = useState(data?.items || []);
  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const wishlistContext = useContext(WishlistContext);
  const curContext = useContext(CurrencyContext);
  const [grid, setGrid] = useState(colClass);
  const symbol = curContext.selectedCurr.symbol;
  const filterContext = useContext(FilterContext);
  const selectedBrands = filterContext.selectedBrands;
  const selectedColor = filterContext.selectedColor;
  const selectedPrice = filterContext.selectedPrice;
  const selectedSize = filterContext.selectedSize;
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(layoutList);

  useEffect(() => {
    filter["brand._id"] = { $in: selectedBrands };
    filter["variants.color"] = selectedColor;
    filter["variants.size"] = { $in: selectedSize };
    filter["price"] = { $gte: selectedPrice.min, $lte: selectedPrice.max };

    if (!selectedBrands.length) delete filter["brand._id"];
    if (!selectedColor.length) delete filter["variants.color"];
    if (!selectedSize.length) delete filter["variants.size"];

    products = [];
    getProductsData();
  }, [selectedBrands, selectedColor, selectedSize, selectedPrice]);

  const getProductsData = async () => {
    const productsData = await getProducts({
      queryParams: {
        relation: true,
        filter: filter,
        sort: sortKeys[sortBy],
        skip: products.length,
        limit: 8,
      },
    });
    setProducts([...products, ...productsData]);
  };

  const handlePagination = async () => {
    setIsLoading(true);
    await getProductsData();
    setIsLoading(false);
  };

  const handleSort = async (value) => {
    sortBy = value;
    products = [];
    getProductsData();
  };

  const removeBrand = (val) => {
    const temp = [...selectedBrands];
    temp.splice(selectedBrands.indexOf(val), 1);
    filterContext.setSelectedBrands(temp);
  };

  const removeSize = (val) => {
    const temp = [...selectedSize];
    temp.splice(selectedSize.indexOf(val), 1);
    filterContext.setSelectedSize(temp);
  };

  const removeColor = () => {
    filterContext.setSelectedColor("");
  };

  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div className="filter-main-btn" onClick={() => openSidebar()}>
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i> Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {data
                            ? `Showing Products 1-${products.length} of ${data.total}`
                            : "loading"}{" "}
                          Result
                        </h5>
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={layout === "list-view" ? { opacity: 0 } : { opacity: 1 }}
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-filter">
                        <select
                          value={sortBy}
                          onChange={(e) => handleSort(e.target.value)}
                        >
                          <option value="AscOrder">Sorting items</option>
                          <option value="HighToLow">High To Low</option>
                          <option value="LowToHigh">Low To High</option>
                          <option value="Newest">Newest</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {!data || !products || products.length === 0 || loading ? (
                    data && products && products.length === 0 ? (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Your Cart is Empty</strong>
                            </h3>
                            <h4>Explore more shortlist some items.</h4>
                          </div>
                        </div>
                      </Col>
                    ) : (
                      <div className="row mx-0 margin-default mt-4">
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                      </div>
                    )
                  ) : (
                    products &&
                    products.map((product, i) => (
                      <div className={grid} key={i}>
                        <div className="product">
                          <div>
                            <ProductItem
                              des={true}
                              product={product}
                              symbol={symbol}
                              cartClass="cart-info cart-wrap"
                              addWishlist={() => wishlistContext.addToWish(product)}
                              addCart={() => cartContext.addToCart(product, quantity)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>
              <div className="section-t-space">
                <div className="text-center">
                  <Row>
                    <Col xl="12" md="12" sm="12">
                      {data && (
                        <Button onClick={() => handlePagination()}>
                          {isLoading && <Spinner animation="border" variant="light" />}
                          Load More
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;

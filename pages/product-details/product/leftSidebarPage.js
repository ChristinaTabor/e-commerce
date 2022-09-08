import React, { useState, useEffect, useRef } from "react";
import Service from "../common/service";
import Slider from "react-slick";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";
import { Container, Row, Col, Media } from "reactstrap";

const LeftSidebarPage = ({ data, loading }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
    swipeToSlide: true
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);

  const { nav1, nav2 } = state;

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col lg="12" sm="12" xs="12">
              <Container fluid={true}>
                {!data || loading ? (
                  "loading"
                ) : (
                  <Row>
                    <Col lg="4" className="product-thumbnail">
                      <Slider
                        {...products}
                        asNavFor={nav2}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slick"
                      >
                        {data.images.map((vari, index) => (
                          <div key={index}>
                            <ImageZoom image={vari} />
                          </div>
                        ))}
                      </Slider>
                    </Col>
                    <Col lg="8" className="rtl-text">
                      <DetailsWithPrice item={data} changeColorVar={changeColorVar} />
                    </Col>
                  </Row>
                )}
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default LeftSidebarPage;

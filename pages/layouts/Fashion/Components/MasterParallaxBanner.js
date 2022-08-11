import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

const MasterParallaxBanner = ({ data, parallaxSectionClass, parallaxClass }) => {
  return (
    <Fragment>
      <section className={`p-0 ${parallaxSectionClass}`}>
        <div
          style={{ "background-image": `url(${data.img})` }}
          className={`full-banner parallax ${parallaxClass}`}
        >
          <Container>
            <Row>
              <Col>
                <div className="banner-contain">
                  <h2>{data.title}</h2>
                  <h3>{data.sub_title_1}</h3>
                  <h4>{data.sub_title_2}</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Fragment>
  );
};

export default MasterParallaxBanner;

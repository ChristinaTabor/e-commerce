import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({ img, title, desc, link, classes, btn }) => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={`home ${classes ? classes : "text-center"}`}
      >
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4>{title}</h4>
                  <h1>{desc}</h1>
                  {btn && (
                    <Link href={link}>
                      <a className={`btn btn-solid`}>Shop Now</a>
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;

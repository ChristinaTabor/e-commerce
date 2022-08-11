import React, { Fragment } from "react";
import { Container, Row, Col, Media } from "reactstrap";

const CopyRight = ({ message, layout, fluid }) => {
  return (
    <Fragment>
      <div className={`sub-footer ${layout}`}>
        <Container fluid={fluid}>
          <Row>
            <Col xl="6" md="6" sm="12">
              <div className="footer-end">
                <p>
                  <i className="fa fa-copyright" aria-hidden="true"></i> {message}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default CopyRight;

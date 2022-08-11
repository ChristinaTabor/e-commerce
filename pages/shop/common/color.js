import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";

const Color = ({ data, loading }) => {
  const context = useContext(FilterContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggle}>
        colors
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="color-selector">
            <ul>
              {!data || data.length === 0 || loading ? (
                <h4>Loading</h4>
              ) : (
                data.map((color, i) => (
                  <li
                    className={`${color.title} ${
                      context.selectedColor === color.title ? "active" : ""
                    }`}
                    onClick={() => {
                      context.setSelectedColor(color._id);
                    }}
                    key={i}
                  ></li>
                ))
              )}
            </ul>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Color;
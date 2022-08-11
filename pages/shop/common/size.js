import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";

const Size = ({ data, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const filterChecked = context.filterChecked;
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        size
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {!data || data.length === 0 || loading
              ? "loading"
              : data &&
                data.map((size, index) => (
                  <div
                    key={index}
                    className="custom-control custom-checkbox collection-filter-checkbox"
                  >
                    <Input
                      checked={context.selectedSize.includes(size.title)}
                      onChange={() => {
                        context.handleSizes(size._id, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={size.title}
                    />

                    <label className="custom-control-label" htmlFor={size.title}>
                      {size.title}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Size;

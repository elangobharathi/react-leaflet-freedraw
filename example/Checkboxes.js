import React from "react";
import PropTypes from "prop-types";

const CheckboxContainer = props => (
  <React.Fragment>
    {props.checkboxes.map(item => (
      <div key={item.id}>
        <label>
          <Checkbox
            name={item.id}
            checked={item.isChecked}
            onChange={props.onChange}
          />
          {item.label}
        </label>
      </div>
    ))}
  </React.Fragment>
);

export default CheckboxContainer;

CheckboxContainer.propTypes = {
  checkboxes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onChange: PropTypes.func.isRequired
};

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

import React from 'react';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

const CheckboxContainer = (props) => (
  <>
    {props.checkboxes.map((item) => (
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
  </>
);

export default CheckboxContainer;

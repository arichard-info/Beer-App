import React from "react";

const TextField = ({
  name = "",
  type = "text",
  value = "",
  label = "",
  required = false,
  placeholder = "",
  onChange,
  ...rest
}) => {
  return (
    <>
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange({ name, value: e.target.value })}
        {...rest}
      />
    </>
  );
};

export default TextField;

import React, { useReducer, useState } from "react";
import styled, { css } from "styled-components";
import verifyField from "./utils";
import TextField from "./TextField";
import Textarea from "./Textarea";

const switchFields = {
  textField: el => <TextField {...el} />,
  textArea: el => <Textarea {...el} />
};

const formReducer = (state, { name, value }) => {
  const fields = { ...state };
  fields[name] = verifyField({ ...fields[name], value });
  return fields;
};

const Form = ({
  className,
  fields,
  onValidSubmit,
  onErrorSubmit,
  submitLabel = "Continuer",
  ...rest
}) => {
  Object.keys(fields).forEach(el => {
    fields[el] = verifyField(fields[el]);
  });
  const [formFields, formDispatch] = useReducer(formReducer, fields);
  const [valid, setValid] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();

    const invalidFields = Object.keys(formFields).filter(
      el => formFields[el].valid !== true
    );

    if (invalidFields.length) {
      setValid(false);
      if (typeof onErrorSubmit === "function") onErrorSubmit(formFields);
    } else {
      setValid(true);
      if (typeof onValidSubmit === "function") onValidSubmit(formFields);
    }
  };

  const onChange = ({ name, value }) => formDispatch({ name, value });

  return (
    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
      {Object.keys(formFields).map((name, key) => {
        const field = formFields[name];
        return (
          <div className="form-row" key={key}>
            {field.field in switchFields &&
              switchFields[field.field]({ ...field, name, onChange })}
            {!valid && typeof field.valid === "string" && <p>{field.valid}</p>}
          </div>
        );
      })}
      <div className="form-row">
        <input type="submit" value={submitLabel} />
      </div>
    </form>
  );
};

export default styled(Form)(
  () => css`
    .form-row {
      margin-bottom: 1.5rem;
    }
  `
);

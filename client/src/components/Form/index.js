import React, { useReducer, useState } from "react";
import styled, { css } from "styled-components";
import verifyField from "./utils";
import TextField from "./TextField";
import Textarea from "./Textarea";

const switchFields = {
  textField: el => <TextField {...el} />,
  textArea: el => <Textarea {...el} />
};

const verifyDependencies = (fields, name) => {
  const checkField = fields[name];
  if (
    checkField.equalTo &&
    fields[checkField.equalTo] &&
    fields[checkField.equalTo].value !== checkField.value
  ) {
    return ["Les champs ne sont pas identiques"];
  }
  return [];
};

const formReducer = (state, { name, value }) => {
  let fields = { ...state };
  let field = fields[name];
  field.value = value;
  field.errors = [...verifyField(field), ...verifyDependencies(fields, name)];
  fields[name] = field;
  console.log(fields);
  return fields;
};

const initFields = fields => {
  Object.keys(fields).forEach(fieldName => {
    fields[fieldName].errors = verifyField(fields[fieldName]);

    const foundDependency = Object.keys(fields).find(
      key =>
        fields[key] ===
        Object.keys(fields)
          .map(key => fields[key])
          .find(el => el.equalTo === fieldName)
    );

    if (foundDependency !== undefined) {
      fields[fieldName].equalTo = foundDependency;
    }
  });
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
  const [formFields, formDispatch] = useReducer(
    formReducer,
    initFields(fields)
  );
  const [valid, setValid] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();

    const invalidFields = Object.keys(formFields).filter(
      el => formFields[el].errors.length
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
              switchFields[field.field]({
                ...field,
                name,
                onChange,
                validForm: valid
              })}
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

import React, { useReducer } from "react";
import styled, { css } from "styled-components";
import verifyField from "./utils";
import TextField from "./TextField";
import Textarea from "./Textarea";
import PasswordConfirm from "./PasswordConfirm";

const switchFields = {
  textField: el => <TextField {...el} />,
  textArea: el => <Textarea {...el} />,
  passwordConfirm: el => <PasswordConfirm {...el} />
};

const formReducer = (state, { type, value: actionValue = {} }) => {
  const { name, value } = actionValue;
  let fields = { ...state };

  if (type === "VALIDATE_ALL") {
    Object.keys(fields).forEach(el => {
      fields[el].validation = true;
    });
    return fields;
  }

  let field = fields[name];
  field.value = value;
  field.errors = verifyField(field);
  if (type === "FOCUS_OUT") field.validation = true;
  fields[name] = field;
  return fields;
};

const initFields = fields => {
  Object.keys(fields).forEach(fieldName => {
    fields[fieldName].errors = verifyField(fields[fieldName]);
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

  const handleSubmit = e => {
    e.preventDefault();

    const invalidFields = Object.keys(formFields).filter(
      el => formFields[el].errors.length
    );

    if (invalidFields.length) {
      formDispatch({ type: "VALIDATE_ALL" });
      if (typeof onErrorSubmit === "function") onErrorSubmit(formFields);
    } else if (typeof onValidSubmit === "function") onValidSubmit(formFields);
  };

  const onChange = ({ name, value }) =>
    formDispatch({ type: "CHANGE", value: { name, value } });
  const onFocusOut = ({ name, value }) =>
    formDispatch({ type: "FOCUS_OUT", value: { name, value } });

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
                onFocusOut
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

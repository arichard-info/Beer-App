import React, { useReducer } from "react";
import TextField from "./TextField";
import Textarea from "./Textarea";

const switchFields = {
  textField: el => <TextField {...el} />,
  textArea: el => <Textarea {...el} />
};

const formReducer = (state, { name, value }) => {
  const fields = { ...state };
  fields[name].value = value;
  return fields;
};

const Form = ({ fields, onSubmit, submitLabel = "Continuer", ...rest }) => {
  const [formFields, formDispatch] = useReducer(formReducer, fields);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formFields);
  };

  const onChange = ({ name, value }) => formDispatch({ name, value });

  return (
    <form onSubmit={handleSubmit} {...rest}>
      {Object.keys(formFields).map((name, key) => {
        const field = formFields[name];
        return (
          <div className="form-row" key={key}>
            {field.field in switchFields &&
              switchFields[field.field]({ ...field, name, onChange })}
          </div>
        );
      })}
      <div className="form-row">
        <input type="submit" value={submitLabel} />
      </div>
    </form>
  );
};

export default Form;

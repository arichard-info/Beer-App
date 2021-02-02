import React, { useState, useEffect, useMemo } from "react";
import { FormContext, validation } from "./utils";

const Form = ({ children, dataNrt = "", onSubmit = () => {} }) => {
  const [fields, setFields] = useState({});
  const [valid, setValid] = useState(null);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const showErrors = useMemo(() => !!submitAttempts, [submitAttempts]);

  useEffect(() => {
    setValid(!Object.values(fields).some((f) => f.error));
  }, [fields]);

  const validateField = (name, value, rules) => {
    setFields((fields = {}) => ({
      ...fields,
      [name]: {
        ...fields[name],
        value,
        rules,
        error: validation({ value, rules }),
      },
    }));
  };

  const triggerValidation = (fieldName) => {
    setFields((fields = {}) => {
      const field = fields[fieldName];
      if (!field) return fields;
      return {
        ...fields,
        [fieldName]: {
          ...field,
          error: validation(field),
        },
      };
    });
  };

  const removeField = (name) => {
    setFields((fields) => {
      delete fields[name];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempts((s) => s + 1);
    onSubmit(e, { valid, fields });
  };

  return (
    <FormContext.Provider
      value={{
        fields,
        valid,
        validateField,
        removeField,
        triggerValidation,
        showErrors,
        submitAttempts,
      }}
    >
      <form noValidate onSubmit={handleSubmit} data-nrt={dataNrt}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;

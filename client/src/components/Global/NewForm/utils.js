import { createContext, useContext } from "react";

export const FormContext = createContext({});

export const useForm = () => useContext(FormContext);

export const validation = ({ value, rules }) => {
  if (!rules || typeof rules !== "object") return;

  for (const [key, rule] of Object.entries(rules)) {
    switch (key) {
      case "required": {
        const error = checkRequired(value);
        if (error) return rule.message || "Ce champs est requis";
      }
      case "pattern": {
        const error = checkPattern(value, rule);
        if (error) return error;
      }
      case "custom": {
        if (typeof rule === "function") {
          return rule(value);
        }
      }
      default: {
        return false;
      }
    }
  }
};

const checkRequired = (value) => {
  if (!value || !value.trim().length) return true;
  return false;
};

const checkPattern = (value, rule) => {
  const switchPattern = (key) => {
    switch (key) {
      case "email": {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      }
      case "phone": {
        return /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
      }
      default: {
        return key;
      }
    }
  };
  let pattern = switchPattern(typeof rule === "string" ? rule : rule.pattern);
  if (!pattern) return false;

  return pattern.test(String(value).toLowerCase());
};

import { createContext, useContext } from "react";

export const FormContext = createContext({});

export const useForm = () => useContext(FormContext);

export const validation = ({ value, rules }) => {
  if (!rules || typeof rules !== "object") return;

  if (rules.required) {
    const error = checkRequired(value);
    if (error) return rules.required.message || "Ce champs est requis";
  }

  if (rules.pattern) {
    const error = checkPattern(value, rules.pattern);
    if (error) return rules.pattern.message || error;
  }

  if (rules.custom) {
    if (typeof rules.custom === "function") return rules.custom(value);
  }

  return false;
};

const checkRequired = (value) => {
  if (!value || !value.trim().length) return true;
  return false;
};

const checkPattern = (value, rule) => {
  const switchPatterns = {
    email: {
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Format d'email invalide",
    },
    phone: {
      regex: /^((\+)33|0|0033)[1-9](\d{2}){4}$/g,
      message: "Numéro de téléphone invalide",
    },
  };

  const conf = switchPatterns[rule.pattern || rule] || {
    regex: rule.pattern || rule,
    message: "Format invalide",
  };

  const str = String(value).toLowerCase();

  if (!conf.regex.test(str)) return conf.message;
};

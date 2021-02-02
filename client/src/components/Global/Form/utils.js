const verifyField = (fieldObject) => {
  const { field } = fieldObject;
  let errors = [];
  switch (field) {
    case "textField": {
      errors = verifyTextField(fieldObject);
      break;
    }
    case "passwordConfirm": {
      errors = verifyPassword(fieldObject);
      break;
    }
    case "textarea": {
      errors = verifyTextarea(fieldObject);
      break;
    }
    default:
      errors = [];
  }

  return errors;
};

export default verifyField;

const verifyTextarea = ({ value = "", required = false }) => {
  if (required && (!value || value === "")) return "Ce champs est requis";
  return true;
};

const verifyPassword = ({ value = {} }) => {
  const { password = "", confirm = "" } = value;
  let errors = [];
  if (password.length < 6) errors.push("too_short");
  if (confirm !== password || confirm === "") errors.push("not_confirmed");
  if (!password.match(/[A-Z]/)) errors.push("not_uppercase");
  if (!password.match(/[a-z]/)) errors.push("not_lowercase");
  return errors;
};

const verifyTextField = ({ type = "text", value = "", required = false }) => {
  if (required && (!value || value === "")) return ["Ce champs est requis"];
  switch (type) {
    case "email":
      if (!validateEmail(value)) return ["Adresse email invalide"];
      break;
    case "tel":
      if (!validateTel(value)) return ["Numéro de téléphone invalide"];
      break;
    default:
      return [];
  }
  return [];
};

const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateTel = (tel) => {
  var re = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
  return re.test(String(tel).toLowerCase());
};

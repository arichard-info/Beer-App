const verifyField = fieldObject => {
  const { field } = fieldObject;
  let valid = true;
  switch (field) {
    case "textField": {
      valid = verifyTextField(fieldObject);
      break;
    }
    case "textarea": {
      valid = verifyTextarea(fieldObject);
      break;
    }
    default:
      return true;
  }

  return { ...fieldObject, valid };
};

export default verifyField;

const verifyTextarea = ({ value = "", required = false }) => {
  if (required && (!value || value === "")) return "Ce champs est requis";
  return true;
};

const verifyTextField = ({ type = "text", value = "", required = false }) => {
  if (required && (!value || value === "")) return "Ce champs est requis";
  switch (type) {
    case "email":
      if (!validateEmail(value)) return "Adresse email invalide";
      break;
    case "tel":
      if (!validateTel(value)) return "Numéro de téléphone invalide";
      break;
    default:
      return true;
  }
};

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateTel = tel => {
  var re = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
  return re.test(String(tel).toLowerCase());
};

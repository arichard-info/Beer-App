export const rules = {
  length: {
    name: "8 caractères min",
    validate: (v) => v.length >= 8,
  },
  uppercase: {
    name: "1 majuscule",
    validate: (v) => !!(v && v.match(/[A-Z]/)),
  },
  lowercase: {
    name: "1 minuscule",
    validate: (v) => !!(v && v.match(/[a-z]/)),
  },
};

export const validate = (value) => {
  const errors = Object.entries(rules)
    .map(([key, rule]) => {
      return rule.validate && !rule.validate(value) && key;
    })
    .filter(Boolean);
  return errors;
};

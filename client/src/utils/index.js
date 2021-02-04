/**
 * Debounce
 */
export const debounce = (fn, ms = 0) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const classNames = (...args) => {
  let result = "";
  args.forEach((arg) => {
    if (typeof arg === "string") result += ` ${arg} `;
    if (typeof arg === "object")
      result += Object.keys(arg)
        .filter((key) => arg[key])
        .join(" ");
  });
  return result;
};

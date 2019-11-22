/**
 * Debounce
 */
export const debounce = (fn, ms = 0) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), ms);
  };
};

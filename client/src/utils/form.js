export function formReducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

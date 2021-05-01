const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "beers/setFamilies": {
      const families = action.payload;
      return { ...state, families };
    }
    default:
      return state;
  }
}

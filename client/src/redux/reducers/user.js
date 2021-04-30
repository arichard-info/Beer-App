const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "auth/logIn": {
      const user = action.payload;
      return user;
    }
    case "auth/logOut": {
      return null;
    }
    default:
      return state;
  }
}

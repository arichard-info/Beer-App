const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/logIn":
    case "user/update": {
      const user = action.payload;
      return user;
    }
    case "user/logOut": {
      return null;
    }
    default:
      return state;
  }
}

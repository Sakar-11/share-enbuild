import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REDIRECT_TO_JOIN
} from "./loginActionTypes";
const initalState = {
  loading: false,
  username: global.config.secureStorage.getItem("username"),
  loggedIn:
    global.config.secureStorage.getItem("construction-auth-token") !== null,
  user: ""
};

export const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      // 
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      // 
      return {
        ...state,
        loading: false,
        loggedIn: true,
        username: action.username,
        user: action.user
      };
    case LOGIN_FAILURE:
      // 
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case LOGOUT:
      // 
      return {
        ...state,
        loggedIn: false
      };
    case REDIRECT_TO_JOIN:
      // 
      return {
        ...state,
        loading: false,
        loggedIn: false,
        redirectToJoin: true
      };
    default:
      // 
      return state;
  }
};
export default loginReducer;

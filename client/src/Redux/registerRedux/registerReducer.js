import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USERNAME_EXISTS,
} from "./registerActionTypes";

const initalState = {
  loading: false,
  registered: false,
};

export const registerReducer = (state = initalState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      
      return {
        ...state,
        loading: false,
        registered: true,
      };
    case REGISTER_FAILURE:
      
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case USERNAME_EXISTS:
      
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      // 
      return state;
  }
};
export default registerReducer;

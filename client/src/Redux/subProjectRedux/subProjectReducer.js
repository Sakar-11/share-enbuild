import {
  GET_SUBPROJECTS,
  LOADING_SUBPROJECTS,
  ERROR_SUBPROJECTS
} from "./subProjectActionTypes";

const initialState = {
  loading: false,
  error: "",
  isError: false,
  success: false,
  subProjects: []
};

const subProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBPROJECTS:
      return {
        ...state,
        subProjects: action.payload,
        success: true,
        loading: false
      };
    case LOADING_SUBPROJECTS:
      return {
        ...state,
        loading: true
      };
    case ERROR_SUBPROJECTS:
      return {
        ...state,
        error: action.error,
        isError: true,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};

export default subProjectReducer;

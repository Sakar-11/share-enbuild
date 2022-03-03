import {
  ADD_LOADING,
  TODO_FAILURE,
  TODO_SUCCESS,
  GET_TODO,
} from "./todoActionTypes";

const initialState = {
  data: [],
  success: false,
  loading: false,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TODO:
      return {
        ...state,
        data: action.payload,
      };
    case TODO_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };

    case TODO_FAILURE:
      return {
        ...state,
        data: action.payload,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
};

import {
  ADD_LOADING,
  PLAN_FAILURE,
  PLAN_SUCCESS,
  GET_PLAN,
} from "./planActionTypes";

const initialState = {
  data: [],
  success: false,
  loading: false,
};

export const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PLAN:
      return {
        ...state,
        data: action.payload,
      };
    case PLAN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };

    case PLAN_FAILURE:
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

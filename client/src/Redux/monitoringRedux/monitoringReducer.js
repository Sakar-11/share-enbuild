import {
  ADD_LOADING,
  MONITORING_SUCCESS,
  MONITORING_ERROR
} from "./monitoringActionTypes";

const initialState = {
  loading: false,
  monitoring: []
};

export const monitoringReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOADING:
      return {
        ...state,
        loading: true
      };
    case MONITORING_SUCCESS:
      return {
        ...state,
        monitoring: action.payload,
        loading: false
      };
    case MONITORING_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

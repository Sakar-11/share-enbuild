import ActionButton from "antd/lib/modal/ActionButton";
import {
  SUCCESS_GET_ACTIVITY_DETAILS,
  ERROR_GET_ACTIVITY_DETAILS,
  SET_LOADING,
  CLEAR_CHECKED_ARRAY,
  SUCCESS_UPDATE_ACTIVITY_DETAILS,
  ERROR_UPDATE_ACTIVITY_DETAILS,
  DONE_UPDATING_ACTIVITY,
  SUCCESS_GET_DEFAULT_ACTIVITY,
  SUCCESS_GET_DEFAULT_ACTIVITY_NAMES,
} from "./activityActionTypes";

const initialState = {
  loading: true,
  checkedArray: [],
  defaultActivity: [],
  defaultActivityNames: [],
  error: "",
  updateError: "",
  isUpdateSuccess: false,
  isUpdateError: false,
  percentage: [],
  floorPercentage: [],
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_GET_DEFAULT_ACTIVITY:
      return {
        ...state,
        defaultActivity: action.activities,
        // percentage: action.percentage,
        loading: false,
      };
    case SUCCESS_GET_DEFAULT_ACTIVITY_NAMES:
      return {
        ...state,
        defaultActivityNames: action.payload,
        loading: false,
      };
    case SUCCESS_GET_ACTIVITY_DETAILS:
      return {
        ...state,
        activityDetails: action.payload,

        loading: false,
      };
    case ERROR_GET_ACTIVITY_DETAILS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CLEAR_CHECKED_ARRAY:
      return {
        ...state,
        checkedArray: [],
      };
    case SUCCESS_UPDATE_ACTIVITY_DETAILS:
      return {
        ...state,
        loading: false,
        isUpdateSuccess: true,
      };
    case ERROR_UPDATE_ACTIVITY_DETAILS:
      return {
        ...state,
        loading: false,
        isUpdateError: true,
      };
    case DONE_UPDATING_ACTIVITY:
      return {
        ...state,
        isUpdateSuccess: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default activityReducer;

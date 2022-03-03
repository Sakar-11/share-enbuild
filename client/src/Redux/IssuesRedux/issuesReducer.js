import {
  ISSUE_GET_FAILURE,
  ISSUE_GET_SUCCESS,
  ISSUE_ADD_FAILURE,
  ISSUE_ADD_SUCCESS,
  ISSUE_REMOVE_SUCCESS,
  ISSUE_REMOVE_FAILURE,
  ISSUE_ASK_APPROVAL_SUCCESS,
  ISSUE_ASK_APPROVAL_FAILURE,
  ISSUE_LOADING
} from "./issuesActionTypes";
// import { getAllIssues } from "./issuesAction";

const initialState = {
  data: [],
  loading: true,
  success: false
};

export const issuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISSUE_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true
      };
    case ISSUE_LOADING:
      return {
        ...state,
        loading: true
      };
    case ISSUE_GET_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: action.success
      };
    case ISSUE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.success
      };
    case ISSUE_ADD_FAILURE:
      return {
        ...state,
        success: action.success,
        loading: false,
        error: action.payload
      };
    case ISSUE_REMOVE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        success: action.success
      };
    case ISSUE_REMOVE_FAILURE:
      return {
        ...state,
        success: action.success,
        error: action.payload
      };
    case ISSUE_ASK_APPROVAL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: action.success
      };
    case ISSUE_ASK_APPROVAL_FAILURE:
      return {
        ...state,
        success: action.success,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

import {
  ISSUE_GET_FAILURE,
  ISSUE_GET_SUCCESS,
  ISSUE_ADD_FAILURE,
  ISSUE_ADD_SUCCESS,
  ISSUE_REMOVE_SUCCESS,
  ISSUE_REMOVE_FAILURE,
  ISSUE_ASK_APPROVAL_SUCCESS,
  ISSUE_ASK_APPROVAL_FAILURE,
  ISSUE_LOADING,
} from "./issuesActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";
const createSuccess = {
  title: "Success",
  message: "Isssue Created Successfully",
  position: "tr",
  autoDismiss: 3,
};
const createFailure = {
  title: "Error",
  message: "Some Error Occured",
  position: "tr",
  autoDismiss: 3,
};
const removeSuccess = {
  title: "Success",
  message: "Issue Deleted",
  position: "tr",
  autoDismiss: 3,
};
const removeFailure = {
  title: "Error",
  message: "Some Error Occured",
  position: "tr",
  autoDismiss: 3,
};
const askApprovalSuccess = {
  title: "Success",
  message: "Issue Approved",
  position: "tr",
  autoDismiss: 3,
};
const askApprovalFailure = {
  title: "Error",
  message: "Some Error Occured",
  position: "tr",
  autoDismiss: 3,
};

const loadingActionHelper = () => {
  return {
    type: ISSUE_LOADING,
  };
};

export const getIssues = (subProjectId, type) => async dispatch => {
  dispatch(loadingActionHelper());

  try {
    
    const response = await axios.get(
      `${global.config.backendURL}/issues/getIssueByProjectId/${subProjectId}/${type}`
    );
    // 
    dispatch({
      type: ISSUE_GET_SUCCESS,
      payload: response.data,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: ISSUE_GET_FAILURE,
      payload: error.message,
      success: false,
    });
  }
};

export const createIssue = issue => async dispatch => {
  try {
    dispatch(loadingActionHelper());
    const response = await axios.post(
      `${global.config.backendURL}/issues/createIssue`,
      issue
    );
    dispatch({
      type: ISSUE_ADD_SUCCESS,
      success: true,
    });
    const subProjectId = issue.subProjectId;
    const type = issue.type;
    dispatch(getIssues(subProjectId, type));
    dispatch(Notifications.success(createSuccess));
  } catch (error) {
    dispatch({
      type: ISSUE_ADD_FAILURE,
      payload: error.message,
      success: false,
    });
    dispatch(Notifications.error(createFailure));
  }
};

export const removeIssue = (issueId, subProjectId, type) => async dispatch => {
  try {
    const response = await axios.post(
      `${global.config.backendURL}/issues/removeIssue`,
      {
        issueId: issueId,
        subprojectId: global.config.secureStorage.getItem("subprojectId"),
      }
    );
    dispatch({
      type: ISSUE_REMOVE_SUCCESS,
      payload: response.data,
      success: true,
    });
    dispatch(getIssues(subProjectId, type));
    dispatch(Notifications.warning(removeSuccess));
  } catch (error) {
    dispatch({
      type: ISSUE_REMOVE_FAILURE,
      payload: error.message,
      success: false,
    });
    dispatch(Notifications.error(removeFailure));
  }
};

export const askApproval = (issueId, subProjectId, type) => async dispatch => {
  try {
    const response = await axios.post(
      `${global.config.backendURL}/issues/askApproval`,
      {
        issueId: issueId,
        subprojectId: global.config.secureStorage.getItem("subprojectId"),
      }
    );
    
    dispatch({
      type: ISSUE_ASK_APPROVAL_SUCCESS,
      payload: response.data,
      success: true,
    });
    dispatch(getIssues(subProjectId, type));
    dispatch(Notifications.success(askApprovalSuccess));
  } catch (error) {
    dispatch({
      type: ISSUE_ASK_APPROVAL_FAILURE,
      payload: error.message,
      success: false,
    });
    dispatch(Notifications.error(askApprovalFailure));
  }
};

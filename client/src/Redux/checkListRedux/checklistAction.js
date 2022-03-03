import {
  LOADING_ADD_CHECKLIST,
  ERROR_ADD_CHECKLIST,
  SUCCESS_ADD_CHECKLIST,
  LOADING_GET_CHECKLIST,
  SUCCESS_GET_CHECKLIST,
  ERROR_GET_CHECKLIST,
  SUCCESS_GET_DEFAULT_CHECKLIST,
  SUCCESS_UPDATE_DEFAULT_CHECKLIST,
  LOADING_UPDATE_CHECKLIST
} from "./checklistActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";

const getSuccessNotification = msg => {
  return {
    title: "Success",
    message: msg,
    position: "tr",
    autoDismiss: 3
  };
};

const errorNotificationOpts = {
  title: "Error",
  message: "Something went wrong!! Please try again",
  position: "tr",
  autoDismiss: 3
};

// DEFAULT CHECKLIST
export const getDefaultChecklist = type => async dispatch => {
  dispatch({
    type: LOADING_GET_CHECKLIST
  });
  // //
  try {
    const projectId = global.config.secureStorage.getItem("projectId");
    const response = await axios.get(
      `${global.config.backendURL}/checklist/getDefaultChecklist/${projectId}/${type}`
    );
    //
    dispatch({
      type: SUCCESS_GET_DEFAULT_CHECKLIST,
      payload: response.data
    });
  } catch (error) {
    //
    dispatch({
      type: ERROR_GET_CHECKLIST,
      error: error.message
    });
  }
};

export const updateDefaultChecklist = (
  id,
  checklist,
  type
) => async dispatch => {
  dispatch({
    type: LOADING_UPDATE_CHECKLIST
  });
  try {
    let newChecklist = {};
    const projectId = await global.config.secureStorage.getItem("projectId");
    newChecklist["data"] = checklist;
    newChecklist["projectId"] = projectId;
    newChecklist["type"] = type;
    const response = await axios.post(
      `${global.config.backendURL}/checklist/updateDefaultChecklist/${id}`,
      newChecklist
    );
    dispatch({
      type: SUCCESS_UPDATE_DEFAULT_CHECKLIST,
      payload: response.data
    });
    dispatch(getDefaultChecklist(type));
  } catch (error) {
    //
    dispatch({
      type: ERROR_GET_CHECKLIST,
      error: error.message
    });
  }
};

// NEW CHECKLIST
export const addChecklist = newChecklist => async dispatch => {
  dispatch({ type: LOADING_ADD_CHECKLIST });
  //
  newChecklist["subprojectId"] = global.config.secureStorage.getItem(
    "subprojectId"
  );
  try {
    const response = await axios.post(
      `${global.config.backendURL}/checklist/addChecklist`,
      newChecklist
    );
    // dispatch({ type: SUCCESS_ADD_CHECKLIST });
    dispatch(
      fetchCheckList({
        subprojectId: newChecklist["subprojectId"],
        type: newChecklist["type"],
        subActivity: newChecklist["activityName"]
      })
    );
    dispatch(Notifications.success(getSuccessNotification("Checklist Added!")));
  } catch (error) {
    dispatch({ type: ERROR_ADD_CHECKLIST });
    dispatch(Notifications.error(errorNotificationOpts));
    //
  }
};

export const fetchCheckList = (data, notify = false) => async dispatch => {
  dispatch({ type: LOADING_GET_CHECKLIST });
  //
  try {
    const res = await axios.post(
      `${global.config.backendURL}/checklist/getCheckListBySubProjectId`,
      data
    );
    // //
    dispatch({ type: SUCCESS_GET_CHECKLIST, payload: res.data });
    if (notify) {
      dispatch(
        Notifications.success(getSuccessNotification("Checklist Approved!"))
      );
    }
  } catch (error) {
    dispatch({ type: ERROR_GET_CHECKLIST });
  }
};

export const approveCheckList = (
  id,
  subprojectId,
  subActivity,
  type,
  forapproval
) => async dispatch => {
  //
  dispatch({ type: LOADING_GET_CHECKLIST });
  try {
    if (forapproval) {
      await axios.post(
        `${global.config.backendURL}/checklist/approveCheckList/`,
        {
          id: id,
          subprojectId: subprojectId,
          forapproval: true
        }
      );
    } else {
      await axios.post(
        `${global.config.backendURL}/checklist/checkChecklist/`,
        {
          id: id,
          subprojectId: subprojectId,
          forapproval: false
        }
      );
    }
    dispatch(
      fetchCheckList(
        {
          subprojectId,
          subActivity,
          type
        },
        true
      )
    );
  } catch (error) {
    dispatch({ type: ERROR_GET_CHECKLIST });
  }
};

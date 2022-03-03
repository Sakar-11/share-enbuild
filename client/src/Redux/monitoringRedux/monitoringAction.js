import {
  ADD_LOADING,
  MONITORING_SUCCESS,
  MONITORING_ERROR
} from "./monitoringActionTypes";
import axios from "axios";
import Notifications, { success } from "react-notification-system-redux";

const successNotificationOpts = {
  title: "Success",
  message: "Activity updated successfully!",
  position: "tr",
  autoDismiss: 3
};

const errorNotificationOpts = {
  title: "Error",
  message: "Something went wrong!!",
  position: "tr",
  autoDismiss: 3
};

const addLodingActionHelper = () => {
  return {
    type: ADD_LOADING
  };
};

const successActionHelper = data => {
  return {
    type: MONITORING_SUCCESS,
    payload: data
  };
};

const errorActionHelper = err => {
  return {
    type: MONITORING_ERROR,
    payload: err
  };
};

export const getActivities = (one = false) => async dispatch => {
  if (!one) {
    dispatch(addLodingActionHelper());
  }
  try {
    const subprojectId = global.config.secureStorage.getItem("subprojectId");
    const projectId = global.config.secureStorage.getItem("projectId");
    const response = await axios.get(
      `${global.config.backendURL}/monitoring/getActivities/${subprojectId}/${projectId}`
    );
    const perc = await axios.get(
      `${global.config.backendURL}/activities/getPercentage/${projectId}/${subprojectId}`
    );
    // console.table(response.data);
    // var newData =
    // console.table(perc.data);
    var newData = response.data.map((item, index) => ({
      ...item,
      actualcompletion: perc.data[index]
    }));
    var newData = newData.filter(item => item.visibility);
    // console.table(newData);
    dispatch(successActionHelper(newData));
    if (one) {
      dispatch(Notifications.success(successNotificationOpts));
    }
  } catch (error) {
    
    dispatch(errorActionHelper(error.message));
  }
};

export const updateActivity = data => async dispatch => {
  dispatch(addLodingActionHelper());
  try {
    const subprojectId = global.config.secureStorage.getItem("subprojectId");
    const response = await axios.post(
      `${global.config.backendURL}/monitoring/updateActivities`,
      {
        subprojectId,
        data
      }
    );
    dispatch(getActivities(true));
  } catch (error) {
    
    dispatch(errorActionHelper(error.message));
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

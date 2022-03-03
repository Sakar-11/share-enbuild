import {
  LOADING,
  SUCCESS_BAR_CHART_STORE,
  SUCCESS_GET_DEFAULT_ACTIVITY_NAMES,
  ERROR
} from "./barChartTypes";
import axios from "axios";
// import { tsRestType } from "@babel/types";
import Notifications from "react-notification-system-redux";

const successNotificationOpts = {
  title: "Success",
  message: "Bar Chart Updated !",
  position: "tr",
  autoDismiss: 3
};

const errorNotificationOpts = {
  title: "Error",
  message: "Something went wrong!! Please try again",
  position: "tr",
  autoDismiss: 3
};

const loadingActionHelper = () => {
  return {
    type: LOADING
  };
};

const errorActionHelper = error => {
  return {
    type: ERROR,
    error
  };
};

const successDefaultNamesActionHelper = data => {
  return {
    type: SUCCESS_GET_DEFAULT_ACTIVITY_NAMES,
    payload: data
  };
};

const successBarChartStore = data => {
  return {
    type: SUCCESS_BAR_CHART_STORE,
    payload: data
  };
};

export const getBarChartData = () => async dispatch => {
  dispatch(loadingActionHelper());
  // 
  try {
    const projectId = global.config.secureStorage.getItem("projectId");
    const subprojectId = global.config.secureStorage.getItem("subprojectId");
    var newData = [];
    var response = await axios.get(
      `${global.config.backendURL}/barcharts/${subprojectId}/${projectId}`
    );
    newData = response.data;

    dispatch(successDefaultNamesActionHelper(newData));
  } catch (error) {
    
    dispatch(errorActionHelper(error.message));
  }
};

export const saveBarChart = data => async dispatch => {
  dispatch(loadingActionHelper());

  try {
    const subprojectId = global.config.secureStorage.getItem("subprojectId");
    var main = {
      subprojectId,
      data
    };
    const response = await axios.post(
      `${global.config.backendURL}/barcharts/add`,
      main
    );
    dispatch(successBarChartStore(response.data));
    dispatch(Notifications.success(successNotificationOpts));
  } catch (error) {
    
    dispatch(errorActionHelper(error.message));
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

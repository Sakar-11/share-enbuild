import {
  ADD_LOADING,
  PLAN_SUCCESS,
  PLAN_FAILURE,
  GET_PLAN,
} from "./planActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";

const successNotificationOpts = {
  title: "Success",
  message: "Plan added successfully!",
  position: "tr",
  autoDismiss: 3,
};

const errorNotificationOpts = {
  title: "Error",
  message: "Something went wrong!!",
  position: "tr",
  autoDismiss: 3,
};

export const getPlan = () => async dispatch => {
  dispatch({
    type: ADD_LOADING,
  });
  const id = global.config.secureStorage.getItem("subprojectId");
  try {
    const response = await axios.get(
      `${global.config.backendURL}/plan/getPlan/${id}`
    );
    dispatch({
      type: GET_PLAN,
      payload: response.data,
    });
    dispatch({
      type: PLAN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PLAN_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const addPlan = plan => async dispatch => {
  dispatch({
    type: ADD_LOADING,
  });
  plan["subprojectId"] = global.config.secureStorage.getItem("subprojectId");
  try {
    await axios.post(`${global.config.backendURL}/plan/addPlan`, plan);
    dispatch({
      type: PLAN_SUCCESS,
    });
    dispatch(getPlan());
    dispatch(Notifications.success(successNotificationOpts));
  } catch (error) {
    dispatch({
      type: PLAN_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};
export const updatePlan = (planId, plan) => async dispatch => {
  plan["subprojectId"] = global.config.secureStorage.getItem("subprojectId");
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.put(
      `${global.config.backendURL}/plan/updatePlan/${planId}`,
      plan
    );
    dispatch({
      type: PLAN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PLAN_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const deletePlan = id => async dispatch => {
  const subprojectId = global.config.secureStorage.getItem("subprojectId");
  dispatch({
    type: ADD_LOADING,
  });
  try {
    const response = await axios.delete(
      `${global.config.backendURL}/plan/deletePlan/${id}/${subprojectId}`
    );
    dispatch({
      type: PLAN_SUCCESS,
      payload: response.data,
    });
    dispatch(getPlan());
  } catch (error) {
    dispatch({
      type: PLAN_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

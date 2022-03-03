import {
  SET_LOADING,
  SUCCESS_UPDATE_ACTIVITY_DETAILS,
  ERROR_UPDATE_ACTIVITY_DETAILS,
  ERROR_GET_ACTIVITY_DETAILS,
  SUCCESS_GET_ACTIVITY_DETAILS,
  CLEAR_CHECKED_ARRAY,
  DONE_UPDATING_ACTIVITY,
  SUCCESS_GET_DEFAULT_ACTIVITY,
  // SUCCESS_GET_DEFAULT_ACTIVITY_NAMES,
} from "./activityActionTypes";
import axios from "axios";

const loadingActionHelper = () => {
  return {
    type: SET_LOADING,
  };
};

const successDefaultActionHelper = (activities, percentage) => {
  return {
    type: SUCCESS_GET_DEFAULT_ACTIVITY,
    activities,
    // percentage,
  };
};

// const successDefaultNamesActionHelper = data => {
//   return {
//     type: SUCCESS_GET_DEFAULT_ACTIVITY_NAMES,
//     payload: data
//   };
// };

const successActionHelper = data => {
  return {
    type: SUCCESS_GET_ACTIVITY_DETAILS,
    payload: data,
  };
};

const clearCheckedArrayHelper = () => {
  return {
    type: CLEAR_CHECKED_ARRAY,
  };
};

const errorActionHelper = error => {
  return {
    type: ERROR_GET_ACTIVITY_DETAILS,
    error,
  };
};

export const getDefaultActivities = () => async dispatch => {
  dispatch(loadingActionHelper());

  try {
    const projectId = global.config.secureStorage.getItem("projectId");
    const subprojectId = global.config.secureStorage.getItem("subprojectId");
    const response = await axios.get(
      `${global.config.backendURL}/activities/getDefaultActivities/${projectId}`
    );

    // const perc = await axios.get(
    //   `${global.config.backendURL}/activities/getPercentage/${projectId}/${subprojectId}`
    // );

    // dispatch(successDefaultActionHelper(response.data, perc.data));
    dispatch(successDefaultActionHelper(response.data));
  } catch (error) {
    dispatch(errorActionHelper(error.message));
  }
};

export const updateDefaultActivities = (id, newActivity) => async dispatch => {
  dispatch(loadingActionHelper());
  try {
    const response = await axios.put(
      `${global.config.backendURL}/activities/updateDefaultActivities/${id}`,
      newActivity
    );
    dispatch(getDefaultActivities());
    dispatch({ type: SUCCESS_UPDATE_ACTIVITY_DETAILS });
  } catch (error) {
    dispatch(errorActionHelper(error.message));
  }
};

export const getTaskActivityDetails =
  ({ activity, roadNumber, subprojectId }) =>
  async dispatch => {
    //
    dispatch(loadingActionHelper());
    try {
      const res = await axios.get(
        `${global.config.backendURL}/activities/getActivity?activity=${activity}&roadNumber=${roadNumber}&subprojectId=${subprojectId}`
      );
      // console.log("ss", res.data);
      successActionHelper(res.data);
      dispatch(successActionHelper(res.data));
    } catch (err) {
      errorActionHelper(err);
      dispatch(errorActionHelper(err.data));
    }
  };

export const updateTaskActivityDetails = data => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    const res = axios.post(
      `${global.config.backendURL}/activities/updateActivity`,
      data
    );
    dispatch({ type: SUCCESS_UPDATE_ACTIVITY_DETAILS });
  } catch (err) {
    dispatch({ type: ERROR_UPDATE_ACTIVITY_DETAILS });
  }
};

export const updateActivityName = data => async dispatch => {
  dispatch(loadingActionHelper());
  try {
    const response = axios.post(
      `${global.config.backendURL}/activities/updateDefaultSubActivityName`,
      data
    );

    dispatch(getDefaultActivities());
  } catch (err) {
    dispatch(errorActionHelper(err));
  }
};

export const clearActivityCheckedArray = () => dispatch => {
  dispatch(clearCheckedArrayHelper());
};

export const doneUpdating = () => dispatch => {
  dispatch({ type: DONE_UPDATING_ACTIVITY });
};

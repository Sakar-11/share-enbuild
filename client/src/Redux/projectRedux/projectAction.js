import {
  GET_PROJECT,
  PROJECT_FAILURE,
  PROJECT_SUCCESS,
  ADD_PROJECT_LOADING,
  USER_PROJECTS_LOADING,
  USER_PROJECTS_ERROR,
  USER_PROJECTS_SUCCESS,
  ACTIVITIES_FAILURE,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_LOADING,
  FETCH_ACTIVITIES_LOADING,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./projectActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";

const successNotificationOpts = {
  title: "Success",
  message: "Project successfully created!!",
  position: "tr",
  autoDismiss: 3,
};

const errorNotificationOpts = {
  title: "Error",
  message: "Something went wrong!!",
  position: "tr",
  autoDismiss: 3,
};

const successEditUserMsg = {
  title: "Success",
  message: "Users Edited successfully",
  position: "tr",
  autoDismiss: 3,
};

const errorEditUserMsg = {
  title: "Error!!",
  message: "Something went wrong",
  position: "tr",
  autoDismiss: 3,
};

export const getUserProjects = username => async dispatch => {
  dispatch({
    type: USER_PROJECTS_LOADING,
  });
  var data = { username };
  try {
    const res = await axios.post(
      `${global.config.backendURL}/project/getUserProjects`,
      data
    );
    //
    dispatch({
      type: USER_PROJECTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    //
    dispatch({
      type: USER_PROJECTS_ERROR,
      error: err.message,
    });
  }
};
// GET user associated with the project:
export const getUsers = () => async dispatch => {
  const projectId = global.config.secureStorage.getItem("projectId");
  dispatch({
    type: GET_USER_LOADING,
  });
  try {
    const res = await axios.get(
      `${global.config.backendURL}/project/getUserRolesByProjectId/${projectId}`
    );

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAILURE,
      error: err.message,
    });
  }
};

export const deleteProject = projectId => async dispatch => {
  let username = global.config.secureStorage.getItem("username");
  console.log("username");
  try {
    const response = await axios.get(
      `${global.config.backendURL}/project/deleteProjectById/${projectId}/${username}`
    );
    dispatch(
      Notifications.success({
        title: "Success",
        message: "Project Deleted Successfully",
        position: "tr",
        autoDismiss: 3,
      })
    );
    dispatch(getUserProjects(username));
  } catch (error) {
    dispatch(
      Notifications.error({
        title: "Error",
        message: "Project Deletion Failed",
        position: "tr",
        autoDismiss: 3,
      })
    );
  }
};
export const getAllProjects = project => async dispatch => {
  try {
    const response = await axios.get(
      `${global.config.backendURL}/project/getAllProjects`
    );
    dispatch({
      type: GET_PROJECT,
      payload: response.data,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_FAILURE,
      payload: error.message,
      success: false,
    });
  }
};
export const projectLoading = () => {
  return {
    type: ADD_PROJECT_LOADING,
  };
};

export const editUserNotificationUtil = success => dispatch => {
  if (success) {
    dispatch(Notifications.success(successEditUserMsg));
  } else {
    dispatch(Notifications.error(errorEditUserMsg));
  }
};

export const addProject = project => async dispatch => {
  //
  dispatch(projectLoading());
  try {
    const response = await axios.post(
      `${global.config.backendURL}/project/addProject`,
      project
    );

    dispatch({
      type: PROJECT_SUCCESS,
      payload: response.data,
      success: true,
    });
    // dispatch(Notifications.success(successNotificationOpts));
  } catch (error) {
    dispatch({
      type: PROJECT_FAILURE,
      payload: error.message,
      success: false,
    });
    // dispatch(Notifications.error(errorNotificationOpts));
  }
};

// The function is written in store reducer now

// export const addMaterialList = materials => async dispatch => {
//   //
//   dispatch({ type: MATERIALS_LOADING });
//   await axios
//     .post(`${global.config.backendURL}/project/addmaterials`, {
//       payload: materials,
//       projectId: global.config.secureStorage.getItem("projectId")
//     })
//     .then(res => {
//       dispatch({
//         type: MATERIALS_SUCCESS,
//         payload: res.data,
//         success: true
//       });
//       dispatch(
//         Notifications.success({
//           title: "Success",
//           message: "Materials Added",
//           position: "tr",
//           autoDismiss: 3
//         })
//       );
//     })
//     .catch(error => {
//       dispatch({
//         type: MATERIALS_FAILURE,
//         payload: error.message,
//         success: false
//       });
//       dispatch(
//         Notifications.error({
//           title: "Error",
//           message: "Something Went Wrong!!",
//           position: "tr",
//           autoDismiss: 3
//         })
//       );
//     });
// };

export const updateActivities = excludes => async dispatch => {
  dispatch({ type: ACTIVITIES_LOADING });
  await axios
    .put(`${global.config.backendURL}/project/updateActivities`, {
      payload: excludes,
      projectId: global.config.secureStorage.getItem("projectId"),
    })
    .then(res => {
      dispatch({
        type: ACTIVITIES_SUCCESS,
        payload: res.data,
        success: true,
      });
      dispatch(
        Notifications.success({
          title: "Success",
          message: "Activities Updated !",
          position: "tr",
          autoDismiss: 3,
        })
      );
      fetchExcludedActivities();
    })
    .catch(error => {
      dispatch({
        type: ACTIVITIES_FAILURE,
        payload: error.message,
        success: false,
      });
      dispatch(
        Notifications.error({
          title: "Error",
          message: "Something Went Wrong!!",
          position: "tr",
          autoDismiss: 3,
        })
      );
    });
};

export const fetchExcludedActivities = () => async dispatch => {
  const projectId = global.config.secureStorage.getItem("projectId");
  dispatch({ type: FETCH_ACTIVITIES_LOADING });
  await axios
    .get(
      `${global.config.backendURL}/project/getExcludedActivities/${projectId}`
    )
    .then(res => {
      //
      dispatch({
        type: ACTIVITIES_SUCCESS,
        payload: res.data,
        success: true,
      });
    })
    .catch(error => {
      dispatch({
        type: ACTIVITIES_FAILURE,
        payload: error.message,
        success: false,
      });
      dispatch(
        Notifications.error({
          title: "Error",
          message: "Something Went Wrong!!",
          position: "tr",
          autoDismiss: 3,
        })
      );
    });
};

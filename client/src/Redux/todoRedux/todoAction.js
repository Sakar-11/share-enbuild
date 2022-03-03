import {
  ADD_LOADING,
  TODO_SUCCESS,
  TODO_FAILURE,
  GET_TODO
} from "./todoActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";

const successNotificationOpts = {
  title: "Success",
  message: "Todo added successfully!",
  position: "tr",
  autoDismiss: 3
};

const errorNotificationOpts = {
  title: "Error",
  message: "Something went wrong!!",
  position: "tr",
  autoDismiss: 3
};

export const getTodo = () => async dispatch => {
  dispatch({
    type: ADD_LOADING
  });
  const id = global.config.secureStorage.getItem("subprojectId");
  //
  try {
    const response = await axios.get(
      `${global.config.backendURL}/todo/getTodo/${id}`
    );
    var data = response.data;
    const role = global.config.secureStorage.getItem("role");
    const fullName = global.config.secureStorage.getItem("user_fullname");
    const roles = [
      "chief_engineer",
      "technical_director",
      "project_manager",
      "super_admin"
    ];

    if (!roles.find(item => item == role)) {
      data = data.filter(item => item["userName"] == fullName);
    }

    dispatch({
      type: GET_TODO,
      payload: data
    });
    dispatch({
      type: TODO_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: TODO_FAILURE,
      payload: error.message
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const addTodo = todo => async dispatch => {
  dispatch({
    type: ADD_LOADING
  });
  todo["subprojectId"] = global.config.secureStorage.getItem("subprojectId");
  try {
    await axios.post(`${global.config.backendURL}/todo/addTodo`, todo);
    dispatch({
      type: TODO_SUCCESS
    });
    dispatch(getTodo());
    dispatch(Notifications.success(successNotificationOpts));
  } catch (error) {
    dispatch({
      type: TODO_FAILURE,
      payload: error.message
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const deleteTodo = id => async dispatch => {
  dispatch({
    type: ADD_LOADING
  });
  try {
    const response = await axios.delete(
      `${global.config.backendURL}/todo/deleteTodo/${id}`
    );
    dispatch({
      type: TODO_SUCCESS,
      payload: response.data
    });
    dispatch(getTodo());
  } catch (error) {
    dispatch({
      type: TODO_FAILURE,
      payload: error.message
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};
export const updateTodo = (id, todo) => async dispatch => {
  todo["subprojectId"] = global.config.secureStorage.getItem("subprojectId");
  dispatch({
    type: ADD_LOADING
  });
  try {
    await axios.put(`${global.config.backendURL}/todo/updateTodo/${id}`, todo);
    dispatch(getTodo());
  } catch (error) {
    dispatch({
      type: TODO_FAILURE,
      payload: error.message
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

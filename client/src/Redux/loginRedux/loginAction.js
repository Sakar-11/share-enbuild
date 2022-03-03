import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REDIRECT_TO_JOIN,
} from "./loginActionTypes";
import axios from "axios";

import Notifications from "react-notification-system-redux";
const notificationOpts = {
  title: "Error",
  message: "Invalid Username or Password",
  position: "tr",
  autoDismiss: 2,
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (username, user) => {
  return {
    type: LOGIN_SUCCESS,
    username: username,
    user: user,
  };
};

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    error: error,
  };
};

export const redirectToJoinPage = () => {
  return {
    type: REDIRECT_TO_JOIN,
  };
};
export const logoutRequest = () => {
  return {
    type: LOGOUT,
  };
};

export const logout = () => {
  return async function (dispatch) {
    var reqData = {
      username: global.config.secureStorage.getItem("username"),
      notification_id: global.config.secureStorage.getItem("notification_id"),
    };
    global.config.secureStorage.clear();
    try {
      const res = await axios.post(
        `${global.config.backendURL}/users/removeNotificationId`,
        reqData
      );
    } catch (err) {}
    dispatch(logoutRequest());
  };
};

export const login = (username, password) => {
  console.clear();

  var reqData = {
    username: username,
    password: password,
    notification_id: global.config.secureStorage.getItem("notification_id"),
  };
  return async function (dispatch) {
    dispatch(loginRequest());
    try {
      const res = await axios.post(
        `${global.config.backendURL}/login`,
        reqData
      );
      global.config.secureStorage.setItem(
        "construction-auth-token",
        res.data.token
      );
      global.config.secureStorage.setItem("user_id", res.data.user._id);
      global.config.secureStorage.setItem(
        "user_fullname",
        res.data.user.firstName + " " + res.data.user.lastName
      );
      const isAdmin = res.data.user.isAdmin ? res.data.user.isAdmin : false;
      const mainAdmin = res.data.user.mainAdmin
        ? res.data.user.mainAdmin
        : false;
      global.config.secureStorage.setItem("username", username);
      global.config.secureStorage.setItem("is_admin", isAdmin);
      global.config.secureStorage.setItem("main_admin", mainAdmin);
      if (isAdmin) {
        global.config.secureStorage.setItem(
          "organization",
          res.data.user.organization
        );
      }
      dispatch(loginSuccess(username, res.data.user));
    } catch (err) {
      dispatch(loginFailure(err));
      dispatch(Notifications.error(notificationOpts));
    }
  };
};

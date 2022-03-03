import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USERNAME_EXISTS,
} from "./registerActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";

const unameNotificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Error",
  message: "User Already Registered ! Please Login",
  position: "tr",
  autoDismiss: 3,
};

const failureNotificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Oops",
  message: "Some Error Occured ! Try Again !",
  position: "tr",
  autoDismiss: 3,
};

const successNotificationOpts = {
  title: "Success",
  message: "User registration successful",
  position: "tr",
  autoDismiss: 3,
};
export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};
export const usernameExists = error => {
  return {
    type: USERNAME_EXISTS,
    error: error,
  };
};
export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const registerFailure = error => {
  return {
    type: REGISTER_FAILURE,
    error: error,
  };
};

export const register = ({
  email,
  username,
  phone,
  organization,
  password,
  firstName,
  lastName,
  isAdmin,
  requestAdmin,
  mainAdmin,
}) => {
  const reqData = {
    email,
    phone,
    username,
    organization,
    password,
    firstName,
    lastName,
    isAdmin,
    requestAdmin,
    mainAdmin,
  };
  console.log(reqData);

  return async function (dispatch) {
    dispatch(registerRequest());
    try {
      const res = await axios.post(
        `${global.config.backendURL}/register`,
        reqData
      );
      if (res.data.err && res.data.err === "UEXIST") {
        dispatch(usernameExists(res.data.err));
        dispatch(Notifications.error(unameNotificationOpts));
        return;
      }
      dispatch(registerSuccess());
      dispatch(Notifications.success(successNotificationOpts));
    } catch (err) {
      dispatch(registerFailure(err));
      dispatch(Notifications.error(failureNotificationOpts));
    }
  };
};

import {
  ADD_LOADING,
  // MATERIAL_SUCCESS,
  MATERIAL_FAILURE,
  GET_MATERIAL,
  GET_STORE,
  STORE_FAILURE,
  STORE_SUCCESS,
} from "./materialActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";

const successNotificationOpts = {
  title: "Success",
  message: "Material added successfully!",
  position: "tr",
  autoDismiss: 3,
};

const errorNotificationOpts = {
  title: "Error",
  message: "Something went wrong!!",
  position: "tr",
  autoDismiss: 3,
};

export const getStore = () => async dispatch => {
  dispatch({
    type: ADD_LOADING,
  });
  const id = global.config.secureStorage.getItem("projectId");
  try {
    const response = await axios.get(
      `${global.config.backendURL}/stores/getStore/${id}`
    );
    dispatch({
      type: GET_STORE,
      payload: response.data,
    });
  } catch (error) {
    
    dispatch({
      type: STORE_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};
export const getMaterial = () => async dispatch => {
  dispatch({
    type: ADD_LOADING,
  });
  const id = global.config.secureStorage.getItem("projectId");
  try {
    const response = await axios.get(
      `${global.config.backendURL}/material/getMaterial/${id}`
    );
    dispatch({
      type: GET_MATERIAL,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MATERIAL_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const addMaterial = material => async dispatch => {
  dispatch({
    type: ADD_LOADING,
  });
  material["projectId"] = global.config.secureStorage.getItem("projectId");
  try {
    await axios.post(
      `${global.config.backendURL}/material/addMaterial`,
      material
    );

    dispatch(getMaterial());
    dispatch(Notifications.success(successNotificationOpts));
  } catch (error) {
    dispatch({
      type: MATERIAL_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const updateMaterial = (materialID, material) => async dispatch => {
  material["projectId"] = global.config.secureStorage.getItem("projectId");
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.put(
      `${global.config.backendURL}/material/updateMaterial/${materialID}`,
      material
    );
    dispatch(getMaterial());
  } catch (error) {
    dispatch({
      type: MATERIAL_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};
export const updateStore = (
  materialName,
  materialQuantity
) => async dispatch => {
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.patch(`${global.config.backendURL}/material/updateStore`, {
      materialQuantity: materialQuantity,
      materialName: materialName,
    });
    dispatch({
      type: STORE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: STORE_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};
export const addDeliveryDate = (materialID, material) => async dispatch => {
  const projectId = global.config.secureStorage.getItem("projectId");
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.patch(
      `${global.config.backendURL}/material/addDeliveryDate/${materialID}/${projectId}`,
      { material }
    );
    dispatch(getMaterial());
  } catch (error) {
    dispatch({
      type: MATERIAL_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const deleteMaterial = id => async dispatch => {
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.delete(
      `${global.config.backendURL}/material/deleteMaterial/${id}`
    );
    dispatch(getMaterial());
  } catch (error) {
    dispatch({
      type: MATERIAL_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

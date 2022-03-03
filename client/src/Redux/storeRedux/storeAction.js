import {
  ADD_LOADING,
  MATERIAL_SUCCESS,
  MATERIAL_FAILURE,
  GET_MATERIAL,
  GET_STORE_FAILURE,
  GET_STORE_SUCCESS,
  ADD_ISSUE_HISTORY_LOADING,
  ISSUE_HISTORY_ERROR,
  ISSUE_HISTORY_SUCCESS,
  ADD_ISSUE,
  MATERIALS_LIST_LOADING,
  MATERIALS_LIST_FAILURE,
  MATERIALS_LIST_SUCCESS,
  ADD_MATERIAL_REQ,
  MATERIAL_REQ_LOADING,
  MATERIAL_REQ_SUCCESS,
  MATERIAL_REQ_ERROR,
  REJECT_MATERIAL_REQ,
} from "./storeActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";

const successNotificationOpts = {
  title: "Success",
  message: "Material added successfully!",
  position: "tr",
  autoDismiss: 3,
};

const successNotificationIssue = {
  title: "Success",
  message: "Material issued successfully!",
  position: "tr",
  autoDismiss: 3,
};

const successMaterialReq = {
  title: "Success",
  message: "Material successfully sent for approval!",
  position: "tr",
  autoDismiss: 3,
};

const successMaterialReqApproval = {
  title: "Success",
  message: "Material issued succesfully!",
  position: "tr",
  autoDismiss: 3,
};

const successMaterialReqRejection = {
  title: "Success",
  message: "Material requisition rejected succesfully!",
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
      type: GET_STORE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_STORE_FAILURE,
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
    dispatch({
      type: MATERIAL_SUCCESS,
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
    dispatch({
      type: MATERIAL_SUCCESS,
    });
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
    dispatch({
      type: MATERIAL_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MATERIAL_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};
export const updateStore = data => async dispatch => {
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.post(`${global.config.backendURL}/stores/updateStore`, {
      id: data._id,
      data,
    });
    dispatch(getStore());
  } catch (error) {
    dispatch({
      type: GET_STORE_FAILURE,
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
    dispatch({
      type: MATERIAL_SUCCESS,
    });
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
    dispatch({
      type: MATERIAL_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MATERIAL_FAILURE,
      payload: error.message,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const addIssue = (id, data) => async dispatch => {
  const projectId = global.config.secureStorage.getItem("projectId");
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.post(`${global.config.backendURL}/stores/issueHistory`, {
      projectId,
      id,
      data,
    });
    dispatch({
      type: ADD_ISSUE,
    });
    dispatch(getStore());
    dispatch(Notifications.success(successNotificationIssue));
  } catch (err) {
    dispatch({
      type: ADD_ISSUE,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const getIssues = id => async dispatch => {
  dispatch({
    type: ADD_ISSUE_HISTORY_LOADING,
  });

  try {
    const res = await axios.get(
      `${global.config.backendURL}/stores/issueHistory/${id}`
    );
    dispatch({
      type: ISSUE_HISTORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ISSUE_HISTORY_ERROR,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const getMaterialReqIssues = id => async dispatch => {
  dispatch({
    type: MATERIAL_REQ_LOADING,
  });

  try {
    const res = await axios.get(
      `${global.config.backendURL}/stores/materialReqIssues/${id}`
    );
    dispatch({
      type: MATERIAL_REQ_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MATERIAL_REQ_ERROR,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const addMaterialReq = (id, data) => async dispatch => {
  const projectId = global.config.secureStorage.getItem("projectId");
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.post(`${global.config.backendURL}/stores/materialReqIssues`, {
      projectId,
      id,
      data,
    });
    dispatch({
      type: ADD_MATERIAL_REQ,
    });
    dispatch(getStore());
    dispatch(Notifications.success(successMaterialReq));
  } catch (err) {
    dispatch({
      type: ADD_MATERIAL_REQ,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const approveMaterialReq = (id, data) => async dispatch => {
  const projectId = global.config.secureStorage.getItem("projectId");
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.post(`${global.config.backendURL}/stores/approveRequisition`, {
      projectId,
      id,
      data,
    });
    dispatch({
      type: ADD_MATERIAL_REQ,
    });
    dispatch(getStore());
    dispatch(Notifications.success(successMaterialReqApproval));
  } catch (err) {
    dispatch({
      type: ADD_MATERIAL_REQ,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

export const rejectMaterialReq = (id, data) => async dispatch => {
  const projectId = global.config.secureStorage.getItem("projectId");
  dispatch({
    type: ADD_LOADING,
  });
  try {
    await axios.post(`${global.config.backendURL}/stores/rejectRequisition`, {
      projectId,
      id,
      data,
    });
    dispatch({
      type: REJECT_MATERIAL_REQ,
    });
    dispatch(getStore());
    dispatch(Notifications.success(successMaterialReqRejection));
  } catch (err) {
    dispatch({
      type: REJECT_MATERIAL_REQ,
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};

/*export const deleteMaterialReq = id => async dispatch => {
  dispatch({
    type: ADD_LOADING
  });
  try {
    const response = await axios.delete(
      `${global.config.backendURL}/stores/materialReqIssues/${id}`
    );
    dispatch({
      type: MATERIAL_REQ_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: MATERIAL_REQ_ERROR,
      payload: error.message
    });
    dispatch(Notifications.error(errorNotificationOpts));
  }
};*/

export const addMaterialList = materials => async dispatch => {
  //
  dispatch({ type: MATERIALS_LIST_LOADING });
  await axios
    .post(`${global.config.backendURL}/project/addmaterials`, {
      payload: materials,
      projectId: global.config.secureStorage.getItem("projectId"),
    })
    .then(res => {
      dispatch({
        type: MATERIALS_LIST_SUCCESS,
        payload: res.data,
        success: true,
      });
      dispatch(getStore());
      dispatch(
        Notifications.success({
          title: "Success",
          message: "Materials Added",
          position: "tr",
          autoDismiss: 3,
        })
      );
    })
    .catch(error => {
      dispatch({
        type: MATERIALS_LIST_FAILURE,
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

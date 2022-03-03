import {
  GET_SUBPROJECTS,
  LOADING_SUBPROJECTS,
  ERROR_SUBPROJECTS
} from "./subProjectActionTypes";
import axios from "axios";

const getSubprojectsAction = data => ({
  type: GET_SUBPROJECTS,
  payload: data
});

const loadingSubprojectsAction = () => ({
  type: LOADING_SUBPROJECTS
});

const errorSubprojectsAction = err => ({
  type: ERROR_SUBPROJECTS,
  error: err
});

export const getSubprojects = id => async dispatch => {
  dispatch(loadingSubprojectsAction());
  const body = {
    id
  };
  try {
    const res = await axios.post(
      `${global.config.backendURL}/project/getSubProject`,
      body
    );
    dispatch(getSubprojectsAction(res.data));
  } catch (err) {
    
    dispatch(errorSubprojectsAction(err.message));
  }
};

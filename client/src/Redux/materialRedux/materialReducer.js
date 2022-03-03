import {
  ADD_LOADING,
  MATERIAL_ERROR,
  MATERIAL_FAILURE,
  MATERIAL_SUCCESS,
  GET_MATERIAL,
  GET_STORE,
  STORE_FAILURE
} from "./materialActionTypes";

const initialState = {
  data: [],
  storeData: [],
  success: false,
  loading: false,
  error: false
};

export const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MATERIAL:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case GET_STORE:
      return {
        ...state,
        storeData: action.payload,
        loading: false
      };
    case STORE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case MATERIAL_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false
      };
    case MATERIAL_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case MATERIAL_FAILURE:
      return {
        ...state,
        data: action.payload,
        success: false,
        loading: false
      };
    default:
      return state;
  }
};

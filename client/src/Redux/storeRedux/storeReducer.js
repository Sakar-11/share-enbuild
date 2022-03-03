import {
  ADD_LOADING,
  MATERIAL_FAILURE,
  MATERIAL_SUCCESS,
  GET_MATERIAL,
  GET_STORE_SUCCESS,
  GET_STORE_FAILURE,
  ISSUE_HISTORY_SUCCESS,
  ISSUE_HISTORY_ERROR,
  ADD_ISSUE,
  ADD_ISSUE_HISTORY_LOADING,
  MATERIALS_LIST_SUCCESS,
  MATERIALS_LIST_FAILURE,
  MATERIALS_LIST_LOADING,
  ADD_MATERIAL_REQ,
  MATERIAL_REQ_LOADING,
  MATERIAL_REQ_SUCCESS,
  MATERIAL_REQ_ERROR,
  REJECT_MATERIAL_REQ,
} from "./storeActionTypes";

const initialState = {
  data: [],
  storeData: [],
  success: false,
  loading: false,
  getStoreLoading: false,
  getStoreSuccess: false,
  getStoreError: false,
  error: "",
  issueLoading: false,
  issueHistory: [],
  issueError: false,
  materials: [],
  materialListLoading: false,
  materialListSuccess: false,
  materialListFailure: false,
  materialReqLoading: false,
  materialReqError: false,
  materialReqIssues: [],
};

export const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOADING:
      return {
        ...state,
        getStoreLoading: true,
      };
    case GET_MATERIAL:
      return {
        ...state,
        data: action.payload,
      };
    case GET_STORE_SUCCESS:
      return {
        ...state,
        storeData: action.payload,
        getStoreLoading: false,
        getStoreSuccess: true,
      };
    case GET_STORE_FAILURE:
      return {
        ...state,
        getStoreLoading: false,
        error: action.payload,
        getStoreError: true,
      };
    case MATERIAL_SUCCESS:
      return {
        ...state,
        success: true,
        getStoreLoading: false,
        loading: false,
      };
    case MATERIAL_FAILURE:
      return {
        ...state,
        data: action.payload,
        success: false,
        getStoreLoading: false,
        loading: false,
      };
    case ADD_ISSUE:
      return {
        ...state,
        getStoreLoading: false,
        loading: false,
      };

    case ADD_ISSUE_HISTORY_LOADING: {
      return {
        ...state,
        issueLoading: true,
      };
    }

    case ISSUE_HISTORY_SUCCESS:
      return {
        ...state,
        issueLoading: false,
        issueHistory: action.payload,
        issueError: false,
      };
    case ISSUE_HISTORY_ERROR:
      return {
        ...state,
        issueLoading: false,
        issueError: true,
      };
    case MATERIALS_LIST_LOADING:
      return { ...state, materialListLoading: true };
    case MATERIALS_LIST_SUCCESS: {
      return {
        ...state,
        materials: action.payload,
        materialListLoading: false,
        materialListSuccess: true,
      };
    }
    case MATERIALS_LIST_FAILURE: {
      return {
        ...state,
        materialListFailure: true,
        materialListLoading: false,
        materialListError: action.error,
      };
    }
    case ADD_MATERIAL_REQ:
      return {
        ...state,
        getStoreLoading: false,
        loading: false,
      };

    case MATERIAL_REQ_LOADING: {
      return {
        ...state,
        materialReqLoading: true,
      };
    }

    case MATERIAL_REQ_SUCCESS:
      return {
        ...state,
        materialReqLoading: false,
        materialReqIssues: action.payload,
        materialReqError: false,
      };
    case MATERIAL_REQ_ERROR:
      return {
        ...state,
        materialReqLoading: false,
        materialReqError: true,
      };
    case REJECT_MATERIAL_REQ:
      return {
        ...state,
        getStoreLoading: false,
        loading: false,
      };

    default:
      return state;
  }
};

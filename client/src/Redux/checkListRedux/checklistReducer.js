import {
  ERROR_GET_CHECKLIST,
  SUCCESS_GET_CHECKLIST,
  LOADING_GET_CHECKLIST,
  SUCCESS_ADD_CHECKLIST,
  ERROR_ADD_CHECKLIST,
  LOADING_ADD_CHECKLIST,
  SUCCESS_UPDATE_CHECKLIST,
  LOADING_UPDATE_CHECKLIST,
  ERROR_UPDATE_CHECKLIST,
  SUCCESS_UPDATE_CHECKLIST_TASKS,
  ERROR_UPDATE_CHECKLIST_TASKS,
  LOADING_UPDATE_CHECKLIST_TASKS,
  SUCCESS_GET_DEFAULT_CHECKLIST,
  SUCCESS_UPDATE_DEFAULT_CHECKLIST
} from "./checklistActionTypes";

const initialState = {
  loading: true,
  success: false,
  error: false,
  tasks: [],
  defaultChecklist: { data: [] },
  msg: ""
};

const checkListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_GET_DEFAULT_CHECKLIST:
      return {
        ...state,
        success: true,
        loading: false,
        defaultChecklist: action.payload ? action.payload : { data: [] }
      };
    case SUCCESS_UPDATE_DEFAULT_CHECKLIST:
      return {
        ...state,
        success: true,
        loading: false
      };
    case SUCCESS_GET_CHECKLIST:
    case SUCCESS_UPDATE_CHECKLIST:
      return {
        ...state,
        success: true,
        loading: false,
        tasks: action.payload ? action.payload : []
      };
    case SUCCESS_ADD_CHECKLIST:
      return {
        ...state,
        success: true,
        loading: false
      };
    case ERROR_GET_CHECKLIST:
    case ERROR_UPDATE_CHECKLIST:
    case ERROR_ADD_CHECKLIST:
      return {
        ...state,
        error: true,
        loading: false,
        msg: action.error ? action.error : ""
      };
    case LOADING_UPDATE_CHECKLIST:
    case LOADING_ADD_CHECKLIST:
    case LOADING_GET_CHECKLIST:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default checkListReducer;

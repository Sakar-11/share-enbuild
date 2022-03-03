import {
  GET_PROJECT,
  PROJECT_FAILURE,
  PROJECT_SUCCESS,
  ADD_PROJECT_LOADING,
  USER_PROJECTS_ERROR,
  USER_PROJECTS_SUCCESS,
  USER_PROJECTS_LOADING,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
  // ACTIVITIES_LOADING,
  FETCH_ACTIVITIES_LOADING,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./projectActionTypes";

const initialState = {
  data: [],
  success: false,
  loading: false,
  userProjectLoading: false,
  userProjectSuccess: false,
  userProjectIsError: false,
  userProjectError: "",
  userProjects: [],
  excludedActivities: [],
  activitiesError: false,
  fetchActivitiesLoading: false,
  userRolesLoading: false,
  userRolesSuccess: false,
  userRolesFailure: false,
  userRoles: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        data: action.payload,
        success: action.success,
      };
    case ADD_PROJECT_LOADING:
      return {
        ...state,
        activitiesError: false,
        loading: true,
      };
    case PROJECT_SUCCESS:
      // 
      return {
        ...state,
        data: action.payload,
        success: action.success,
        loading: false,
      };
    case PROJECT_FAILURE:
      return {
        ...state,
        data: action.payload,
        success: action.success,
        loading: false,
      };
    case ACTIVITIES_SUCCESS:
      // 
      return {
        ...state,
        excludedActivities: action.payload,
        fetchActivitiesLoading: false,
      };
    case ACTIVITIES_FAILURE:
      return {
        ...state,
        activitiesError: action.error,
        fetchActivitiesLoading: false,
      };
    case FETCH_ACTIVITIES_LOADING:
      return {
        ...state,
        fetchActivitiesLoading: true,
      };
    case USER_PROJECTS_LOADING:
      return {
        ...state,
        userProjectLoading: true,
      };
    case USER_PROJECTS_SUCCESS: {
      return {
        ...state,
        userProjects: action.payload,
        userProjectLoading: false,
        userProjectSuccess: true,
      };
    }
    case USER_PROJECTS_ERROR: {
      return {
        ...state,
        userProjectIsError: true,
        userProjectError: action.error,
        userProjectLoading: false,
      };
    }

    case GET_USER_LOADING:
      return {
        ...state,
        userRolesLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userRoles: action.payload,
        userRolesLoading: false,
        userRolesSuccess: true,
      };
    // }
    case GET_USER_FAILURE: {
      return {
        ...state,
        userRoles: action.payload,
        // userProjectIsError: true,
        // needs modification
        userRolesFailure: true,
        userRolesLoading: false,
      };
    }
    default:
      return state;
  }
};

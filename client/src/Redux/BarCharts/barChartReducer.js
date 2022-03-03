import {
  SUCCESS_BAR_CHART_STORE,
  SUCCESS_GET_DEFAULT_ACTIVITY_NAMES,
  ERROR,
  LOADING
} from "./barChartTypes";

const initialState = {
  loading: true,
  defaultActivityNames: [],
  storeData: [],
  error: "",
  isError: false
};

const barChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        isError: true
      };
    case SUCCESS_GET_DEFAULT_ACTIVITY_NAMES:
      return {
        ...state,
        defaultActivityNames: action.payload,
        loading: false
      };
    case SUCCESS_BAR_CHART_STORE:
      return {
        ...state,
        loading: false,
        storeData: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default barChartReducer;

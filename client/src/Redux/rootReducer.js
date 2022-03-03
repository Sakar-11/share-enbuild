import { combineReducers } from "redux";
import { reducer as notifications } from "react-notification-system-redux";
import { loginReducer } from "./loginRedux/loginReducer";
import { registerReducer } from "./registerRedux/registerReducer";
import { projectReducer } from "./projectRedux/projectReducer";
import { issuesReducer } from "./IssuesRedux/issuesReducer";
import { materialReducer } from "./materialRedux/materialReducer";
import { todoReducer } from "./todoRedux/todoReducer";
import { planReducer } from "./planningRedux/planReducer";
import { storeReducer } from "./storeRedux/storeReducer";
import subProjectReducer from "./subProjectRedux/subProjectReducer";
import activityReducer from "./activityRedux/activityReducer";
import checkListReducer from "./checkListRedux/checklistReducer";
import barChartReducer from "./BarCharts/barChartReducer";
import { monitoringReducer } from "./monitoringRedux/monitoringReducer";
//inside combine reducers name of imported reducers - combineReducers({nameOfReducer, nameOfReducer2});
export const rootReducer = combineReducers({
  notifications,
  loginReducer,
  registerReducer,
  projectReducer,
  issuesReducer,
  subProjectReducer,
  materialReducer,
  activityReducer,
  todoReducer,
  checkListReducer,
  planReducer,
  storeReducer,
  barChartReducer,
  monitoringReducer
});

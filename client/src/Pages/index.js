import React from "react";
import Checklist from "./Checklist";
import NewProject from "./NewProject";
import Login from "./Login";
import Register from "./Register";
import ProjectList from "./ProjectList";
import SubProjectList from "./SubprojectList";
import Issues from "./Issues";
import Material from "./Material";
import Todo from "./ToDos";
import Activities from "./activities";
import SubActivities from "./activities/SubActivities";
import SubTaskData from "./activities/SubTaskData";
import Planing from "./Planning/Display";
import Store from "./Store/Display";
import ActivityChecklist from "./Checklist/ActivityChecklist";
import DetailsChecklist from "./Checklist/DetailsChecklist";
import AddChecklist from "./Checklist/AddChecklist";
import BarChart from "./BarChart";
import Monitoring from "./Monitoring/Display";
import AddMaterialList from "./AddMaterialList";
import EditUser from "./EditUser";
import Support from "./Support";
import Home from "./Home";
import AdminDashboard from "./AdminDashboard";
import DailyProgressReport from "./Daily Progress Report/DailyProgressReport";

const routes = [
  {
    path: "/",
    name: "Enbuild",
    component: props => <Home {...props} />,
    isProtected: false,
  },
  {
    path: "/login",
    name: "Login Page",
    component: props => <Login {...props} />,
    isProtected: false,
  },
  {
    path: "/register",
    name: "Register Page",
    component: props => <Register {...props} />,
    isProtected: false,
  },
  {
    path: "/registerAdmin",
    name: "Register Page",
    component: props => <Register {...props} />,
    isProtected: false,
  },
  {
    path: "/store",
    name: "Store",
    component: props => <Store {...props} />,
    isProtected: true,
  },
  {
    path: "/activities",
    name: "Activities",
    component: props => <Activities {...props} />,
    isProtected: true,
  },
  {
    path: "/activities/:activity/:subactivity",
    name: "SubActivities",
    component: props => <SubActivities {...props} />,
    isProtected: true,
  },
  {
    path: "/activities/:activity/:subactivity/:floorNumber/:subTaskIndex",
    name: "SubTaskData",
    component: props => <SubTaskData {...props} />,
    isProtected: true,
  },
  {
    path: "/checklist/:type",
    name: "Checklist",
    component: props => <Checklist {...props} />,
    isProtected: true,
  },
  {
    path: "/checklist/:type/:defaultChecklist",
    name: "ActivityChecklist",
    component: props => <ActivityChecklist {...props} />,
    isProtected: true,
  },
  {
    path: "/checklist/:type/:defaultChecklist/addChecklist",
    name: "Add Checklist",
    component: props => <AddChecklist {...props} />,
    isProtected: true,
  },
  {
    path: "/projectList",
    name: "Project List",
    component: props => <ProjectList {...props} />,
    isProtected: true,
  },
  {
    path: "/subprojectList",
    name: "SubProjects",
    component: props => <SubProjectList {...props} />,
    isProtected: true,
  },
  {
    path: "/addProject",
    name: "Add Project",
    component: props => <NewProject {...props} />,
    isProtected: true,
  },
  {
    path: "/material",
    name: "Material",
    component: props => <Material {...props} />,
    isProtected: true,
  },
  {
    path: "/todo",
    name: "Todo",
    component: props => <Todo {...props} />,
    isProtected: true,
  },
  {
    path: "/issues/:type",
    name: "Issues",
    component: props => <Issues {...props} />,
    isProtected: true,
  },
  {
    path: "/monitoring",
    name: "Monitoring",
    component: props => <Monitoring {...props} />,
    isProtected: true,
  },
  {
    path: "/plan",
    name: "Planning",
    component: props => <Planing {...props} />,
    isProtected: true,
  },
  {
    path: "/barchart",
    name: "Bar Chart",
    component: props => <BarChart {...props} />,
    isProtected: true,
  },
  {
    path: "/dpr",
    name: "Daily Progress Report",
    component: props => <DailyProgressReport {...props} />,
    isProtected: true,
  },
  {
    path: "/addMaterial",
    name: "Add Material",
    component: props => <AddMaterialList {...props} />,
    isProtected: true,
  },
  {
    path: "/editUser",
    name: "Edit User",
    component: props => <EditUser {...props} />,
    isProtected: true,
  },
  {
    path: "/support",
    name: "Support",
    component: props => <Support {...props} />,
    isProtected: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: props => <AdminDashboard {...props} />,
    isProtected: true,
  },
];

export default routes;

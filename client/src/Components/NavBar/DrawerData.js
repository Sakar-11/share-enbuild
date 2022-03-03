import React from "react";
import {
  ShoppingCart,
  Add as AddIcon,
  LocalActivity,
  Receipt,
  Work,
  BugReport,
  List as ListIcon,
  PersonalVideo as Monitor,
  BarChart as BarChartIcon,
  PlaylistAdd as ToDoIcon,
  Store as StoreIcon,
  EventAvailable as Schedule,
  PlaylistAddCheck as Delivery,
  Person,
  Help as HelpIcon,
  ErrorOutline,
  EmojiObjectsOutlined,
  GroupWorkOutlined,
  TimelineOutlined,
  VerifiedUserOutlined,
  Dashboard,
  DonutLarge,
  OndemandVideoOutlined,
  ContactMail,
} from "@material-ui/icons";

const rolesWithQualityDrawerVisible = ["quality_engineer"];
const rolesWithSafetyDrawerVisible = ["safety_engineer"];
const rolesWithPlanningDrawerVisible = ["planning_manager"];
const rolesWithEditUserVisible = [
  "chief_engineer",
  "project_manager",
  "super_admin",
];

export const drawerDataUtil = role => {
  if (window.location.href.split("/")[3] === "") {
    return homepageDrawerItems;
  }
  if (global.config.secureStorage.getItem("main_admin")) {
    return [dashboard, ...mainDrawer, editUsers, addMaterial];
  }
  if (global.config.rolesWithStoreDrawerVisible.find(item => item === role)) {
    return [...storeDrawer];
  }
  if (rolesWithQualityDrawerVisible.find(item => item == role)) {
    return [...qualityItems, todo];
  }
  if (rolesWithSafetyDrawerVisible.find(item => item == role)) {
    return [...safetyItems, todo];
  }
  if (rolesWithPlanningDrawerVisible.find(item => item == role)) {
    return [...planningItems];
  }
  if (rolesWithEditUserVisible.find(item => item == role)) {
    return [...mainDrawer, editUsers, addMaterial];
  }
  return mainDrawer;
};

const todo = { name: "To Do", route: "/todo", icon: <ToDoIcon /> };
const dashboard = {
  name: "Dashboard",
  route: "/dashboard",
  icon: <Dashboard />,
};
const editUsers = { name: "Edit Users", icon: <Person />, route: "/editUser" };
const addMaterial = {
  name: "Add Material",
  route: "/addMaterial",
  icon: <AddIcon />,
};

const equipmentsItems = [
  { name: "Fuel Consumption", route: "/store", icon: <Schedule /> },
];
const planningItems = [
  // { name: "Assign Task", route: "/plan", icon: <Schedule /> },
  // { name: "Bar Chart", route: "/barchart", icon: <BarChartIcon /> },
  // { name: "Monitoring", route: "/monitoring", icon: <Monitor /> },
  { name: "Daily Progress Report", route: "/dpr", icon: <DonutLarge /> },
];
const misItems = [
  { name: "WBS report", route: "/activities", icon: <Schedule /> },
  { name: "Quality Report", route: "/activities", icon: <BarChartIcon /> },
  { name: "Safety Report ", route: "/activities", icon: <Monitor /> },
  {
    name: "Actually vs Estimated report ",
    route: "/activities",
    icon: <Delivery />,
  },
  { name: "Stock Report ", route: "/activities", icon: <DonutLarge /> },
  {
    name: "Project Summary Report",
    route: "/activities",
    icon: <Delivery />,
  },
];
const libraryItems = [
  { name: "Material Library", route: "/activities", icon: <Schedule /> },
  { name: "Labour Library", route: "/activities", icon: <BarChartIcon /> },
  {
    name: "Material + Labour library ",
    route: "/activities",
    icon: <Monitor />,
  },
  {
    name: "Actually vs Estimated report ",
    route: "/activities",
    icon: <Delivery />,
  },
  { name: "Equipment Library ", route: "/activities", icon: <DonutLarge /> },
];

const ss = [
  { name: "GRN ", route: "/store", icon: <Delivery /> },
  { name: "Issue request material ", route: "/store", icon: <Delivery /> },
  { name: "Issue material  ", route: "/store", icon: <Delivery /> },
  { name: " Daily store Report  ", route: "/store", icon: <Delivery /> },
];
const storeDrawer = [
  { name: "Material Requisition", route: "/material", icon: <Delivery /> },
  // { name: "Store", route: "/store", icon: <StoreIcon /> },
  { name: "Store", content: ss, icon: <StoreIcon /> },
];

const safetyItems = [
  { name: "Checklist", route: "/checklist/safety", icon: <Receipt /> },
  { name: "Issues", route: "/issues/safety", icon: <BugReport /> },
];

const qualityItems = [
  { name: "Checklist", route: "/checklist/quality", icon: <Receipt /> },
  { name: "Issues", route: "/issues/quality", icon: <BugReport /> },
];

const mainDrawer = [
  { name: "Activities", route: "/activities", icon: <LocalActivity /> },
  { name: "Safety", icon: <ListIcon />, content: safetyItems },
  { name: "Quality", icon: <ListIcon />, content: qualityItems },
  // { name: "Purchase", icon: <ShoppingCart />, content: storeDrawer },
  // todo,
  { name: "Planning", icon: <ListIcon />, content: planningItems },
  // { name: "Equipments", icon: <ListIcon />, content: equipmentsItems },
  // { name: "MIS", icon: <ListIcon />, content: misItems },
  // { name: "Library", icon: <ListIcon />, content: libraryItems },
  // { name: "Chat", route: "/activities", icon: <ListIcon /> },
  { name: "Projects", route: "/projectList", icon: <Work /> },
  { name: "Support", route: "/support", icon: <HelpIcon /> },
];

const homepageDrawerItems = [
  { name: "About Us", route: "about", icon: <GroupWorkOutlined /> },
  { name: "Problems Faced", route: "problems", icon: <ErrorOutline /> },
  { name: "Our Solution", route: "objective", icon: <EmojiObjectsOutlined /> },
  { name: "Timeline", route: "timeline", icon: <TimelineOutlined /> },
  {
    name: "Features and Services",
    route: "services",
    icon: <VerifiedUserOutlined />,
  },
  {
    name: "Demo",
    route: "demo",
    icon: <OndemandVideoOutlined />,
  },
  {
    name: "Contact Us",
    route: "contact",
    icon: <ContactMail />,
  },
];

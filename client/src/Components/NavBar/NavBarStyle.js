import { makeStyles } from "@material-ui/core/styles";
// import { Grow } from "@material-ui/core";
// const color = "#ed8c00";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    flexGrow: 1,
  },
  appBar: {
    zIndex: 1400,
    // backgroundColor: color,
  },
  active: {
    // backgroundColor: color,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    justifyContent: "right",
  },
  title: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    fontWeight: "800",
    // display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navGrid: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  homepageIcon: {
    display: "box",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

export default useStyles;

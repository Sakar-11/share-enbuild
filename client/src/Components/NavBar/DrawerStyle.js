import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  content: {
    // flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  linkDrawer: {
    textDecoration: "none",
    fontSize: "1.2em",
    color: "#121212",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  logout: {
    textDecoration: "none",
    fontSize: "1.2em",
    color: "#121212",
    fontWeight: "500",
    textTransform: "capitalize",
    marginTop: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nested2: {
    paddingLeft: theme.spacing(6),
  },
}));

export default useStyles;

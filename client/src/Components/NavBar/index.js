import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ArrowBack as BackButton,
} from "@material-ui/icons";
import Drawer from "./Drawer";
import useStyles from "./NavBarStyle";
import { logout } from "../../Redux/loginRedux/loginAction";
import { setupNavTitle } from "./utils";
import { Link } from "react-scroll";
import { Link as RedirectLink } from "react-router-dom";

function ButtonAppBar(props) {
  const [title, setTitle] = useState("Enbuild");
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [drawerInvisibleRoutes] = useState([
    "/projectList",
    "/subprojectList",
    "/login",
    "/register",
    "/registerAdmin",
    "/addProject",
    "/dashboard",
  ]);
  const [logoutInVisibleRoutes] = useState([
    "/login",
    "/register",
    "/registerAdmin",
  ]);
  const [isAdmin, _] = useState(
    global.config.secureStorage.getItem("is_admin")
  );
  const his = useHistory();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const toggleDrawer = event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(prevState => !prevState);
  };

  const logout = () => {
    // global.config.secureStorage.clear();
    props.logout();
    his.push("/login");
    // setLogoutState(true);
  };

  his.listen((location, action) => {
    //
    if (drawerInvisibleRoutes.find(item => item === location.pathname)) {
      setDrawerVisible(false);
    } else {
      setDrawerVisible(true);
    }
    if (logoutInVisibleRoutes.find(item => item === location.pathname)) {
      setLogout(false);
    } else {
      setLogout(true);
    }
    setupNavTitle(his.location.pathname, setTitle, setIsBack);
  });

  useEffect(() => {
    if (drawerInvisibleRoutes.find(item => item === his.location.pathname)) {
      setDrawerVisible(false);
    } else {
      setDrawerVisible(true);
    }
    if (logoutInVisibleRoutes.find(item => item === his.location.pathname)) {
      setLogout(false);
    } else {
      setLogout(true);
    }
    setupNavTitle(his.location.pathname, setTitle, setIsBack);
  }, [his.location.pathname, logoutInVisibleRoutes, drawerInvisibleRoutes]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {his.location.pathname !== "/" ? (
            <>
              {!isBack ? (
                <>
                  {isDrawerVisible && (
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleDrawer}
                    >
                      {!drawer && <MenuIcon />}
                      {drawer && <CloseIcon />}
                    </IconButton>
                  )}
                </>
              ) : (
                <>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={his.goBack}
                  >
                    <BackButton />
                  </IconButton>
                </>
              )}
            </>
          ) : (
            <div className={classes.homepageIcon}>
              {isDrawerVisible && (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
                >
                  {!drawer && <MenuIcon />}
                  {drawer && <CloseIcon />}
                </IconButton>
              )}
            </div>
          )}

          <Typography variant="h6" className={classes.title}>
            {his.location.pathname === "/" || title === "Enbuild" ? (
              <RedirectLink
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontFamily: "Averia Serif Libre",
                  fontSize: "1.25em",
                }}
                to="/"
              >
                Enbuild
              </RedirectLink>
            ) : (
              title
            )}
          </Typography>

          {his.location.pathname === "/" && (
            <Grid
              container
              justify="flex-end"
              spacing={4}
              style={{ marginRight: 10 }}
              className={classes.navGrid}
            >
              <Grid item>
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>
                    <strong>ABOUT US</strong>
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="problems"
                  spy={true}
                  smooth={true}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>
                    <strong>PROBLEMS FACED</strong>
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="objective"
                  spy={true}
                  smooth={true}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>
                    <strong>OUR SOLUTION</strong>
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="timeline"
                  spy={true}
                  smooth={true}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>
                    <strong>TIMELINE</strong>
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="services"
                  spy={true}
                  smooth={true}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>
                    <strong>FEATURES AND SERVICES</strong>
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="demo"
                  spy={true}
                  smooth={true}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>
                    <strong>DEMO</strong>
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  style={{ cursor: "pointer" }}
                >
                  <Typography>
                    <strong>CONTACT US</strong>
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          )}
          {isLogout &&
            (his.location.pathname === "/" ? props.loggedIn : true) && ( // Hide logout button only when on homepage
              <Button
                variant="outlined"
                style={{ color: "#fff", marginRight: "10px" }}
                onClick={logout}
              >
                Logout
              </Button>
            )}
        </Toolbar>
      </AppBar>
      <Toolbar />

      {isDrawerVisible && (
        <Drawer
          isOpen={drawer}
          children={props.children}
          toggleDrawer={toggleDrawer}
        ></Drawer>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(ClippedDrawer);
export default connect(mapStateToProps, { logout })(ButtonAppBar);

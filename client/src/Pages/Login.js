import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as action from "../Redux/loginRedux/loginAction";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  withStyles,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import Notifications from "react-notification-system-redux";
import { store } from "react-notifications-component";
import firebase from "../firebase";
const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      username: "",
      password: "",
      error: false,
      fromRegister: false,
    };
  }

  componentDidMount() {
    if (this.props.location.register === true) {
      this.setState({ fromRegister: true });
      store.addNotification({
        title: "Successfully Registered",
        message: "Login to your Account",
        type: "success",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          pauseOnHover: true,
        },
      });
    }

    // to be tested
    if (!global.config.secureStorage.getItem("notification_id")) {
      console.log('ss')
      const messaging = firebase.messaging();
      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
        })
        .then(token => {
          global.config.secureStorage.setItem("notification_id", token);
        })
        .catch(err => console.error(err));
    }
  }

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
    });
  };

  handleForgotPassword = e => {
    e.preventDefault();
    alert("Work in Progress...");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {global.config.secureStorage.getItem("main_admin") &&
          this.props.loggedIn === true && <Redirect to="/dashboard" />}
        {!global.config.secureStorage.getItem("main_admin") &&
          this.props.loggedIn === true && (
            <Redirect
              to={{
                pathname: "/projectList",
                state: this.state.username,
              }}
            />
          )}
        {this.props.notifications && (
          <Notifications notifications={this.props.notifications} />
        )}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                value={this.state.username}
                onChange={this.handleUsernameChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="UserName"
                name="tel"
                autoComplete="tel"
                autoFocus
              />
              <TextField
                value={this.state.password}
                onChange={this.handlePasswordChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container justify="space-between">
                <Grid item>
                  <Link href="/registerAdmin" variant="body2">
                    {"Sign Up as Organization"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Sign Up as User"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  //
  return {
    loggedIn: state.loginReducer.loggedIn,
    error: state.loginReducer.error,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user, password) => dispatch(action.login(user, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));

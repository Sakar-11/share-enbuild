import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as action from "../Redux/registerRedux/registerAction";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  withStyles,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import Notifications from "react-notification-system-redux";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
export class Register extends Component {
  constructor(props) {
    super(props);

    const requestAdmin =
      this.props.match.path === "/registerAdmin" ? true : false;
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      username: "",
      email: "",
      organization: "",
      password: "",
      repassword: "",
      match: true,
      redirect: false,
      isAdmin: false,
      mainAdmin: false,
      requestAdmin: requestAdmin,
    };
    console.log(this.state);
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.register(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.props.registered === true && (
          <Redirect to={{ pathname: "/login", register: true }} />
        )}

        {this.props.notifications && (
          <Notifications notifications={this.props.notifications} />
        )}
        <Container
          component="main"
          maxWidth="xs"
          style={{ marginBottom: "20px" }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={this.state.username}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                {this.state.requestAdmin && (
                  <Grid item xs={12}>
                    <TextField
                      value={this.state.organization}
                      onChange={this.handleChange}
                      variant="outlined"
                      required
                      fullWidth
                      id="organization"
                      label="Organization"
                      name="organization"
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    value={this.state.email}
                    onChange={this.handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={this.state.phone}
                    onChange={this.handleChange}
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    id="phone"
                    label="Mobile Number"
                    name="phone"
                    autoComplete="mobile"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    value={this.state.repassword}
                    onChange={this.handleChange}
                    required
                    fullWidth
                    name="repassword"
                    label="Confirm Password"
                    type="password"
                    id="repassword"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <div className="mt-3 text-center">
                {this.state.password !== this.state.repassword ? (
                  <span style={{ color: "red" }}>Passwords Don't Match</span>
                ) : (
                  ""
                )}
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={this.state.password !== this.state.repassword}
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  //
  return {
    registered: state.registerReducer.registered,
    error: state.registerReducer.error,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (
      email,
      username,
      phone,
      password,
      firstName,
      lastName,
      isAdmin,
      requestAdmin,
      mainAdmin
    ) =>
      dispatch(
        action.register(
          email,
          username,
          phone,
          password,
          firstName,
          lastName,
          isAdmin,
          requestAdmin,
          mainAdmin
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Register));

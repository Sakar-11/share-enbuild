import React, { useState, useEffect, useRef } from "react";
import { Route, Redirect } from "react-router-dom";
import Loading from "../Components/Loading";
import axios from "axios";
import * as action from "../Redux/loginRedux/loginAction";
import { connect } from "react-redux";
import roles from "./NewProject/userRoles";

const ProtectedRoute = props => {
  const { component: Component, ...rest } = props;
  const [credentialsValid, setCredentialsValid] = useState(false);
  const [validated, setValidated] = useState(false);
  var token = global.config.secureStorage.getItem("construction-auth-token");

  //   const isValidRole = role => {
  //     if (props.path === "/projectList") {
  //       return true;
  //     }
  //     const roleKeys = roles.map(item => item.key);
  //     if (!roleKeys.find(item => item === role)) {
  //       return false;
  //     }
  //     return true;
  //   };

  // var token = global.config.secureStorage.getItem("construction-auth-token");
  useEffect(() => {
    const verifyToken = async () => {
      //   const role = global.config.secureStorage.getItem("role");
      try {
        // if (!isValidRole(role)) {
        //   throw Error("Invalid role");
        // }

        const resp = await axios.post(
          `${global.config.backendURL}/users/verify`,
          {
            /* Backend route to be written. */
            headers: {
              "construction-auth-token": token,
              route: props.path,
              username: global.config.secureStorage.getItem("username"),
              role: global.config.secureStorage.getItem("role"),
              projectId: global.config.secureStorage.getItem("projectId"),
            },
          }
        );

        setCredentialsValid(resp.data.res);
        setValidated(true);
      } catch (err) {
        // global.config.secureStorage.clear();
        setCredentialsValid(false);
        setValidated(true);
        props.logout();
      }
    };
    verifyToken();
  }, []);

  if (credentialsValid && validated) {
    return (
      <Route {...rest} render={props => <Component {...rest} {...props} />} />
    );
  } else if (!credentialsValid && validated) {
    props.logout();

    return <Redirect to="/" />;
  } else {
    return <Loading />;
  }
};
const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(action.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

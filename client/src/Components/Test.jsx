import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { testAction } from "../Redux/_actions/testActions";
import { useHistory } from "react-router-dom";
import Notifications from "react-notification-system-redux";

const Test = props => {
  const history = useHistory();
  useEffect(() => {
    if (
      global.config.secureStorage.getItem("construction-auth-token") === null
    ) {
      history.push("login");
    }
    
  });
  return (
    <div>
      {props.notifications && (
        <Notifications notifications={props.notifications} />
      )}
      <h1>Test</h1>
    </div>
  );
};

const mapStateToProps = state => {
  // 
  return {
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps, {})(Test);

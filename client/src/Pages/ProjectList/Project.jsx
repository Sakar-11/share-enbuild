import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import Style from "./project.module.scss";
import axios from "axios";
import {
  Card,
  Typography,
  CardContent,
  // CardHeader,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { ExpandMore, ExpandLess, Edit } from "@material-ui/icons";

import * as action from "../../Redux/projectRedux/projectAction";
import Notifications from "react-notification-system-redux";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  cardClicked = async () => {
    this.props.setLoading(true);
    global.config.secureStorage.setItem("projectId", this.props.project._id);
    const username = global.config.secureStorage.getItem("username");
    global.config.secureStorage.setItem(
      "projectType",
      this.props.project.projectType
    );
    try {
      const response = await axios.get(
        `${global.config.backendURL}/users/getRoleByProjectId`,
        {
          params: {
            projectId: this.props.project._id,
            username: username,
          },
        }
      );
      this.props.setLoading(false);
      global.config.secureStorage.setItem("role", response.data);
      //
      if (
        global.config.rolesWithStoreDrawerVisible.find(
          item => item === response.data
        )
      ) {
        this.props.history.push("/store");
      } else {
        this.props.history.push("/subprojectList");
      }
    } catch (err) {
      console.log(err.message);
      this.props.setLoading(false);
    }
  };

  render() {
    return (
      <>
        {this.props.notifications && (
          <>
            <Notifications notifications={this.props.notifications} />
          </>
        )}
        <Card className={Style.card}>
          {/* <CardHeader
          onClick={this.cardClicked}
          className={Style.header}
          title={this.props.project.projectName}
          subheader={this.props.project.projectDescription}
          action={
            <IconButton aria-label="settings" onClick={this.handleExpandClick}>
              <ExpandMore />
            </IconButton>
          }
        /> */}
          <CardContent onClick={this.cardClicked}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                style={{ fontWeight: 700 }}
                noWrap
              >
                {this.props.project.projectName}
              </Typography>
              <IconButton
                aria-label="settings"
                style={{
                  backgroundColor: "#2E86AB",
                  color: "#fff",
                  padding: 4,
                  marginRight: 4,
                }}
              >
                <Edit />
              </IconButton>
            </div>
            <Typography variant="body1">
              {this.props.project.projectDescription}
            </Typography>
            <div className={Style.project__flat}>
              <Typography
                variant="body2"
                display="inline"
                style={{ fontWeight: 700 }}
              >
                Number of subprojects:
              </Typography>
              <Typography variant="body2" noWrap display="inline">
                {" "}
                {this.props.project.numberOfProjects}
              </Typography>
              <br></br>
              {/* <br></br> */}
              <Typography
                variant="body2"
                display="inline"
                style={{ fontWeight: 700 }}
              >
                Number of users:
              </Typography>
              <Typography variant="body2" noWrap display="inline">
                {" "}
                {this.props.project.userNumber}
              </Typography>
            </div>
          </CardContent>
          {this.props.admin && (
            <>
              <div className={Style.expand}>
                <IconButton
                  aria-label="settings"
                  onClick={this.handleExpandClick}
                >
                  {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </div>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent className={Style.inner}>
                  <center>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        this.props.deleteProject(this.props.project._id);
                      }}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </center>
                </CardContent>
              </Collapse>
            </>
          )}
        </Card>
      </>
    );
  }
}
const mapStateToProps = state => {
  //
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: projectId => dispatch(action.deleteProject(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

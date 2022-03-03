import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProjects } from "../../Redux/projectRedux/projectAction";
import Project from "./Project";
import Notifications from "react-notification-system-redux";
import Loading from "../../Components/Loading";
import { Button } from "@material-ui/core";
class ProjectList extends Component {
  constructor(props) {
    super(props);
    const admin = global.config.secureStorage.getItem("is_admin");
    this.state = {
      loading: false,
      isAdmin: admin,
    };
  }

  toggleLoading = value => {
    this.setState({
      loading: value,
    });
  };

  async componentDidMount() {
    await this.props.getUserProjects(
      global.config.secureStorage.getItem("username")
    );
  }

  goToAddProject = () => {
    //
    this.props.history.push("/addProject");
  };

  render() {
    if (this.props.userProjectLoading || this.state.loading) {
      return <Loading loading={true} />;
    }
    if (this.props.userProjectSuccess && this.props.userProjects.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100vw",
            height: "80vh",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            No projects are assigned to you right now!!
          </h2>
          {this.state.isAdmin && (
            <Button
              variant="outlined"
              style={{ marginTop: "10px" }}
              onClick={this.goToAddProject}
            >
              Add New Project
            </Button>
          )}
        </div>
      );
    }
    if (this.props.userProjectIsError) {
      return <h1>Error</h1>;
    }
    return (
      <div>
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          {this.props.userProjects.map((item, index) => (
            <Project
              project={item}
              key={index}
              history={this.props.history}
              setLoading={this.toggleLoading}
              admin={this.state.isAdmin}
            />
          ))}
        </div>
        <div
          style={{
            marginLeft: "20px",
          }}
        >
          {this.state.isAdmin && (
            <Button onClick={this.goToAddProject}>Add Another Project</Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.loginReducer.user,
    userProjects: state.projectReducer.userProjects,
    userProjectLoading: state.projectReducer.userProjectLoading,
    userProjectIsError: state.projectReducer.userProjectIsError,
    userProjectSuccess: state.projectReducer.userProjectSuccess,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProjects: ids => dispatch(getUserProjects(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);

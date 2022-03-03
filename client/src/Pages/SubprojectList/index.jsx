import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubprojects } from "../../Redux/subProjectRedux/subProjectAction";
import Subproject from "./Subproject";
import Loading from "../../Components/Loading";

class ProjectList extends Component {
  async componentDidMount() {
    await this.props.getSubprojects(
      global.config.secureStorage.getItem("projectId")
    );
  }

  render() {
    if (this.props.loading) {
      return <Loading loading={true} />;
    }
    if (this.props.isError) {
      return <h1>Something went wrong</h1>;
    }
    if (this.props.success && this.props.subProjects.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "80vh",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            No subprojects available right now!!
          </h2>
        </div>
      );
    }
    return (
      <div>
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          {/* {this.props.subProjects} */}
          {this.props.subProjects.map((item, index) => (
            <Subproject
              project={item}
              key={index}
              history={this.props.history}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //
  return {
    subProjects: state.subProjectReducer.subProjects,
    loading: state.subProjectReducer.loading,
    success: state.subProjectReducer.success,
    isError: state.subProjectReducer.isError,
    error: state.subProjectReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSubprojects: id => dispatch(getSubprojects(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);

import React, { Component } from "react";
import { connect } from "react-redux";
import OurTable from "../../Components/tableCard";
import Loading from "../../Components/Loading";
import AddIssue from "./AddIssue";
import TableIssues from "./TableIssues";
import {
  Button,
  Grid,
  Modal,
  GridList,
  GridListTile,
  Backdrop,
  Fade,
} from "@material-ui/core";
import * as action from "../../Redux/IssuesRedux/issuesAction";
import {
  PhotoCamera,
  Check,
  PanTool,
  Add,
  CloudDownload,
} from "@material-ui/icons";
// import { blue } from "@material-ui/core/colors";
import Notifications from "react-notification-system-redux";
import axios from "axios";
import { Tab } from "@material-ui/core";

class Issues extends Component {
  constructor(props) {
    super(props);
    const role2 = global.config.secureStorage.getItem("role");
    const editRoles = [
      "safety_engineer",
      "quality_engineer",
      "super_admin",
      "project_manager",
      "senior_engineer",
    ];
    const isAddVisible = editRoles.find(item => item == role2) ? true : false;

    const approvableRoles = [
      "senior_engineer",
      "project_manager",
      "super_admin",
    ];
    const isApprovable = approvableRoles.find(item => item == role2)
      ? true
      : false;
    this.state = {
      open: false,
      constPics: [],
      section: "",
      desc: "",
      createIssue: false,
      location: "",
      viewImages: [],
      priority: "",
      data: [],
      initialData: [],
      loading: false,
      isAddVisible: isAddVisible,
      isApprovable: isApprovable,
      isOpenTable: false,
      role: global.config.secureStorage.getItem("role"),
    };
  }

  saveIssueSectionToState = event => {
    this.setState({ section: event.target.value });
  };
  saveIssueDescriptionToState = event => {
    this.setState({ desc: event.target.value });
  };

  savelocationToState = event => {
    this.setState({ location: event.target.value });
  };

  savepriorityToState = event => {
    const val = event.target.value > 0 ? event.target.value : 0;
    this.setState({ priority: val });
  };
  toggleCreateNewIssue = () => {
    this.setState({ createIssue: !this.state.createIssue });
  };

  toggleOpenTable = () => {
    this.setState({ isOpenTable: !this.state.isOpenTable });
  };

  toggleCloseTable = () => {
    this.setState({ isOpenTable: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    let now = new Date();
    const date =
      now.getDate() +
      "/" +
      (parseInt(now.getMonth()) + 1).toString() +
      "/" +
      now.getFullYear();
    var images = [];
    this.state.constPics.forEach(ele => {
      images.push(ele.base64);
    });
    const payload = {
      id: Date.now(),
      date: date,
      location: this.state.location,
      priority: this.state.priority,
      section: this.state.section,
      desc: this.state.desc,
      images: images,
      subProjectId: global.config.secureStorage.getItem("subprojectId"),
      type: this.props.match.params.type,
    };
    this.props.saveIssue(payload);
    this.toggleCreateNewIssue();
  };

  savePicsToState = files => {
    this.setState({ constPics: files });
    //
  };

  componentDidMount() {
    const subProjectId = global.config.secureStorage.getItem("subprojectId");
    //
    const type = this.props.match.params.type;
    //
    this.props.getIssues(subProjectId, type);
  }

  setImages = list => {
    this.setState({
      viewImages: list,
    });
  };
  handleDropdownChange = e => {
    console.log(e.target.value);
    if (e.target.value != null) {
      this.setState({
        priority: e.target.value,
      });
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.type !== this.props.match.params.type) {
      const subProjectId = global.config.secureStorage.getItem("subprojectId");

      this.props.getIssues(subProjectId, newProps.match.params.type);
    }
  }
  top = 50;
  left = 50;
  width = window.innerWidth > 1000 ? "60%" : "100%";
  num = window.innerWidth > 1000 ? 1 : 2;
  render() {
    const { isOpenTable, isAddVisible } = this.state;

    if (isOpenTable) {
      return (
        <TableIssues
          isApprovable={this.state.isApprovable}
          title="Issues"
          subtitle="Track Your Issues Here"
          data={this.props.issuesData}
          toggleCloseTable={this.toggleCloseTable}
        />
      );
    }
    return (
      <Grid container direction="row" style={{ flex: "1" }}>
        <Grid className="container-sm" item xs={12}>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.open}>
              <div
                className="container mt-2"
                style={{
                  position: "absolute",
                  top: `${this.top}%`,
                  left: `${this.left}%`,
                  transform: `translate(-${this.top}%, -${this.left}%)`,
                  margin: "30px auto",
                  backgroundColor: "white",
                  maxWidth: `${this.width}`,
                  padding: "20px 20px",
                  boxShadow:
                    "0px 20px 30px rgba(0, 0, 0, 0.1), 0px 8px 8px rgba(0, 0, 0, 0.15),0px 4px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    overflow: "hidden",
                    backgroundColor: "white",
                  }}
                >
                  <GridList
                    style={{
                      width: "100%",
                      height: 450,
                    }}
                    className="justify-content-center align-items-center"
                  >
                    {this.state.viewImages.length === 0 ||
                    this.state.viewImages === [] ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <h5>No Photos Uploaded</h5>
                      </div>
                    ) : (
                      this.state.viewImages.map((ele, key, index) => {
                        return (
                          <GridListTile
                            key={key}
                            cols={this.num}
                            style={{ padding: 10, margin: "10px" }}
                          >
                            <img
                              src={ele}
                              alt={"Contruction" + key.toString()}
                              height="250px"
                              width="200px"
                            />
                          </GridListTile>
                        );
                      })
                    )}
                  </GridList>
                </div>
                <br />
                <Grid
                  style={{ flex: "1" }}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  // className="justify-content-center align-items-center"
                >
                  <Grid item>
                    <Button color="primary" onClick={this.handleClose}>
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </Modal>
        </Grid>
        {this.props.notifications && (
          <Notifications notifications={this.props.notifications} />
        )}
        {this.state.isAddVisible && (
          <>
            {this.state.createIssue ? (
              <AddIssue
                classes={this.classes}
                desc={this.state.desc}
                section={this.state.section}
                priority={this.state.priority}
                location={this.state.location}
                constPics={this.state.constPics}
                saveIssueSectionToState={this.saveIssueSectionToState}
                saveIssueDescriptionToState={this.saveIssueDescriptionToState}
                handleSubmit={this.handleSubmit}
                savepriorityToState={this.savepriorityToState}
                toggleCreateNewIssue={this.toggleCreateNewIssue}
                savelocationToState={this.savelocationToState}
                savePicsToState={files => this.savePicsToState(files)}
                handleDropdownChange={this.handleDropdownChange}
              />
            ) : (
              <Grid
                container
                direction="row"
                style={{ margin: "10px" }}
                justify="flex-end"
              >
                <Grid item>
                  <Button
                    style={{ margin: 10 }}
                    onClick={this.toggleCreateNewIssue}
                    size="large"
                    startIcon={<Add />}
                  >
                    Add Issue
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    style={{ margin: 10, backgroundColor: "#4a934a" }}
                    onClick={this.toggleOpenTable}
                    size="large"
                    startIcon={<CloudDownload />}
                  >
                    Generate PDF
                  </Button>
                </Grid>
              </Grid>
            )}
          </>
        )}
        <Loading loading={this.props.loading} />
        {!this.props.loading && !this.state.createIssue && (
          <Grid container direction="row" style={{ marginTop: "1em" }}>
            <Grid item xs={12}>
              <OurTable
                isApprovable={this.state.isApprovable}
                title="Issues"
                subtitle="Track Your Issues Here"
                data={this.props.issuesData}
                setImages={this.setImages}
                handleOpen={this.handleOpen}
                removeIssue={this.props.removeIssue}
                askApproval={this.props.askApproval}
                type={this.props.match.params.type}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  //
  return {
    loggedIn: state.loginReducer.loggedIn,
    issuesData: state.issuesReducer.data,
    loading: state.issuesReducer.loading,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveIssue: payload => dispatch(action.createIssue(payload)),
    getIssues: (subProjectId, type) =>
      dispatch(action.getIssues(subProjectId, type)),
    removeIssue: (id, subprojectId, type) =>
      dispatch(action.removeIssue(id, subprojectId, type)),
    askApproval: (id, subProjectId, type) =>
      dispatch(action.askApproval(id, subProjectId, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Issues);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button, Typography } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import ActivityList from "./ActivityList";
import AddDefault from "./AddDefault";
import { logout } from "../../Redux/loginRedux/loginAction";
import {
  getDefaultChecklist,
  updateDefaultChecklist,
} from "../../Redux/checkListRedux/checklistAction";
import Loading from "../../Components/Loading";
import { verifyValidity } from "./checklistUtil";
import { previewImage } from "antd/lib/upload/utils";

import Papa from "papaparse";

class Checklist extends Component {
  constructor(props) {
    super(props);
    const role = global.config.secureStorage.getItem("role");
    const roles = [
      "junior_engineer",
      "senior_engineer",
      "project_manager",
      "quality_engineer",
      "safety_engineer",
      "super_admin",
    ];
    const isAddVisible = roles.find(item => item == role);
    this.state = {
      modalOpen: false,
      checklistTitle: "",
      content: [],
      loading: true,
      defaultChecklist: [],
      noOfChecklist: 1,
      defaultChecklistID: "null",
      alertChecklistTitle: false,
      alertChecklistTitleField: "",
      type: this.props.match.params.type,
      isAddVisible: isAddVisible,
    };
  }

  componentDidMount() {
    try {
      const type = this.props.match.params.type;
      const role = global.config.secureStorage.getItem("role");
      //
      if (!verifyValidity(role, type)) {
        // global.config.secureStorage.clear();
        this.props.logout();
        this.props.history.replace("/login");
      }
      this.props.getDefaultChecklist(this.props.match.params.type);
    } catch (error) {}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.type !== this.props.match.params.type) {
      this.props.getDefaultChecklist(newProps.match.params.type);
      this.setState({
        loading: true,
      });
      this.forceUpdate();
    }
  }

  handleChecklistDeleteCount = index => {
    if (this.state.noOfChecklist === 1) return;
    let newChecklist = [...this.state.content];
    newChecklist.splice(index, 1);
    this.setState({
      content: newChecklist,
      noOfChecklist: this.state.noOfChecklist - 1,
    });
  };

  handleChecklistAddCount = () => {
    this.setState({
      noOfChecklist: this.state.noOfChecklist + 1,
    });
  };

  handleModalOpen = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
    this.setState({
      noOfChecklist: 1,
      content: [],
      checklistTitle: "",
    });
  };
  handleAutoComplete = (event, value) => {
    if (this.state.alertChecklistTitle) {
      this.setState({
        alertChecklistTitle: !this.state.alertChecklistTitle,
        alertChecklistTitleField: "",
      });
    }
    if (value === null) {
      this.setState({
        content: [],
        noOfChecklist: 1,
      });
    }
    if (typeof value === "object" && value !== null) {
      let newChecklist = this.props.defaultChecklist.data.filter(
        obj => obj.title === value.title
      );
      this.setState({
        content: newChecklist[0].content,
        noOfChecklist: newChecklist[0].content.length,
      });
    }
    this.setState({
      checklistTitle: value,
    });
  };

  handleContent = (event, index) => {
    let newContent = [...this.state.content];
    newContent[index] = {
      description: event.target.value,
      // type: "",
    };
    this.setState({
      content: newContent,
    });
  };
  submitActivity = () => {
    const { checklistTitle, content } = this.state;
    if (checklistTitle === "") {
      this.setState({
        alertChecklistTitle: !this.state.alertChecklistTitle,
        alertChecklistTitleField: "Please provide a checklist title",
      });
      return;
    }
    if (content.length === 0) {
      alert("Please Fill sub-checklist name");
      return;
    }
    let newChecklist = [...this.props.defaultChecklist.data];
    if (typeof checklistTitle === "string") {
      let flag = false;
      let newContent = [];
      for (let i = 0; i < this.state.defaultChecklist.length; i++)
        if (this.state.defaultChecklist[i].title === checklistTitle) {
          newContent = [...this.state.defaultChecklist[i].content, ...content];
          newChecklist[i].content = content;
          flag = true;
          break;
        }
      if (!flag) {
        newContent = content;
        newChecklist.push({
          title: checklistTitle,
          content: newContent,
        });
      }
    } else {
      for (let i = 0; i < this.state.defaultChecklist.length; i++)
        if (this.state.defaultChecklist[i].title === checklistTitle.title) {
          checklistTitle.content = [...content];
          newChecklist[i] = checklistTitle;
          break;
        }
    }
    console.log(newChecklist);
    this.props.updateDefaultChecklist(
      this.props.defaultChecklist._id,
      newChecklist,
      this.props.match.params.type
    );
    this.setState({
      defaultChecklist: newChecklist,
    });
    this.setState({
      checklistTitle: "",
      content: [],
      noOfChecklist: 1,
    });

    this.handleModalOpen();
  };

  componentDidUpdate() {
    if (!this.props.loading && this.state.loading) {
      this.setState({
        loading: false,
        defaultChecklist: this.props.defaultChecklist.data,
        defaultChecklistID: this.props.defaultChecklist._id,
      });
    }
  }

  importExcel(e, defaultChecklist, update, type) {
    let newChecklist = defaultChecklist.data;
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          let data;
          data = results.data;
          // data.forEach(element => {
          //   console.log("Finished:", element);
          // });
          for (const elem in data) {
            if (elem != 0) {
              if (data[elem] != "") {
                let title = data[elem][0];
                let content = [];
                // console.log("Finished:", data[elem]);

                for (const dis in data[elem]) {
                  if (dis != 0) {
                    // console.log("dis:", data[elem][dis]);
                    if (data[elem][dis] != "") {
                      content.push({ description: data[elem][dis] });
                    }
                  }
                }
                newChecklist.push({ title: title, content: content });
                update(defaultChecklist._id, newChecklist, type);
              }
            }
            // console.log("uploadArr:", newChecklist);
          }
        },
      });
    }
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Loading loading={true} />
        ) : (
          <div>
            <div>
              <AddDefault
                handleChecklistAddCount={this.handleChecklistAddCount}
                handleChecklistDeleteCount={this.handleChecklistDeleteCount}
                noOfChecklist={this.state.noOfChecklist}
                data={this.props.defaultChecklist.data}
                checklistTitle={this.state.checklistTitle}
                content={this.state.content}
                handleAutoComplete={this.handleAutoComplete}
                open={this.state.modalOpen}
                handleModalOpen={this.handleModalOpen}
                submitActivity={this.submitActivity}
                handleContent={this.handleContent}
                alertChecklistTitle={this.state.alertChecklistTitle}
                alertChecklistTitleField={this.state.alertChecklistTitleField}
              />
            </div>
            {this.state.isAddVisible && (
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    className="m-2"
                    color="primary"
                    // onClick={this.handleModalOpen}
                  >
                    <Typography>Import: </Typography>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={e =>
                        this.importExcel(
                          e,
                          this.props.defaultChecklist,
                          this.props.updateDefaultChecklist,
                          this.props.match.params.type
                        )
                      }
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="mt-4 mr-3"
                    color="primary"
                    onClick={this.handleModalOpen}
                    startIcon={<AddIcon />}
                  >
                    Add Checklist
                  </Button>
                </Grid>
              </Grid>
            )}
            {/* <Typography
              className="d-flex justify-content-center my-3"
              variant="h4"
            >
              Checklist
            </Typography> */}
            <div className="container" style={{ marginTop: "30px" }}>
              <ActivityList
                iterList={this.props.defaultChecklist.data}
                path={this.props.match.params.type}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  //
  return {
    defaultChecklist: state.checkListReducer.defaultChecklist,
    loading: state.checkListReducer.loading,
  };
};

export default connect(mapStateToProps, {
  getDefaultChecklist,
  updateDefaultChecklist,
  logout,
})(Checklist);

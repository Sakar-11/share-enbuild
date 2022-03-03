import React, { Component } from "react";
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import AddActivity from "./AddActivity";
import NonEditMainList from "./NonEditMainList";
import EditMainList from "./EditMainList";
import {
  ChangeHistory as Change,
  Add as AddIcon,
  CloudDownload,
  Edit,
} from "@material-ui/icons";
import {
  getDefaultActivities,
  updateDefaultActivities,
  updateActivityName,
} from "../../Redux/activityRedux/activityAction";
import IconButton from "@material-ui/core/IconButton";
import Loading from "../../Components/Loading";
import AddRoadActivity from "./AddRoadActivity";
import TableActivities from "./TableActivities";
import axios from "axios";
const iterList = require("./defaultActivities/defaultArray");
class Activities extends Component {
  constructor(props) {
    // console.log(iterList);
    super(props);
    const role = global.config.secureStorage.getItem("role");
    const roles = ["project_manager", "chief_engineer", "super_admin"];
    const isAddVisible = roles.find(item => item == role) ? true : false;
    this.state = {
      modalOpen: false,
      roadModalOpen: false,
      activityName: "",
      subActivityName: "",
      roadActivityName: "",
      isEditRoadActivity: false,
      subProject: {},
      changeAct: false,
      loading: true,
      isFetched: false,
      defaultActivity: [],
      activeActivityIndex: 0,
      expanded: "panel1",
      percentage: [],
      alertSubActivity: false,
      alertSubActivityField: "",
      isAddVisible: isAddVisible,
      tableData: [],
      isOpenTable: false,
      projectType: "",
    };
  }

  handleChange = (panel, index) => (event, newExpanded) => {
    this.setState({ activeActivityIndex: index });
    this.setState({
      expanded: newExpanded ? panel : false,
    });
  };
  async componentDidMount() {
    try {
      await this.props.getDefaultActivities();
      this.setState({
        projectType: global.config.secureStorage.getItem("projectType"),
        defaultActivity: this.props.defaultActivity.data,
        // defaultActivity: this.props.defaultActivity.data[0].data,
        // percentage: this.props.percentage,
        loading: !this.state.loading,
      });
      this.fetchData();
    } catch (error) {
      //
    }
  }

  submitActivityList = () => {
    this.props.updateDefaultActivities(
      this.props.defaultActivity._id,
      this.state.defaultActivity
    );
    this.changeAct();
  };

  fetchData = () => {
    const projectId = global.config.secureStorage.getItem("projectId");
    console.log(projectId);
    const id = global.config.secureStorage.getItem("subprojectId");
    let tempactivities = [];
    let tempfloorwisedata = [];
    axios
      .get(
        `${global.config.backendURL}/activities/getDefaultActivities/${projectId}`
      )
      .then(async res => {
        tempactivities = res.data.data;
        // axios
        //   .get(
        //     `${global.config.backendURL}/activities/getFloorsPercentage/${projectId}/${id}`
        //   )
        //   .then(async res => {
        let tempA = [];
        let tempF = [];
        let temparr = [];
        // tempfloorwisedata = res.data;
        let flatData;
        try {
          flatData = await axios.post(
            `${global.config.backendURL}/activities/getAllActivity`,
            { subprojectId: id }
          );
        } catch (er) {
          console.log(er);
        }
        tempactivities.map(activity => {
          activity.content.map(sub => {
            let flats = {};
            if (sub.link in flatData.data) {
              for (let [key, value] of Object.entries(
                flatData.data[sub.link]
              )) {
                flats[key] = value.map(
                  (ele, id) => ele === "complete" && id + 1
                );
              }
            } else if (activity.activity in flatData.data) {
              for (let [key, value] of Object.entries(
                flatData.data[activity.activity]
              )) {
                flats[key] = value.map(
                  (ele, id) => ele === "complete" && id + 1
                );
              }
            }
            if (sub.subTitle != "Update Here") {
              tempA.push({
                activity: activity.title,
                subactivity: sub.subTitle,
                flats,
              });
            } else {
              tempA.push({
                activity: activity.title,
                subactivity: activity.title,
                flats,
              });
            }
          });
        });
        // tempA.map((ele, index) => {
        //   temparr = [];
        //   tempfloorwisedata.map((floor, i) => {
        //     if (floor[index].percentage !== 0) {
        //       temparr.push({
        //         status: floor[index].percentage,
        //         flats: ele.flats[i],
        //       });
        //     } else {
        //       temparr.push({
        //         status: floor[index].percentage,
        //         flats: [],
        //       });
        //     }
        //   });
        //   tempF.push({
        //     activity: ele.activity,
        //     subactivity: ele.subactivity,
        //     floors: temparr,
        //   });
        // });
        tempA = [];
        tempactivities.map(ele => {
          temparr = [];
          tempF.map(item => {
            if (ele.title == item.activity) {
              temparr.push({
                title: item.subactivity,
                floors: item.floors,
              });
            }
          });
          tempA.push({ activity: ele.title, subactivities: temparr });
        });
        this.setState({ tableData: tempA });
      })
      //     .catch(e => console.log(e));
      // })
      .catch(e => console.log(e));
  };

  handleModalOpen = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  handleModalRoadOpen = () => {
    this.setState({
      roadModalOpen: !this.state.roadModalOpen,
    });
  };

  handleAutoComplete = (event, value) => {
    this.setState({
      activityName: value,
    });
  };

  handleActivityChange = event => {
    if (this.state.alertSubActivity) {
      this.setState({
        alertSubActivity: !this.state.alertSubActivity,
        alertSubActivityField: "",
      });
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  makeValidLink = activity => {
    const regex = /[.,\\/#!$%\\^&\\*;:{}=\-_`~()]/g;
    return activity.toLowerCase().replace(regex, " ").split(" ").join("");
  };

  submitActivity = () => {
    const { activityName, subActivityName } = this.state;
    if (activityName == "") {
      this.setState({
        activityName: "",
        subActivityName: "",
      });
      // //
      this.handleModalOpen();
      return;
    }

    let diffActivities = [];

    diffActivities = this.state.defaultActivity;
    diffActivities = diffActivities[this.state.activeActivityIndex].data;

    let newActivity = [...this.state.defaultActivity];
    newActivity = newActivity[this.state.activeActivityIndex].data;
    let link = this.makeValidLink(subActivityName);
    if (typeof activityName === "string") {
      let flag = false;
      let newSubActivity = [];
      for (let i = 0; i < diffActivities.length; i++)
        if (diffActivities[i].title === activityName) {
          if (subActivityName === "") {
            this.setState({
              alertSubActivity: !this.state.alertSubActivity,
              alertSubActivityField: "Please Fill sub activity name",
            });
            return;
          }
          newSubActivity = diffActivities[i].content;
          newSubActivity.push({
            visibility: true,
            subTitle: subActivityName,
            link,
          });
          newActivity[i].content = newSubActivity;
          flag = true;
          break;
        }
      if (!flag) {
        let mainLink = this.makeValidLink(activityName);
        newSubActivity.push({
          visibility: true,
          subTitle: subActivityName !== "" ? subActivityName : "Update Here",
          link: subActivityName !== "" ? link : "null",
        });
        newActivity.push({
          visibility: true,
          title: activityName,
          content: newSubActivity,
          activity: mainLink,
        });
      }
    } else {
      let newSubActivity = [];
      if (subActivityName === "") {
        this.setState({
          alertSubActivity: !this.state.alertSubActivity,
          alertSubActivityField: "Please Fill sub activity name",
        });
        return;
      }
      for (let i = 0; i < diffActivities.length; i++)
        if (diffActivities[i].title === activityName.title) {
          if (
            activityName.content.length === 1 &&
            activityName.content[0].link === "null"
          ) {
            newSubActivity.push({
              visibility: true,
              subTitle: subActivityName,
              link,
            });
          } else {
            newSubActivity = diffActivities[i].content;
            newSubActivity.push({
              visibility: true,
              subTitle: subActivityName,
              link,
            });
          }
          activityName.content = newSubActivity;
          newActivity[i] = activityName;
          break;
        }
    }
    let saveActivity = [...this.state.defaultActivity];
    // console.log(newActivity);
    // saveActivity[0].data = newActivity;
    newActivity = saveActivity;
    this.props.updateDefaultActivities(
      this.props.defaultActivity._id,
      newActivity
    );
    this.setState({
      defaultActivity: newActivity,
    });

    this.setState({
      activityName: "",
      subActivityName: "",
    });
    // //
    this.handleModalOpen();
  };

  handleRoadEdit = name => {
    this.setState({
      roadActivityName: name,
      isEditRoadActivity: true,
    });

    this.handleModalRoadOpen();
  };
  EditRoadActivity = () => {
    let newRoad = this.state.defaultActivity;
    newRoad[this.state.activeActivityIndex] = {
      name: this.state.roadActivityName,
      data: iterList,
    };
    let newActivity = newRoad;

    this.props.updateDefaultActivities(
      this.props.defaultActivity._id,
      newActivity
    );
    this.setState({
      roadActivityName: "",
      isEditRoadActivity: false,
    });
    this.handleModalRoadOpen();
  };
  submitRoadActivity = () => {
    let newRoad = this.state.defaultActivity;
    newRoad[newRoad.length] = {
      name: this.state.roadActivityName,
      data: iterList,
    };
    let newActivity = newRoad;
    // console.log(newRoad);
    this.props.updateDefaultActivities(
      this.props.defaultActivity._id,
      newActivity
    );
    this.setState({
      roadActivityName: "",
    });
    this.handleModalRoadOpen();
  };

  changeAct = () => {
    this.setState({ changeAct: !this.state.changeAct });
  };

  updateSubActivityNameUI = (activityIndex, subActivityIndex, value) => {
    var tempArray = [
      ...this.state.defaultActivity[this.state.activeActivityIndex].data,
    ];
    if (subActivityIndex == -1) {
      tempArray[activityIndex]["title"] = value;
    } else {
      tempArray[activityIndex]["content"][subActivityIndex].subTitle = value;
    }
    let newAcc = [...this.state.defaultActivity];
    newAcc[this.state.activeActivityIndex].data = tempArray;
    this.setState({
      defaultActivity: newAcc,
    });
    // this.changeAct();
  };

  updateMainList = (event, index) => {
    let tempArray = [
      ...this.state.defaultActivity[this.state.activeActivityIndex].data,
    ];
    let prev = tempArray[index].visibility;
    tempArray[index].visibility = !prev;
    let newAcc = [...this.state.defaultActivity];
    newAcc[this.state.activeActivityIndex].data = tempArray;
    this.setState({
      defaultActivity: newAcc,
    });
  };

  updateSubList = (event, index, subIndex) => {
    var tempArray = [
      ...this.state.defaultActivity[this.state.activeActivityIndex].data,
    ];
    let prev = tempArray[index].content[subIndex].visibility;
    tempArray[index].content[subIndex].visibility = !prev;
    let newAcc = [...this.state.defaultActivity];
    newAcc[this.state.activeActivityIndex].data = tempArray;
    this.setState({
      defaultActivity: newAcc,
    });
  };

  toggleCloseTable = () => {
    this.setState({ isOpenTable: !this.state.isOpenTable });
  };

  render() {
    if (this.props.loading) {
      return <Loading loading={this.props.loading} />;
    }
    const { isOpenTable } = this.state;

    if (isOpenTable) {
      return (
        <TableActivities
          tableData={this.state.tableData}
          toggleCloseTable={this.toggleCloseTable}
        />
      );
    }
    if (this.state.projectType === "Infrastructure")
      return (
        <div>
          <Grid
            container
            direction="row"
            style={{ marginTop: "2em" }}
            justify="center"
          >
            <Grid item>
              <Button
                className="m-2"
                color="primary"
                onClick={this.handleModalRoadOpen}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          <div className="container" style={{ marginTop: "20px" }}>
            {this.state.defaultActivity != undefined &&
            this.state.defaultActivity.length !== 0
              ? this.state.defaultActivity.map((roadactivity, index) => {
                  let rData =
                    this.state.defaultActivity[this.state.activeActivityIndex]
                      .data;
                  // console.log(this.state.activeActivityIndex);
                  return (
                    <Accordion
                      expanded={this.state.expanded === `panel${index + 1}`}
                      onChange={this.handleChange(`panel${index + 1}`, index)}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        <Grid
                          container
                          spacing={0}
                          alignItems="center"
                          justify="space-between"
                        >
                          <Typography variant="h6">
                            {roadactivity.name}
                          </Typography>
                          <IconButton
                            aria-label="settings"
                            onClick={() => {
                              this.handleRoadEdit(roadactivity.name);
                            }}
                            style={{
                              backgroundColor: "#2E86AB",
                              color: "#fff",
                              padding: 4,
                              marginRight: 4,
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails style={{ display: "inline" }}>
                        <div>
                          <div>
                            <AddRoadActivity
                              open={this.state.roadModalOpen}
                              submitRoadActivity={this.submitRoadActivity}
                              handleActivityChange={this.handleActivityChange}
                              roadActivityName={this.state.roadActivityName}
                              handleModalRoadOpen={this.handleModalRoadOpen}
                              EditRoadActivity={this.EditRoadActivity}
                              isEditRoadActivity={this.state.isEditRoadActivity}
                            />
                            <AddActivity
                              alertSubActivity={this.state.alertSubActivity}
                              alertSubActivityField={
                                this.state.alertSubActivityField
                              }
                              data={rData}
                              activityName={this.state.activityName}
                              handleAutoComplete={this.handleAutoComplete}
                              open={this.state.modalOpen}
                              handleModalOpen={this.handleModalOpen}
                              submitActivity={this.submitActivity}
                              handleActivityChange={this.handleActivityChange}
                            />
                          </div>
                          {this.state.isAddVisible && (
                            <Grid
                              container
                              direction="row"
                              style={{ marginTop: "2em" }}
                              justify="center"
                            >
                              <Grid item>
                                <Button
                                  className="m-2"
                                  color="primary"
                                  onClick={this.handleModalOpen}
                                  startIcon={<AddIcon />}
                                >
                                  Add Activity
                                </Button>
                              </Grid>

                              {!this.state.changeAct && (
                                <Grid item>
                                  <Button
                                    className="m-2"
                                    onClick={this.changeAct}
                                    startIcon={<Change />}
                                  >
                                    Modify Activities
                                  </Button>
                                </Grid>
                              )}
                              <Grid item>
                                {/* <Button
                                  className="m-2"
                                  style={{ backgroundColor: "#4a934a" }}
                                  onClick={this.toggleCloseTable}
                                  startIcon={<CloudDownload />}
                                >
                                  Generate PDF
                                </Button> */}
                              </Grid>
                            </Grid>
                          )}
                          <div className="container mt-2">
                            {this.state.loading ? (
                              <Loading loading={this.state.loading} />
                            ) : !this.state.changeAct ? (
                              <NonEditMainList
                                activeActivityIndex={
                                  this.state.activeActivityIndex
                                }
                                defaultActivity={roadactivity.data}
                                percentage={this.state.percentage}
                              />
                            ) : (
                              <EditMainList
                                updateActivityName={
                                  this.props.updateActivityName
                                }
                                defaultActivity={roadactivity.data}
                                changeAct={this.changeAct}
                                updateMainList={this.updateMainList}
                                updateSubList={this.updateSubList}
                                submitActivityList={this.submitActivityList}
                                updateSubActivityNameUI={
                                  this.updateSubActivityNameUI
                                }
                              />
                            )}
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              : ""}
          </div>
        </div>
      );
    return (
      <div className="container" style={{ marginTop: "20px" }}>
        {this.state.defaultActivity != undefined &&
        this.state.defaultActivity.length !== 0
          ? this.state.defaultActivity.map((roadactivity, index) => {
              let rData =
                this.state.defaultActivity[this.state.activeActivityIndex].data;
              // console.log(this.state.activeActivityIndex);
              return (
                <div>
                  <div>
                    <AddRoadActivity
                      open={this.state.roadModalOpen}
                      submitRoadActivity={this.submitRoadActivity}
                      handleActivityChange={this.handleActivityChange}
                      handleModalRoadOpen={this.handleModalRoadOpen}
                    />
                    <AddActivity
                      alertSubActivity={this.state.alertSubActivity}
                      alertSubActivityField={this.state.alertSubActivityField}
                      data={rData}
                      activityName={this.state.activityName}
                      handleAutoComplete={this.handleAutoComplete}
                      open={this.state.modalOpen}
                      handleModalOpen={this.handleModalOpen}
                      submitActivity={this.submitActivity}
                      handleActivityChange={this.handleActivityChange}
                    />
                  </div>
                  {this.state.isAddVisible && (
                    <Grid
                      container
                      direction="row"
                      style={{ marginTop: "2em" }}
                      justify="center"
                    >
                      <Grid item>
                        <Button
                          className="m-2"
                          color="primary"
                          onClick={this.handleModalOpen}
                          startIcon={<AddIcon />}
                        >
                          Add Activity
                        </Button>
                      </Grid>

                      {!this.state.changeAct && (
                        <Grid item>
                          <Button
                            className="m-2"
                            onClick={this.changeAct}
                            startIcon={<Change />}
                          >
                            Modify Activities
                          </Button>
                        </Grid>
                      )}
                      <Grid item>
                        {/* <Button
                          className="m-2"
                          style={{ backgroundColor: "#4a934a" }}
                          onClick={this.toggleCloseTable}
                          startIcon={<CloudDownload />}
                        >
                          Generate PDF
                        </Button> */}
                      </Grid>
                    </Grid>
                  )}
                  <div className="container mt-2">
                    {this.state.loading ? (
                      <Loading loading={this.state.loading} />
                    ) : !this.state.changeAct ? (
                      <NonEditMainList
                        activeActivityIndex={this.state.activeActivityIndex}
                        defaultActivity={roadactivity.data}
                        percentage={this.state.percentage}
                      />
                    ) : (
                      <EditMainList
                        updateActivityName={this.props.updateActivityName}
                        defaultActivity={roadactivity.data}
                        changeAct={this.changeAct}
                        updateMainList={this.updateMainList}
                        updateSubList={this.updateSubList}
                        submitActivityList={this.submitActivityList}
                        updateSubActivityNameUI={this.updateSubActivityNameUI}
                      />
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      // <div>
      //   <div>
      //     <AddActivity
      //       alertSubActivity={this.state.alertSubActivity}
      //       alertSubActivityField={this.state.alertSubActivityField}
      //       data={this.state.defaultActivity}
      //       activityName={this.state.activityName}
      //       handleAutoComplete={this.handleAutoComplete}
      //       open={this.state.modalOpen}
      //       handleModalOpen={this.handleModalOpen}
      //       submitActivity={this.submitActivity}
      //       handleActivityChange={this.handleActivityChange}
      //     />
      //   </div>
      //   {this.state.isAddVisible && (
      //     <Grid
      //       container
      //       direction="row"
      //       style={{ marginTop: "2em" }}
      //       justify="center"
      //     >
      //       <Grid item>
      //         <Button
      //           className="m-2"
      //           color="primary"
      //           onClick={this.handleModalOpen}
      //           startIcon={<AddIcon />}
      //         >
      //           Add Activity
      //         </Button>
      //       </Grid>

      //       {!this.state.changeAct && (
      //         <Grid item>
      //           <Button
      //             className="m-2"
      //             onClick={this.changeAct}
      //             startIcon={<Change />}
      //           >
      //             Modify Activities
      //           </Button>
      //         </Grid>
      //       )}
      //       <Grid item>
      //         <Button
      //           className="m-2"
      //           style={{ backgroundColor: "#4a934a" }}
      //           onClick={this.toggleCloseTable}
      //           startIcon={<CloudDownload />}
      //         >
      //           Generate PDF
      //         </Button>
      //       </Grid>
      //     </Grid>
      //   )}
      //   <div className="container mt-2">
      //     {this.state.loading ? (
      //       <Loading loading={this.state.loading} />
      //     ) : !this.state.changeAct ? (
      //       <NonEditMainList
      //         activeActivityIndex={this.state.activeActivityIndex}
      //         defaultActivity={this.state.defaultActivity}
      //         percentage={this.state.percentage}
      //       />
      //     ) : (
      //       <EditMainList
      //         updateActivityName={this.props.updateActivityName}
      //         defaultActivity={this.state.defaultActivity}
      //         changeAct={this.changeAct}
      //         updateMainList={this.updateMainList}
      //         updateSubList={this.updateSubList}
      //         submitActivityList={this.submitActivityList}
      //         updateSubActivityNameUI={this.updateSubActivityNameUI}
      //       />
      //     )}
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    defaultActivity: state.activityReducer.defaultActivity,
    // percentage: state.activityReducer.percentage,
    loading: state.activityReducer.loading,
    monitoring: state.monitoringReducer.monitoring,
  };
};

export default connect(mapStateToProps, {
  getDefaultActivities,
  updateDefaultActivities,
  updateActivityName,
})(Activities);

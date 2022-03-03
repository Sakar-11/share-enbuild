import React, { Component } from "react";
import Loading from "../../Components/Loading";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  clearActivityCheckedArray,
  getTaskActivityDetails,
  updateTaskActivityDetails,
  doneUpdating,
} from "../../Redux/activityRedux/activityAction";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";

import {
  ArrowForwardIos as ArrowForwardIosIcon,
  Add as AddIcon,
  Edit,
  Delete,
} from "@material-ui/icons";

import axios from "axios";
import AddTasks from "./Tasks/AddTasks";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class SubActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityDetails: [],
      taskName: "",
      taskQuantity: "",
      taskUnit: "",
      taskSubName: "",
      taskSubQuantity: "",
      taskSubUnit: "",

      modalOpen: false,
      subProject: {},
      loading: true,
      taskPercentage: [],
      SubtaskPercentage: [],
      expanded: "panel1",
      isSubTask: false,
      isEdit: false,
      taskIndex: 0,
      isUpdated: false,
    };
  }

  async componentDidMount() {
    const id = global.config.secureStorage.getItem("subprojectId");
    const projectId = global.config.secureStorage.getItem("projectId");

    const { subactivity } = this.props.match.params;
    try {
      this.props.clearActivityCheckedArray();
      this.props.doneUpdating();
      const subProjectDetails = await axios.get(
        `${global.config.backendURL}/project/getSingleSubProject/${id}`
      );
      // const floorPerc = {
      //   data: [
      //     [
      //       {
      //         activity: "pcc",
      //         percentage: 100,
      //       },
      //     ],
      //   ],
      // };

      const roadNumber = this.props.location.state.roadActivityIndex;

      const floorPerc = await axios.get(
        `${global.config.backendURL}/activities/getTaskPercentage/${projectId}/${id}/${subactivity}/${roadNumber}`
      );
      this.setState({
        subProject: subProjectDetails.data,
        loading: false,
        taskPercentage: floorPerc.data.task,
        SubtaskPercentage: floorPerc.data.subtask,
      });
    } catch (error) {}
  }
  async componentDidUpdate() {
    const roadNumber = this.props.location.state.roadActivityIndex;
    const path = this.props.match.params;

    const { subactivity } = this.props.match.params;
    const id = global.config.secureStorage.getItem("subprojectId");
    const projectId = global.config.secureStorage.getItem("projectId");
    if (!this.state.isUpdated) {
      const floorPerc = await axios.get(
        `${global.config.backendURL}/activities/getTaskPercentage/${projectId}/${id}/${subactivity}/${roadNumber}`
      );
      this.setState({
        taskPercentage: floorPerc.data.task,
        SubtaskPercentage: floorPerc.data.subtask,
      });
      await this.props.getTaskActivityDetails({
        activity: path.subactivity,
        roadNumber,
        subprojectId: id,
      });
      this.setState({
        activityDetails: this.props.activityDetails,
        isUpdated: true,
      });
    }
  }

  fetchPercentage = index => {
    let temptaskPercentage = [...this.state.taskPercentage];
    // let eachtaskPercentage = temptaskPercentage[index];
    // // console.log("each", eachtaskPercentage);
    // for (var i = 0; i < temptaskPercentage[index].length; i++) {
    //   if (eachtaskPercentage[i]["activity"] === finalActivity) {
    //     return eachtaskPercentage[i]["percentage"];
    //   }
    // }
    if (temptaskPercentage != undefined) {
      if (temptaskPercentage[index]) {
        return temptaskPercentage[index];
      }
    }
    return 0;
  };
  fetchPercentageSubTask = (index, subindex) => {
    let temptaskPercentage = [...this.state.SubtaskPercentage];
    if (temptaskPercentage != undefined) {
      if (temptaskPercentage[index][subindex]) {
        return parseInt(temptaskPercentage[index][subindex]);
      }
    }
    return 0;
  };
  handleChange = panel => (event, newExpanded) => {
    this.setState({
      expanded: newExpanded ? panel : false,
    });
  };

  handleModalOpen = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      isSubTask: false,
    });
  };

  handleTaskChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleEdit = (i, name, quantity, unit) => {
    this.setState({
      modalOpen: true,
      isEdit: true,
      taskName: name,
      taskQuantity: quantity,
      taskUnit: unit,
      taskIndex: i,
    });
  };
  handleSubtask = (i, name, quantity, unit) => {
    this.setState({
      modalOpen: true,
      taskName: name,
      taskQuantity: quantity,
      taskUnit: unit,
      isSubTask: true,
      taskIndex: i,
    });
  };
  submitTask = () => {
    // console.log(
    //   this.state.taskName,
    //   this.state.taskQuantity,
    //   this.state.taskUnit
    // );

    let arrayAcc = [...this.state.activityDetails];

    if (!this.state.isEdit) {
      arrayAcc[arrayAcc.length] = {
        name: this.state.taskName,
        quantity: this.state.taskQuantity,
        unit: this.state.taskUnit,
      };
    } else {
      arrayAcc[this.state.taskIndex] = {
        name: this.state.taskName,
        quantity: this.state.taskQuantity,
        unit: this.state.taskUnit,
      };
    }
    this.updateCondition(arrayAcc);
    this.handleModalOpen();
    this.setState({
      isEdit: false,
      taskIndex: 0,
      activityDetails: [],
      taskName: "",
      taskQuantity: "",
      taskUnit: "",
    });
  };
  submitSubTask = () => {
    // console.log(
    //   this.state.taskName,
    //   this.state.taskQuantity,
    //   this.state.taskUnit
    // );

    let arrayAcc = [...this.state.activityDetails];

    let subArr = [];
    subArr = arrayAcc[this.state.taskIndex].subTask;
    if (subArr != undefined) {
      subArr[subArr.length] = {
        name: this.state.taskSubName,
        quantity: this.state.taskSubQuantity,
        unit: this.state.taskSubUnit,
        percentage: "0",
      };
    } else {
      subArr = [
        {
          name: this.state.taskSubName,
          quantity: this.state.taskSubQuantity,
          unit: this.state.taskSubUnit,
          percentage: "0",
        },
      ];
    }

    arrayAcc[this.state.taskIndex] = {
      name: this.state.taskName,
      quantity: this.state.taskQuantity,
      unit: this.state.taskUnit,
      subTask: subArr,
    };

    this.updateCondition(arrayAcc);
    this.handleModalOpen();
    this.setState({
      taskIndex: 0,
      isSubTask: false,
      activityDetails: [],

      taskName: "",
      taskQuantity: "",
      taskUnit: "",

      taskSubName: "",
      taskSubQuantity: "",
      taskSubUnit: "",
    });
  };

  deleteTask = i => {
    let arrayAcc = [...this.state.activityDetails];

    arrayAcc.splice(i, 1);
    this.updateCondition(arrayAcc);
  };
  deleteSubTask = (i, subindex) => {
    let arrayAcc = [...this.state.activityDetails];
    let subArr = [];
    subArr = arrayAcc[i].subTask;
    subArr.splice(subindex, 1);

    arrayAcc[i].subTask = subArr;
    this.updateCondition(arrayAcc);
  };

  updateCondition = arrayAcc => {
    const { activity, subactivity, floorNumber, subTaskIndex } =
      this.props.match.params;

    const roadNumber = this.props.location.state.roadActivityIndex;

    const subprojectId = global.config.secureStorage.getItem("subprojectId");

    if (subactivity === "null") {
      this.props.updateTaskActivityDetails({
        activity: activity,
        roadNumber,
        checkedArray: arrayAcc,
        subprojectId,
      });
    } else {
      this.props.updateTaskActivityDetails({
        activity: subactivity,
        roadNumber,
        checkedArray: arrayAcc,
        subprojectId,
      });
    }

    this.setState({
      isUpdated: false,
    });
  };

  render() {
    const path = this.props.match.params;
    const activity = path.activity;
    const subactivity = path.subactivity;
    let finalActivity = "";
    if (this.state.loading) return <Loading loading={this.state.loading} />;
    if (subactivity === "null")
      return <div>Null Activity please add activity</div>;
    if (subactivity != "null")
      return (
        <div>
          <div>
            <Typography variant="h6" style={{ padding: "10px 20px" }}>
              Activities/{path.activity.toUpperCase()}/
              {path.subactivity.toUpperCase()}
            </Typography>
          </div>
          <div>
            <AddTasks
              isSubTask={this.state.isSubTask}
              taskName={this.state.taskName}
              taskQuantity={this.state.taskQuantity}
              taskUnit={this.state.taskUnit}
              taskSubName={this.state.taskSubName}
              taskSubQuantity={this.state.taskSubQuantity}
              taskSubUnit={this.state.taskSubUnit}
              handleModalOpen={this.handleModalOpen}
              handleTaskChange={this.handleTaskChange}
              submitTask={this.submitTask}
              submitSubTask={this.submitSubTask}
              open={this.state.modalOpen}
            />
          </div>

          <Grid
            container
            direction="row"
            style={{ marginVertical: "2em" }}
            justify="center"
          >
            <Grid item>
              <Button
                className="m-2"
                color="primary"
                onClick={this.handleModalOpen}
                startIcon={<AddIcon />}
              >
                Add Tasks
              </Button>
            </Grid>
          </Grid>
          <div className="container" style={{ marginTop: "20px" }}>
            {this.state.activityDetails != undefined &&
            this.state.activityDetails.length !== 0
              ? this.state.activityDetails.map((task, index) => {
                  return (
                    <Accordion
                      expanded={this.state.expanded === `panel${index + 1}`}
                      onChange={this.handleChange(`panel${index + 1}`)}
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
                          <Typography variant="h6">{task.name}</Typography>
                          <Typography
                            // style={{ marginLeft: "20px" }}
                            color="textSecondary"
                            variant="h6"
                          >
                            {this.fetchPercentage(index).toFixed(2)}%
                          </Typography>
                          <Grid item>
                            <IconButton
                              aria-label="settings"
                              onClick={() => {
                                this.handleEdit(
                                  index,
                                  task.name,
                                  task.quantity,
                                  task.unit
                                );
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
                            <IconButton
                              aria-label="settings"
                              onClick={() => {
                                this.deleteTask(index);
                              }}
                              style={{
                                backgroundColor: "red",
                                color: "#fff",
                                padding: 4,
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails style={{ display: "inline" }}>
                        <Grid
                          container
                          spacing={0}
                          alignItems="center"
                          justify="center"
                          style={{
                            marginBottom: 20,
                            padding: 20,
                          }}
                        >
                          {/* <Grid item lg={6}>
                            <TableContainer
                              style={{ width: "100%", backgroundColor: "#fff" }}
                              aria-label="custom pagination table"
                            >
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell
                                    align="center"
                                    style={{ width: "100%" }}
                                  >
                                    Estimated Quantity
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    style={{ width: "100%" }}
                                  >
                                    Unit
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow key={index}>
                                  <TableCell
                                    style={{ padding: 0 }}
                                    align="center"
                                  >
                                    <Typography
                                      align={"center"}
                                      variant="h6"
                                      align="center"
                                    >
                                      {task.quantity}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    style={{ padding: 0 }}
                                    align="center"
                                  >
                                    <Typography
                                      align={"center"}
                                      variant="h6"
                                      align="center"
                                    >
                                      {task.unit}
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </TableContainer>
                          </Grid> */}
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          style={{ marginTop: "2em" }}
                          justify="flex-end"
                        >
                          <Grid item>
                            <Button
                              className="m-2"
                              color="primary"
                              onClick={() => {
                                this.handleSubtask(
                                  index,
                                  task.name,
                                  task.quantity,
                                  task.unit
                                );
                              }}
                              startIcon={<AddIcon />}
                            >
                              Add Sub Tasks
                            </Button>
                          </Grid>
                        </Grid>
                        {task.subTask
                          ? task.subTask.map((subTask, subTaskIndex) => {
                              return (
                                <Grid style={{ display: "flex" }}>
                                  <Link
                                    key={subTaskIndex}
                                    style={{ textDecoration: "none", flex: 1 }}
                                    to={{
                                      state: {
                                        roadActivityIndex:
                                          this.props.location.state
                                            .roadActivityIndex,
                                      },
                                      pathname: `/activities/${path.activity}/${path.subactivity}/${index}/${subTaskIndex}`,
                                    }}
                                  >
                                    <Card
                                      style={{
                                        boxShadow:
                                          "0 2px 4px rgb(179, 179, 179)",
                                        marginLeft: 20,
                                        marginRight: 20,
                                      }}
                                      className="mb-2"
                                      variant="outlined"
                                    >
                                      <CardContent>
                                        <Grid
                                          container
                                          justify="space-between"
                                          alignItems="center"
                                          direction="row"
                                        >
                                          <Grid item xs={8}>
                                            <Typography
                                              variant="h5"
                                              component="h2"
                                            >
                                              {subTask.name}
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <Typography
                                              // style={{ marginLeft: "20px" }}
                                              color="textSecondary"
                                            >
                                              {this.fetchPercentageSubTask(
                                                index,
                                                subTaskIndex
                                              ).toFixed(2)}
                                              %
                                            </Typography>
                                          </Grid>

                                          <Grid item>
                                            <ArrowForwardIosIcon />
                                          </Grid>
                                        </Grid>
                                      </CardContent>
                                    </Card>
                                  </Link>
                                  <IconButton
                                    aria-label="settings"
                                    onClick={() => {
                                      this.deleteSubTask(index, subTaskIndex);
                                    }}
                                    style={{
                                      backgroundColor: "red",
                                      color: "#fff",
                                      padding: "11px",
                                      height: "44px",
                                      margin: 10,
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Grid>
                              );
                            })
                          : ""}
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              : ""}
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => {
  //
  return {
    activityDetails: state.activityReducer.activityDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTaskActivityDetails: data => dispatch(getTaskActivityDetails(data)),
    updateTaskActivityDetails: data =>
      dispatch(updateTaskActivityDetails(data)),
    clearActivityCheckedArray: () => dispatch(clearActivityCheckedArray()),
    doneUpdating: () => dispatch(doneUpdating()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubActivities);

import React, { Component } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { Update } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  getTaskActivityDetails,
  updateTaskActivityDetails,
  doneUpdating,
} from "../../Redux/activityRedux/activityAction";
import SubTaskTable from "./SubTaskTable";
import EditSubTask from "./Tasks/EditSubTask";
import Loading from "../../Components/Loading";
import axios from "axios";

class SubTaskData extends Component {
  constructor(props) {
    super(props);
    const editRoles = [
      "project_manager",
      "junior_engineer",
      "senior_engineer",
      "super_admin",
    ];
    const role = global.config.secureStorage.getItem("role");
    const isEditable = editRoles.find(item => item == role) ? true : false;
    this.state = {
      modalOpen: false,
      subProject: {},
      loading: true,
      activityDetails: [],
      isUpdated: false,
      isEditable: isEditable,
      subTaskData: [],
      subTaskPanaroma: [],
      subTaskPercentage: 0,
      taskSubName: "",
      taskSubQuantity: "",
      taskSubUnit: "",
    };
  }
  async componentDidMount() {
    //

    // console.log(this.props.location.state.roadActivityIndex.roadActivityIndex);
    const id = global.config.secureStorage.getItem("subprojectId");
    const { activity, subactivity, floorNumber } = this.props.match.params;
    try {
      const roadNumber = this.props.location.state.roadActivityIndex;
      const subProjectDetails = await axios.get(
        `${global.config.backendURL}/project/getSingleSubProject/${id}`
      );
      // var array = Array(Number(subProjectDetails.data.flatNumber)).fill(false);
      this.setState({
        subProject: subProjectDetails.data,
        loading: false,
      });
      if (subactivity === "null") {
        //
        await this.props.getTaskActivityDetails({
          activity: activity,
          roadNumber,
          subprojectId: id,
        });
      } else {
        await this.props.getTaskActivityDetails({
          activity: subactivity,
          roadNumber,
          subprojectId: id,
        });
      }
    } catch (error) {
      //
    }
  }

  componentDidUpdate() {
    const path = this.props.match.params;
    if (this.props.activityDetails) {
      if (!this.state.isUpdated) {
        let subtask =
          this.props.activityDetails[path.floorNumber].subTask[
            path.subTaskIndex
          ];
        this.setState({
          activityDetails: this.props.activityDetails,
          subTaskData: subtask,
          subTaskPercentage: subtask.percentage,
          subTaskPanaroma: subtask.panaroma,
          taskSubName: subtask.name,
          taskSubQuantity: subtask.quantity,
          taskSubUnit: subtask.unit,
          isUpdated: true,
        });
      }
    }
  }
  updateSubTask = () => {
    const { activity, subactivity, floorNumber, subTaskIndex } =
      this.props.match.params;
    let arrayAcc = [...this.state.activityDetails];

    let subArr = [];
    subArr = arrayAcc[floorNumber].subTask;
    if (subArr != undefined) {
      subArr[subTaskIndex] = {
        name: this.state.taskSubName,
        quantity: this.state.taskSubQuantity,
        unit: this.state.taskSubUnit,
        percentage: this.state.subTaskPercentage,
        panaroma: this.state.subTaskPanaroma,
      };
    }
    arrayAcc[floorNumber].subTask = subArr;

    this.updateCondition(arrayAcc);
  };

  updateCondition = arrayAcc => {
    const { activity, subactivity, floorNumber, subTaskIndex } =
      this.props.match.params;

    const roadNumber = this.props.location.state.roadActivityIndex;

    const subprojectId = global.config.secureStorage.getItem("subprojectId");
    if (
      global.config.secureStorage.getItem("projectType") === "Infrastructure"
    ) {
      if (roadNumber != undefined) {
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
      }
    } else {
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
    }
  };

  handlePanaroma = file => {
    if (this.state.subTaskPanaroma !== undefined) {
      let newImage = [...this.state.subTaskPanaroma];
      newImage[newImage.length] = file;

      this.setState({
        subTaskPanaroma: newImage,
      });
    } else {
      let newImage = [];
      newImage[0] = file;
      this.setState({
        subTaskPanaroma: newImage,
      });
    }
  };
  addPercentage = () => {
    if (this.state.subTaskPercentage < 100) {
      let per = parseInt(this.state.subTaskPercentage) + 10;
      this.setState({
        subTaskPercentage: per.toString(),
      });
    }
  };
  subPercentage = () => {
    if (this.state.subTaskPercentage > 0) {
      let per = parseInt(this.state.subTaskPercentage) - 10;
      this.setState({
        subTaskPercentage: per.toString(),
      });
    }
  };
  goBack = () => {
    // this.props.history.goBack();
  };
  handleModalOpen = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  handleTaskChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitTask = () => {
    const { activity, subactivity, floorNumber, subTaskIndex } =
      this.props.match.params;

    const subprojectId = global.config.secureStorage.getItem("subprojectId");
    let arrayAcc = [...this.state.activityDetails];

    let subArr = [];
    subArr = arrayAcc[floorNumber].subTask;
    if (subArr != undefined) {
      subArr[subTaskIndex] = {
        name: this.state.taskSubName,
        quantity: this.state.taskSubQuantity,
        unit: this.state.taskSubUnit,
        percentage: this.state.subTaskPercentage,
        panaroma: this.state.subTaskPanaroma,
      };
    }
    arrayAcc[floorNumber].subTask = subArr;

    this.updateCondition(arrayAcc);
    this.handleModalOpen();
    this.setState({
      isEdit: false,
      taskIndex: 0,
      activityDetails: [],
      isUpdated: false,
      taskSubName: "",
      taskSubQuantity: "",
      taskSubUnit: "",
    });
  };

  render() {
    // console.log(this.props.location.state.roadActivityIndex);
    if (this.state.isUpdated == true) {
      console.log("ss");
      if (this.props.isUpdateSuccess) {
        this.props.history.goBack();
      }
    }
    // if (this.props.isUpdateSuccess) {
    //   console.log(this.state.isUpdated);
    //   // this.setState({
    //   //   isUpdated: false,
    //   // });
    //   return <></>;
    // }
    if (this.props.location.state === undefined) {
      this.props.history.push("/activities");
      return <></>;
    }
    const path = this.props.match.params;
    const activity = path.activity;
    const subactivity = path.subactivity;
    if (this.props.loading || this.state.loading)
      return <Loading loading={this.props.loading || this.state.loading} />;
    return (
      <>
        <div>
          <Typography variant="h6" style={{ padding: "10px 20px" }}>
            Activities/{activity.toUpperCase()}/{subactivity.toUpperCase()}
            /Flats
          </Typography>
        </div>
        <div>
          <EditSubTask
            taskSubName={this.state.taskSubName}
            taskSubQuantity={this.state.taskSubQuantity}
            taskSubUnit={this.state.taskSubUnit}
            handleModalOpen={this.handleModalOpen}
            handleTaskChange={this.handleTaskChange}
            submitTask={this.submitTask}
            open={this.state.modalOpen}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1.5em",
          }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            // spacing={2}
            style={{
              margin: "20px 0.3em 20px",
              width: "90%",
            }}
          >
            <Grid item>
              <Typography
                className="justify-content-center d-flex my-2"
                variant="h4"
              >
                {/* Flat List */}
              </Typography>
            </Grid>
            {/* {this.state.isEditable && (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Update />}
                  onClick={this.updateActivity}
                >
                  Update
                </Button>
              </Grid>
            )} */}
          </Grid>
          <div className="container">
            <SubTaskTable
              isEditable={this.state.isEditable}
              addPercentage={this.addPercentage}
              subPercentage={this.subPercentage}
              updateSubTask={this.updateSubTask}
              handleModalOpen={this.handleModalOpen}
              handlePanaroma={this.handlePanaroma}
              subTaskPanaroma={this.state.subTaskPanaroma}
              subTaskData={this.state.subTaskData}
              subTaskPercentage={this.state.subTaskPercentage}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  //
  return {
    activityDetails: state.activityReducer.activityDetails,
    loading: state.activityReducer.loading,
    isUpdateSuccess: state.activityReducer.isUpdateSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTaskActivityDetails: data => dispatch(getTaskActivityDetails(data)),
    updateTaskActivityDetails: data =>
      dispatch(updateTaskActivityDetails(data)),
    doneUpdating: () => dispatch(doneUpdating()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubTaskData);

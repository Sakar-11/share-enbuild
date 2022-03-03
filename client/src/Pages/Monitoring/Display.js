import React, { Component } from "react";
import { CardHeader, Typography, Grid, Button } from "@material-ui/core";
import Style from "./style.module.scss";
import Notifications from "react-notification-system-redux";
import EditCompletion from "./EditCompletion";
import Activity from "./Activity";
import Loading from "../../Components/Loading";
import { connect } from "react-redux";
import {
  getActivities,
  updateActivity,
} from "../../Redux/monitoringRedux/monitoringAction";
import editRoles from "../BarChart/planningEditRoles";
import TableMonitoring from "./TableMonitoring";
import { CloudDownload } from "@material-ui/icons";

class Monitoring extends Component {
  constructor(props) {
    super(props);
    const role = global.config.secureStorage.getItem("role");
    const isEditable = editRoles.find(item => item == role) ? true : false;
    this.state = {
      activityName: "",
      estimatedcompletion: "",
      actualcompletion: "",
      isEditCompletion: false,
      loading: true,
      index: -1,
      activities: [],
      isEditable: isEditable,
      isOpenTable: false,
    };
  }
  async componentDidMount() {
    try {
      this.props.getActivities();
    } catch (error) {}
  }

  editActivity = (name, index) => {
    this.setState({
      editActivityName: name,
      index: index,
      activities: this.props.monitoring,
    });
    const Activity = this.props.monitoring.find(Activity => {
      return Activity.title === name;
    });
    this.setState({
      isEditCompletion: !this.state.isEditCompletion,
      activityName: Activity.title,
      estimatedcompletion: Activity.estimatedcompletion,
      actualcompletion: Activity.actualcompletion,
    });
  };
  handleClick = () => {
    this.setState({ isEditCompletion: !this.state.isEditCompletion });
  };

  handleSubmit = async index => {
    if (this.state.activities.length == 0) {
      await this.setState({
        activities: this.props.monitoring,
      });
    }

    var data = this.state.activities;
    var prev = data[index];
    prev = {
      ...prev,
      actualcompletion: this.state.actualcompletion,
    };
    data[index] = prev;
    this.setState({
      activities: data,
      isEditCompletion: false,
    });
    this.props.updateActivity(data);
  };

  toggleOpenTable = () => {
    this.setState({ isOpenTable: !this.state.isOpenTable });
  };

  toggleCloseTable = () => {
    this.setState({ isOpenTable: false });
  };
  handleChange = event => {
    if (this.state.activities.length == 0) {
      this.setState({
        activities: this.props.monitoring,
      });
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleRemark = async (remark, index) => {
    if (this.state.activities.length == 0) {
      await this.setState({
        activities: this.props.monitoring,
      });
    }
    //
    const newActivities = this.state.activities.map((activity, i) => {
      if (i === index) {
        const change = { ...activity, remark: remark };
        return change;
      }
      return activity;
    });
    this.props.updateActivity(newActivities);

    //
    this.setState({
      activities: newActivities,
    });
  };

  render() {
    const { isEditCompletion } = this.state;
    if (isEditCompletion) {
      return (
        <EditCompletion
          activityName={this.state.activityName}
          estimatedcompletion={this.state.estimatedcompletion}
          actualcompletion={this.state.actualcompletion}
          handleClick={this.handleClick}
          handleChange={this.handleChange}
          index={this.state.index}
          handleSubmit={this.handleSubmit}
        />
      );
    }
    const { isOpenTable } = this.state;

    if (isOpenTable) {
      return (
        <TableMonitoring
          title="Monitoring"
          subtitle="Monitoring table"
          toggleCloseTable={this.toggleCloseTable}
          monitoring={this.props.monitoring}
        />
      );
    }

    if (!isOpenTable) {
      return (
        <div>
          {this.props.notifications && (
            <Notifications notifications={this.props.notifications} />
          )}
          {this.props.loading ? (
            <Loading loading={true} />
          ) : (
            <>
              <div>
                {this.props.monitoring.length != 0 && (
                  <Grid
                    container
                    direction="row"
                    style={{ margin: "10px" }}
                    justify="flex-end"
                  >
                    <Grid item>
                      <Button
                        style={{
                          marginRight: "1em",
                          backgroundColor: "#4a934a",
                        }}
                        onClick={this.toggleOpenTable}
                        size="large"
                        startIcon={<CloudDownload />}
                      >
                        Generate PDF
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {this.props.monitoring.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100vw",
                      height: "80vh",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      style={{ marginLeft: "0.5em", textAlign: "center" }}
                    >
                      Bar chart not filled yet
                    </Typography>
                  </div>
                )}

                <section className={Style.all__activity}>
                  <div>
                    {this.props.monitoring.map((activity, index) => {
                      return (
                        <div key={index}>
                          <Activity
                            isEditable={this.state.isEditable}
                            editActivity={this.editActivity}
                            activityName={activity.title}
                            estimatedcompletion={activity.estimatedcompletion}
                            actualcompletion={activity.actualcompletion}
                            index={index}
                            activityRemark={activity.remark}
                            addRemark={this.handleRemark}
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  //
  return {
    loading: state.monitoringReducer.loading,
    monitoring: state.monitoringReducer.monitoring,
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps, { getActivities, updateActivity })(
  Monitoring
);

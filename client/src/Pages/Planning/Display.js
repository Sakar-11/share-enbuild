import React, { Component } from "react";
import { Button, CardHeader, Typography } from "@material-ui/core";
import Plan from "./Plan";
import Loading from "../../Components/Loading";
import AddPlan from "./AddPlan";
// import { blue } from "@material-ui/core/colors";
import { Add } from "@material-ui/icons";
import Style from "./style.module.scss";
import { connect } from "react-redux";
import {
  addPlan,
  getPlan,
  deletePlan,
  updatePlan,
} from "../../Redux/planningRedux/planAction";
import Notifications from "react-notification-system-redux";
import PropTypes from "prop-types";
import editRoles from "../BarChart/planningEditRoles";

class Display extends Component {
  constructor(props) {
    super(props);
    const role = global.config.secureStorage.getItem("role");
    const isEditable = editRoles.find(item => item == role) ? true : false;
    this.state = {
      planTitle: "",
      planDetail: "",
      deadline: new Date(),
      createdAt: new Date(),
      planId: "",
      editPlanId: "",
      allPlans: [],
      isCreateNewPlan: false,
      planCompleted: false,
      isDelayed: false,
      delayReason: "",
      isEditable: isEditable,
    };
  }

  async componentDidMount() {
    await this.props.getPlan();
    if (!this.props.loading) {
      this.setState({
        allPlans: this.props.plan.data,
      });
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeDate = event => {
    this.setState({
      deadline: event,
    });
  };
  toggleCreateNewPlan = () => {
    this.setState({
      planTitle: "",
      planDetail: "",
      deadline: new Date(),
      isCreateNewPlan: !this.state.isCreateNewPlan,
    });
  };

  deletePlan = id => {
    const requiredPlan = this.props.plan.data.find(eachPlan => {
      return eachPlan.planId === id;
    });
    this.props.deletePlan(requiredPlan._id);
    const newPlans = this.state.allPlans.filter(
      eachPlan => eachPlan.planId !== id
    );
    this.setState({
      allPlans: newPlans,
    });
  };

  editPlanStatus = id => {
    const newPlans = this.state.allPlans.map(eachPlan => {
      if (eachPlan.planId === id) {
        const change = {
          ...eachPlan,
          planCompleted: !this.state.planCompleted,
        };
        this.props.updatePlan(eachPlan.planId, change);
        return change;
      }
      return eachPlan;
    });
    this.setState({
      allPlans: newPlans,
    });
  };
  editReason = (reason, id) => {
    const newPlans = this.state.allPlans.map(eachPlan => {
      if (eachPlan.planId === id) {
        const change = {
          ...eachPlan,
          delayReason: reason,
        };
        this.props.updatePlan(eachPlan.planId, change);
        return change;
      }
      return eachPlan;
    });
    this.setState({
      allPlans: newPlans,
    });
  };
  updatePlan = event => {
    event.preventDefault();
    const newPlans = this.state.allPlans.map(eachPlan => {
      if (eachPlan.planId === this.state.editPlanId) {
        const change = {
          ...eachPlan,
          planCompleted: this.state.planCompleted || eachPlan.planCompleted,
          // delayReason: this.state.delayReason || eachPlan.delayReason,
        };
        this.props.updatePlan(eachPlan.planId, change);
        return change;
      }
      return eachPlan;
    });
    this.setState({
      allPlans: newPlans,
    });
  };

  savePlan = event => {
    event.preventDefault();
    const id = Date.now();
    // if (this.state.deadline.getTime() <= this.state.createdAt.getTime()) {
    //   this.setState({
    //     isDelayed: true,
    //   });
    // }
    let now = this.state.deadline;
    var date =
      (parseInt(now.getMonth()) + 1).toString() +
      "-" +
      now.getDate() +
      "-" +
      now.getFullYear();

    let n = this.state.createdAt;
    const createdDate =
      (parseInt(n.getMonth()) + 1).toString() +
      "-" +
      n.getDate() +
      "-" +
      n.getFullYear();
    const finalPlan = {
      planTitle: this.state.planTitle,
      planDetail: this.state.planDetail,
      createdAt: createdDate,
      // createdAt: this.state.createdAt,
      // isDelayed: this.state.isDelayed,
      planCompleted: this.state.planCompleted,
      delayReason: "",
      deadline: date,
      // deadline: this.state.deadline,
      planId: id,
    };

    let newPlans = [...this.state.allPlans, finalPlan];

    this.setState({
      planTitle: "",
      planDetail: "",
      allPlans: newPlans,
      isCreateNewPlan: !this.state.isCreateNewPlan,
    });
    this.props.addPlan(finalPlan);
  };

  render() {
    const { isCreateNewPlan } = this.state;
    if (isCreateNewPlan) {
      return (
        <AddPlan
          handleChange={this.handleChange}
          handleChangeDate={this.handleChangeDate}
          planTitle={this.state.planTitle}
          planDetail={this.state.planDetail}
          deadline={this.state.deadline}
          savePlan={this.savePlan}
          toggleCreateNewPlan={this.toggleCreateNewPlan}
        />
      );
    }

    return (
      <>
        <div>
          {this.props.notifications && (
            <Notifications notifications={this.props.notifications} />
          )}
          {this.state.isEditable && (
            <section className={Style.button__display}>
              <Button
                onClick={this.toggleCreateNewPlan}
                startIcon={<Add />}
                size="large"
              >
                Add Plan
              </Button>
            </section>
          )}
          {this.props.loading ? (
            <Loading loading={this.props.loading} />
          ) : !this.props.loading && !this.state.allPlans.length ? (
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
                No Plan Found!
              </Typography>
            </div>
          ) : (
            <div>
              <CardHeader
                title="Not Completed Plans"
                subheader="Plan in repository"
              />
              <section className={Style.all__plan}>
                {this.state.allPlans.map((eachPlan, index) => {
                  return !eachPlan.planCompleted ? (
                    <div key={index}>
                      <Plan
                        isEditable={this.state.isEditable}
                        id={eachPlan.planId}
                        planTitle={eachPlan.planTitle}
                        planDetail={eachPlan.planDetail}
                        deadline={eachPlan.deadline}
                        createdAt={eachPlan.createdAt}
                        planCompleted={eachPlan.planCompleted}
                        handleChange={this.handleChange}
                        delayReason={eachPlan.delayReason}
                        editPlanStatus={this.editPlanStatus}
                        deletePlan={this.deletePlan}
                        editPlan={this.editPlan}
                        show={
                          !eachPlan.planCompleted &&
                          !eachPlan.delayReason &&
                          Date.parse(eachPlan.deadline) <=
                            Date.parse(
                              parseInt(new Date().getMonth()) +
                                1 +
                                "-" +
                                new Date().getDate() +
                                "-" +
                                new Date().getFullYear()
                            )
                            ? true
                            : false
                        }
                        editReason={this.editReason}
                      />
                    </div>
                  ) : (
                    <div key={index}></div>
                  );
                })}
              </section>

              <CardHeader
                title="Completed Plans"
                subheader="Plan in repository"
              />
              <section className={Style.all__plan}>
                {this.state.allPlans.map((eachPlan, index) => {
                  return eachPlan.planCompleted ? (
                    <div key={index}>
                      <Plan
                        id={eachPlan.planId}
                        planTitle={eachPlan.planTitle}
                        planDetail={eachPlan.planDetail}
                        deadline={eachPlan.deadline}
                        createdAt={eachPlan.createdAt}
                        planCompleted={eachPlan.planCompleted}
                        handleChange={this.handleChange}
                        delayReason={eachPlan.delayReason}
                        editPlanStatus={this.editPlanStatus}
                        deletePlan={this.deletePlan}
                        editPlan={this.editPlan}
                        show={
                          !eachPlan.planCompleted &&
                          !eachPlan.delayReason &&
                          Date.parse(eachPlan.deadline) <=
                            Date.parse(
                              parseInt(new Date().getMonth()) +
                                1 +
                                "-" +
                                new Date().getDate() +
                                "-" +
                                new Date().getFullYear()
                            )
                            ? true
                            : false
                        }
                        editReason={this.editReason}
                      />
                    </div>
                  ) : (
                    <div key={index}></div>
                  );
                })}
              </section>
            </div>
          )}
        </div>
      </>
    );
  }
}

Display.propTypes = {
  plan: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    plan: state.planReducer,
    notifications: state.notifications,
    success: state.planReducer.success,
    loading: state.planReducer.loading,
  };
};

export default connect(mapStateToProps, {
  addPlan,
  getPlan,
  deletePlan,
  updatePlan,
})(Display);

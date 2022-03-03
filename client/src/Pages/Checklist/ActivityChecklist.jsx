import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Style from "./style.module.scss";
import { connect } from "react-redux";
import Notifications from "react-notification-system-redux";
import * as userAction from "../../Redux/loginRedux/loginAction";
import {
  Add as AddIcon,
  TransferWithinAStationSharp,
} from "@material-ui/icons";
import * as action from "../../Redux/checkListRedux/checklistAction";
import {
  Grid,
  TextField,
  Button,
  Typography,
  withStyles,
  Divider,
} from "@material-ui/core";
import { verifyValidity } from "./checklistUtil";
import ChecklistCard from "./ChecklistCard";
import { Autocomplete } from "@material-ui/lab";
import Loading from "../../Components/Loading";
const axios = require("axios");

const useStyles = theme => ({
  root: {
    backgroundColor: "white",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export class ActivityChecklist extends Component {
  handleModalOpen = () => {
    this.setState(prevState => {
      return {
        modalOpen: !prevState.modalOpen,
      };
    });
  };
  constructor(props) {
    super(props);
    const role = global.config.secureStorage.getItem("role");
    const checkRoles = [
      "senior_engineer",
      "quality_engineer",
      "safety_engineer",
      "super_admin",
    ];
    const isCheckVisible = checkRoles.find(item => item == role) ? true : false;

    const approveVisible = [
      "project_manager",
      "quality_engineer",
      "safety_engineer",
      "super_admin",
    ];
    const isApproveVisible = approveVisible.find(item => item == role)
      ? true
      : false;

    const addRoles = [
      "junior_engineer",
      "quality_engineer",
      "safety_engineer",
      "super_admin",
    ];

    const filterValues = [
      { value: "all", title: "All" },
      { value: "submitted", title: "Submitted" },
      { value: "checked", title: "Checked" },
      { value: "approved", title: "Approved" },
    ];
    const isAddVisible = addRoles.find(item => item == role) ? true : false;
    this.state = {
      role: global.config.secureStorage.getItem("role"),
      isCheckVisible: isCheckVisible,
      isApproveVisible: isApproveVisible,
      isAddVisible: isAddVisible,
      modalOpen: false,
      filter: "all",
      filterValues: filterValues,
    };
    //
  }
  componentWillMount() {
    this.props.fetchData({
      subprojectId: global.config.secureStorage.getItem("subprojectId"),
      subActivity: this.props.match.params.defaultChecklist,
      type: this.props.match.params.type,
    });
  }

  componentDidMount() {
    const type = this.props.match.params.type;
    const role = global.config.secureStorage.getItem("role");
    //
    if (!verifyValidity(role, type)) {
      //
      // global.config.secureStorage.clear();
      this.props.logout();
      this.props.history.replace("/login");
    }
  }
  render() {
    const path = this.props.match.params;

    if (this.props.loading) {
      return <Loading loading={this.props.loading} />;
    }
    return (
      <div>
        {this.props.notifications && (
          <Notifications notifications={this.props.notifications} />
        )}

        {this.state.isAddVisible && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1.5em",
              marginRight: "1em",
              marginBottom: "1em",
            }}
          >
            <Link
              to={`/checklist/${this.props.match.params.type}/${path.defaultChecklist}/addChecklist`}
            >
              <Button startIcon={<AddIcon />} size="large">
                Add Checklist
              </Button>
            </Link>
          </div>
        )}
        <Grid style={{ margin: "2em 1em 0.5em" }}>
          <Autocomplete
            defaultValue={"All"}
            fullWidth
            id="autoComplete"
            onChange={(event, value) => {
              this.setState({
                filter: value.value,
              });
            }}
            options={this.state.filterValues}
            getOptionLabel={option => option.title}
            renderInput={params => (
              <TextField {...params} label={"All"} variant="outlined" />
            )}
          />
        </Grid>

        <Grid style={{ padding: "10px" }}>
          {(this.state.filter == "all" || this.state.filter == "submitted") && (
            <>
              <Grid item style={{ margin: "20px 5px 10px" }}>
                <Typography variant="h5">{`Submitted ${path.defaultChecklist} Checklists`}</Typography>
                <Divider />
              </Grid>
              {this.props.tasks.filter(item => !item.approved && !item.checked)
                .length == 0 && (
                <Grid item style={{ marginLeft: "0.5em" }}>
                  <Typography variant="h6" color="textSecondary">
                    No submitted checklist available
                  </Typography>
                </Grid>
              )}

              {this.props.tasks.map((item, index) => {
                if (item.approved || item.checked) {
                  return;
                }

                return (
                  <ChecklistCard
                    // isAddVisible={this.state.isAddVisible}
                    isApproveVisible={this.state.isApproveVisible}
                    isCheckVisible={this.state.isCheckVisible}
                    checkable={true}
                    item={item}
                    key={index}
                    approveCheckList={this.props.approveCheckList}
                    subActivity={this.props.match.params.defaultChecklist}
                    approvable={true}
                    type={this.props.match.params.type}
                  />
                );
              })}
            </>
          )}

          {(this.state.filter == "all" || this.state.filter == "checked") && (
            <>
              <Grid item style={{ margin: "20px 5px 10px" }}>
                <Typography variant="h5">{`Checked ${path.defaultChecklist} Checklists`}</Typography>
                <Divider />
              </Grid>
              {this.props.tasks.filter(item => !item.approved && item.checked)
                .length == 0 && (
                <Grid item style={{ marginLeft: "0.5em" }}>
                  <Typography variant="h6" color="textSecondary">
                    No checked checklist available
                  </Typography>
                </Grid>
              )}

              {this.props.tasks.map((item, index) => {
                if (item.approved || !item.checked) {
                  return;
                }

                return (
                  <ChecklistCard
                    isApproveVisible={this.state.isApproveVisible}
                    isCheckVisible={this.state.isCheckVisible}
                    checkable={false}
                    item={item}
                    key={index}
                    approveCheckList={this.props.approveCheckList}
                    subActivity={this.props.match.params.defaultChecklist}
                    approvable={true}
                    type={this.props.match.params.type}
                  />
                );
              })}
            </>
          )}

          {(this.state.filter == "all" || this.state.filter == "approved") && (
            <>
              <Grid item style={{ margin: "20px 5px 10px" }}>
                <Typography variant="h5">{`Approved ${path.defaultChecklist} Checklists`}</Typography>
                <Divider />
              </Grid>
              {this.props.tasks.filter(item => item.approved).length == 0 && (
                <Grid item style={{ marginLeft: "0.5em" }}>
                  <Typography variant="h6" color="textSecondary">
                    No approved checklist available
                  </Typography>
                </Grid>
              )}

              {this.props.tasks.map((item, index) => {
                if (!item.approved) {
                  return;
                }

                return (
                  <ChecklistCard
                    isApproveVisible={this.state.isApproveVisible}
                    isCheckVisible={this.state.isCheckVisible}
                    checkable={false}
                    item={item}
                    key={index}
                    approveCheckList={this.props.approveCheckList}
                    subActivity={this.props.match.params.defaultChecklist}
                    approvable={false}
                    type={this.props.match.params.type}
                  />
                );
              })}
            </>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
    error: state.loginReducer.error,
    notifications: state.notifications,
    tasks: state.checkListReducer.tasks,
    loading: state.checkListReducer.loading,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: payload => dispatch(action.fetchCheckList(payload)),
    logout: () => dispatch(userAction.logout()),
    approveCheckList: (id, subprojectId, subActivity, type, forApproval) =>
      dispatch(
        action.approveCheckList(
          id,
          subprojectId,
          subActivity,
          type,
          forApproval
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ActivityChecklist));

/*
 <Grid>
          <Grid item>
            <CardHeader title={this.props.match.params.defaultChecklist} />
          </Grid>
          {this.state.role === "chief_engineer" ? (
            <></>
          ) : (
            <Grid item>
              <Typography
                style={{
                  fontSize: "1.25rem",
                  marginLeft: "0.85em"
                }}
                variant="h4"
              >
                Pending Approvals
              </Typography>
            </Grid>
          )}
          <Divider />
          <Grid
            item
            container
            direction="row"
            spacing={2}
            style={{ margin: "0.5em" }}
          >
            {this.props.tasks.length !== 0 &&
              this.props.tasks.map((ele, index) => {
                if (ele.approved) {
                  return null;
                }
                k1 += 1;
                return (
                  <Grid item key={index}>
                    <ChecklistCard
                      item={ele}
                      approveCheckList={this.props.approveCheckList}
                      subActivity={this.props.match.params.defaultChecklist}
                      approvable={true}
                    />
                  </Grid>
                );
              })}
            {k1 === 0 && (
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  No CheckLists available for approval
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid item>
            <Typography
              style={{
                fontSize: "1.25rem",
                marginLeft: "0.85em"
              }}
              variant="h4"
            >
              Approved
            </Typography>
          </Grid>
          <Divider />
          <Grid
            container
            direction="row"
            style={{ margin: "0.5em " }}
            spacing={2}
          >
            {this.props.tasks !== [] && this.props.tasks.length !== 0 ? (
              this.props.tasks.map((ele, index) => {
                if (!ele.approved) {
                  return null;
                }
                k2 += 1;
                return (
                  <ChecklistCard
                    item={ele}
                    key={index}
                    approveCheckList={this.props.approveCheckList}
                    subActivity={this.props.match.params.defaultChecklist}
                    approvable={false}
                    type={this.props.match.params.type}
                  />
                );
              })
            ) : (
              <></>
            )}
            {k2 === 0 && (
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  No approved checklists available
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
*/

import React from "react";
import { Component } from "react";
import {
  TextField,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Divider,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { green, red, cyan } from "@material-ui/core/colors";
import { Save, Close } from "@material-ui/icons";
import Style from "./style.module.scss";
import _ from "lodash";
import { logout } from "../../Redux/loginRedux/loginAction";
import { connect } from "react-redux";

import FileBase64 from "react-file-base64";
import Notifications from "react-notification-system-redux";
// import PropTypes from "prop-types";
import axios from "axios";
import {
  addChecklist,
  // getChecklistTasks,
  fetchCheckList,
  getDefaultChecklist,
} from "../../Redux/checkListRedux/checklistAction";
import { verifyValidity } from "./checklistUtil";
import Loading from "../../Components/Loading";

class AddChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checklistTitle: "",
      // numberOfChecklist: 1,
      allCheckLists: [],
      subChecklist: [],
      projectName: "",
      createdDate: new Date().toDateString(),
      location: "",
      submittedBy: global.config.secureStorage.getItem("username"),
      checkedBy: "Senior Engineer",
      approvedBy: "Project Manager",
      count: "",
      checklistImage: "",
    };
    //
    //
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  async componentDidMount() {
    try {
      const type = this.props.match.params.type;
      const role = global.config.secureStorage.getItem("role");
      if (!verifyValidity(role, type)) {
        // global.config.secureStorage.clear();
        this.props.logout();
        this.props.history.replace("/login");
      }
      const visibleRoles = [
        "junior_engineer",
        "quality_engineer",
        "safety_engineer",
        "super_admin",
      ];
      if (!visibleRoles.find(item => item == role)) {
        // global.config.secureStorage.clear();
        this.props.logout();
        this.props.history.replace("/login");
        return;
      }
      await this.props.getDefaultChecklist(this.props.match.params.type);
      let defaultChecklist = this.props.defaultChecklist.data,
        findChecklist = this.props.match.params.defaultChecklist;
      let newContent = [];
      if (this.props.defaultChecklist.length !== 0) {
        for (let i = 0; i < defaultChecklist.length; i++) {
          if (defaultChecklist[i].title === findChecklist) {
            newContent = defaultChecklist[i].content;
            break;
          }
        }
        this.setState({
          subChecklist: newContent,
          count: newContent.length,
        });
      }
    } catch (error) {}
  }
  saveCheckList = event => {
    event.preventDefault();
    const id = Date.now();
    const finalChecklist = {
      checklistTitle: this.state.checklistTitle,
      checklistId: id,
      subChecklist: this.state.subChecklist,
      createdDate: this.state.createdDate,
      projectName: this.state.projectName,
      subProjectName: this.state.subProjectName,
      location: this.state.location,
      checkListImage: this.state.checklistImage,
      submittedBy: this.state.submittedBy,
      checkedBy: this.state.checkedBy,
      approvedBy: this.state.approvedBy,
      type: this.props.match.params.type,
    };

    let newChecklist = [...this.state.allCheckLists, finalChecklist];
    this.setState({
      allCheckLists: newChecklist,
    });
    finalChecklist["activityName"] = this.props.match.params.defaultChecklist;

    this.props.addChecklist(finalChecklist);
    this.props.fetchCheckList({
      subprojectId: global.config.secureStorage.getItem("subprojectId"),
      subActivity: this.props.match.params.defaultChecklist,
      type: this.props.match.params.type,
    });
    this.props.history.goBack();
  };
  handleRadio = (e, i) => {
    let newAllCheckLists = {
      ...this.state.subChecklist,
    };
    let newChecklist = {
      ...this.state.subChecklist[i],
      [e.target.name]: e.target.value,
    };
    newAllCheckLists[i] = newChecklist;
    this.setState({
      subChecklist: newAllCheckLists,
    });
  };
  handleImage = img => {
    this.setState({
      checklistImage: img,
    });
  };

  render() {
    const GreenRadio = withStyles({
      root: {
        color: green[400],
        "&$checked": {
          color: green[600],
        },
      },
      checked: {},
    })(props => <Radio color="default" {...props} />);
    const BlueRadio = withStyles({
      root: {
        color: cyan[700],
        "&$checked": {
          color: cyan[700],
        },
      },
      checked: {},
    })(props => <Radio color="default" {...props} />);
    const RedRadio = withStyles({
      root: {
        color: red[400],
        "&$checked": {
          color: red[600],
        },
      },
      checked: {},
    })(props => <Radio color="default" {...props} />);
    return (
      <>
        {this.props.loading ? (
          <Loading loading={true} />
        ) : (
          <div>
            {this.props.notifications && (
              <Notifications notifications={this.props.notifications} />
            )}
            <section className={Style.create__checklist}>
              <form onSubmit={this.saveCheckList}>
                <Typography
                  style={{ fontSize: "1.25rem" }}
                  variant="overline"
                  display="block"
                >
                  Add New Checklist
                </Typography>
                <hr />
                <TextField
                  name="checklistTitle"
                  variant="outlined"
                  required
                  value={this.state.checkListTitle}
                  onChange={this.handleChange}
                  id="checklistTitle"
                  label="Title"
                  type="text"
                  fullWidth
                />
                <br />
                <br />
                <div>
                  <Grid container spacing={2}>
                    <Grid item>
                      <TextField
                        name="projectName"
                        variant="outlined"
                        required
                        value={this.state.projectName}
                        onChange={this.handleChange}
                        label="Project Name"
                        type="text"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        name="location"
                        variant="outlined"
                        required
                        value={this.state.location}
                        onChange={this.handleChange}
                        label="Location"
                        type="text"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <FileBase64
                        multiple={false}
                        className="btn"
                        value={this.state.checklistImage}
                        onDone={file => {
                          // files.forEach(ele => ele.base64);
                          // props.handlePanaroma(file.base64);
                          this.handleImage(file.base64);
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{ fontSize: "1rem", marginLeft: "0.5em" }}
                        variant="overline"
                        display="block"
                      >
                        <strong>Date :</strong> {this.state.createdDate}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <Divider />

                <div>
                  {_.times(this.state.count, index => (
                    <div className="ml-3 mt-4 mb-4" key={index}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          {index + 1} {". "}
                          {this.state.subChecklist[index]["description"]}
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-label="gender"
                          className="ml-2"
                          name="type"
                          value={
                            this.state.subChecklist[index]
                              ? this.state.subChecklist[index]["type"]
                                ? this.state.subChecklist[index]["type"]
                                : ""
                              : ""
                          }
                          // value={this.state.subChecklist[index]["type"]}
                          onChange={e => this.handleRadio(e, index)}
                        >
                          <FormControlLabel
                            value="Ok"
                            control={<GreenRadio />}
                            label="Ok"
                          />
                          <FormControlLabel
                            value="Not Ok"
                            control={<RedRadio />}
                            label="Not ok"
                          />
                          <FormControlLabel
                            value="N.A."
                            control={<BlueRadio />}
                            label="N.A"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  ))}
                </div>

                <br></br>
                <div className="ml-3 mt-2 mb-2">
                  <Grid container spacing={3}>
                    <br></br>
                    <Grid item>
                      <Typography
                        style={{ fontSize: "1rem" }}
                        variant="overline"
                        display="block"
                      >
                        <strong>Submitted By :</strong> {this.state.submittedBy}
                      </Typography>
                    </Grid>
                    <br></br>
                    <Grid item>
                      <Typography
                        style={{ fontSize: "1rem" }}
                        variant="overline"
                        display="block"
                      >
                        <strong>To Be Checked By :</strong>{" "}
                        {this.state.checkedBy}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{ fontSize: "1rem" }}
                        variant="overline"
                        display="block"
                      >
                        <strong>To Be Approved By :</strong>{" "}
                        {this.state.approvedBy}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>

                <Grid container justify="center" spacing={2}>
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      startIcon={<Save />}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                      startIcon={<Close />}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </section>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    checklist: state.checkListReducer,
    notifications: state.notifications,
    defaultChecklist: state.checkListReducer.defaultChecklist,
    loading: state.checkListReducer.loading,
  };
};

export default connect(mapStateToProps, {
  addChecklist,
  // getChecklistTasks,
  logout,
  fetchCheckList,
  getDefaultChecklist,
})(AddChecklist);

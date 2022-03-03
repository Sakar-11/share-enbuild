import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import userRoleOptions from "./userRoles";
// import Autosuggest from "react-autosuggest";

import axios from "axios";
import PropTypes from "prop-types";
import { addProject } from "../../Redux/projectRedux/projectAction";
import Notifications from "react-notification-system-redux";
import Loading from "../../Components/Loading";
import { AddCircleOutline, DeleteOutlined } from "@material-ui/icons";
import Step1 from "./Step1";
import Step2 from "./Step2";
// import Step3 from "./Step3";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));

function NewProject(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(true);

  const [state, setState] = useState({
    projectName: "",
    subProjectName: [],
    projectType: "",
    flatNumber: [],
    floorNumber: [],
    projectDescription: "",
    userNumber: 1,
    numberOfProjects: 1,
    totalUsers: [],
    users: [],
    value: "",
    userSuggestions: [],
  });

  // All the stuff related to material
  const [materialCount, setMaterialCount] = useState(1);
  const [materials, setMaterials] = useState([]);

  // const deleteMaterial = i => {
  //   if (materialCount === 1) {
  //     alert("atleast 1 material is required");
  //     return;
  //   }
  //   var arr = [...materials];
  //   arr.splice(i, 1);
  //   setMaterials(arr);
  //   setMaterialCount(prev => prev - 1);
  //   //
  // };

  // const addMaterial = (event, index) => {
  //   const prev = materials;
  //   prev[index] = {
  //     materialName: event.target.value,
  //   };
  //   //
  //   setMaterials(prev);
  // };

  const [tempUserRoles, setTempUserRoles] = useState([]);
  const [tempUsers, setTempUsers] = useState([]);
  const loading = open && state.users.length === 0;
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const response = await axios.get(
          `${global.config.backendURL}/users/getUsers`
        );

        if (active) {
          setState(prev => ({ ...prev, users: response.data }));
        }
      } catch (error) {}
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setState(prev => ({ ...prev, users: [] }));
    }
  }, [open]);

  const steps = [
    "Project Details",
    "Add Subprojects",
    // "Add Material Details",
    "User Details",
  ];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    console.log(state.projectType);
    setActiveStep(activeStep - 1);
  };

  function addNewProject() {
    setState({
      ...state,
      numberOfProjects: state.numberOfProjects + 1,
    });
  }

  function deleteProject(index) {
    if (state.numberOfProjects === 1) return;
    let newSubProjectName = [...state.subProjectName];
    let newFloorNumber = [...state.floorNumber];
    let newFlatNumber = [...state.flatNumber];
    newSubProjectName.splice(index, 1);
    newFloorNumber.splice(index, 1);
    newFlatNumber.splice(index, 1);
    setState({
      ...state,
      subProjectName: newSubProjectName,
      flatNumber: newFlatNumber,
      floorNumber: newFloorNumber,
      numberOfProjects: state.numberOfProjects - 1,
    });
  }

  const handleReset = () => {
    setState({
      projectName: "",
      subProjectName: [],
      flatNumber: [],
      floorNumber: [],
      projectDescription: "",
      userNumber: 1,
      numberOfProjects: 1,
      totalUsers: [],
      users: [],
    });
    setActiveStep(0);
  };

  const onSubmit = event => {
    event.preventDefault();

    const user = global.config.secureStorage.getItem("user_id");
    const name = global.config.secureStorage.getItem("user_fullname");
    const username = global.config.secureStorage.getItem("username");
    const role = "super_admin";
    const tempUser = { user, name, username, role };
    const tempTotalUsers = state.totalUsers;
    tempTotalUsers.push(tempUser);
    const project = {
      projectName: state.projectName,
      numberOfProjects: state.numberOfProjects,
      projectDescription: state.projectDescription,
      userNumber: state.userNumber,
      totalUsers: tempTotalUsers,
      subProjectName: state.subProjectName,
      flatNumber: state.flatNumber,
      floorNumber: state.floorNumber,
      projectType: state.projectType,
      organization: global.config.secureStorage.getItem("organization"),
      // materials: materials,
    };
    if (state.projectName !== "") props.addProject(project);
    else {
      alert("Please Enter Project name");
    }
  };

  function getStepContent() {
    switch (activeStep) {
      case 0:
        return (
          <Step1
            projectName={state.projectName}
            projectDescription={state.projectDescription}
            handleChange={handleChange}
            handleDropdownChange={handleDropdownChange}
          />
        );
      case 1:
        return (
          <Step2
            addNewProject={addNewProject}
            deleteProject={deleteProject}
            handleSecondStep={handleSecondStep}
            flatNumber={state.flatNumber}
            floorNumber={state.floorNumber}
            subProjectName={state.subProjectName}
            numberOfProjects={state.numberOfProjects}
          />
        );
      // case 2:
      //   return (
      //     <Step3
      //       materialCount={materialCount}
      //       deleteMaterial={deleteMaterial}
      //       setMaterialCount={setMaterialCount}
      //       addMaterial={addMaterial}
      //     />
      //   );
      case 2:
        return (
          <div className="container mt-2">
            <Grid container key={update}>
              {_.times(state.userNumber, index => {
                let tempIndex = index + 1;
                return (
                  <React.Fragment key={index}>
                    <Grid
                      container
                      spacing={2}
                      className="mt-2 mb-1"
                      direction="row"
                      // justify="space-evenly"
                      alignItems="center"
                    >
                      <Grid
                        item
                        xs={12}
                        sm={5}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Autocomplete
                          defaultValue={
                            tempUsers[index] ? tempUsers[index] : null
                          }
                          fullWidth
                          onOpen={() => {
                            setOpen(true);
                            //
                          }}
                          onClose={() => {
                            setOpen(false);
                          }}
                          id="autoComplete"
                          onChange={(event, value) =>
                            handleUsers(event, value, index)
                          }
                          options={state.users}
                          getOptionLabel={option =>
                            option.firstName + " " + option.lastName
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              label={"Select User " + tempIndex}
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Autocomplete
                          defaultValue={
                            tempUserRoles[index] ? tempUserRoles[index] : null
                          }
                          fullWidth
                          name={"userRole" + index}
                          onOpen={() => {
                            setOpen(true);
                          }}
                          onClose={() => {
                            setOpen(false);
                          }}
                          id="autoUser"
                          onChange={(event, value) => {
                            //
                            handleUserRoles(event, value, index);
                          }}
                          onInputChange={(event, value) => {
                            //
                          }}
                          options={userRoleOptions}
                          getOptionLabel={option => option.value}
                          renderInput={params => (
                            <TextField
                              {...params}
                              value={
                                tempUserRoles[index]
                                  ? tempUserRoles[index].value
                                  : undefined
                              }
                              label={"Role of User " + tempIndex}
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                      >
                        <Grid
                          item
                          className="mt-3 mb-2"
                          style={{
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (state.userNumber === 1) {
                              return;
                            }
                            var temp2 = tempUserRoles;
                            temp2.splice(index, 1);
                            setTempUserRoles(temp2);
                            temp2 = tempUsers;
                            temp2.splice(index, 1);
                            setTempUsers(temp2);
                            var temp = state.totalUsers;
                            if (state.totalUsers[index]) {
                              temp.splice(index, 1);
                            }
                            setState(state => {
                              return {
                                ...state,
                                totalUsers: temp,
                                userNumber: state.userNumber - 1,
                              };
                            });
                            console.table(state.totalUsers);
                            setUpdate(!update);
                          }}
                        >
                          <DeleteOutlined />
                          <span>Delete User</span>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <div
                          style={{
                            backgroundColor: "#D0D0D0",
                            height: "0.1px",
                            width: "100%",
                          }}
                        ></div>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                );
              })}
              <Grid className="mt-3" item>
                <Button
                  onClick={() => {
                    setState(state => {
                      return {
                        ...state,
                        userNumber: state.userNumber + 1,
                      };
                    });
                  }}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add new User
                </Button>
              </Grid>
            </Grid>
          </div>
        );
      default:
        return "Unknown StepIndex";
    }
  }

  const handleSecondStep = (event, index) => {
    if (event.target.name === "subProjectName") {
      let newSubProjectName = [...state.subProjectName];
      newSubProjectName[index] = event.target.value;
      setState({
        ...state,
        subProjectName: newSubProjectName,
      });
    } else if (event.target.name === "floorNumber") {
      if (event.target.value < 0) return;
      let newFloorNumber = [...state.floorNumber];
      newFloorNumber[index] = event.target.value;
      setState({
        ...state,
        floorNumber: newFloorNumber,
      });
    } else if (event.target.name === "flatNumber") {
      if (event.target.value < 0) return;
      let newFlatNumber = [...state.flatNumber];
      newFlatNumber[index] = event.target.value;
      setState({
        ...state,
        flatNumber: newFlatNumber,
      });
    }
  };

  const handleChange = event => {
    console.log(event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleDropdownChange = (e, newValue) => {
    if (newValue != null) {
      setState({
        ...state,
        projectType: newValue.value,
      });
    }
  };

  const handleUsers = (event, value, index) => {
    if (!value) return;
    let tempReference = [...state.totalUsers];
    let tempData = {};
    tempData = {
      ...state.totalUsers[index],
      user: value ? value._id : "",
      name: value.firstName + " " + value.lastName,
      username: value.username,
    };
    tempReference[index] = tempData;
    setTempUsers([...tempUsers, value]);
    setState({
      ...state,
      totalUsers: tempReference,
    });
  };

  const handleUserRoles = (event, value, index) => {
    //
    //

    var temp = tempUserRoles;
    temp[index] = value;
    setTempUserRoles(temp);
    let tempReference = [...state.totalUsers];
    let tempData = {};
    tempData = {
      ...state.totalUsers[index],
      role: value.key,
    };
    tempReference[index] = tempData;

    setState({
      ...state,
      totalUsers: tempReference,
    });
  };

  if (props.loading) {
    return <Loading loading={props.loading} />;
  }

  if (props.created) {
    return <Redirect to="/projectList" />;
  }

  return (
    <div className={classes.root}>
      {props.notifications && (
        <Notifications notifications={props.notifications} />
      )}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {props.notifications && (
          <Notifications notifications={props.notifications} />
        )}
        <form onSubmit={onSubmit}>
          {activeStep === steps.length ? (
            <div>
              <div className="d-flex justify-content-center">
                <Typography className={classes.instructions}>
                  All steps are completed
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReset}
                  style={{ margin: "0px 5px" }}
                >
                  Clear
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ margin: "0px 5px" }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: "0px 5px" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {getStepContent()}
              <div className="d-flex justify-content-center mt-4">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

NewProject.propTypes = {
  project: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    project: state.projectReducer,
    notifications: state.notifications,
    created: state.projectReducer.success,
    loading: state.projectReducer.loading,
  };
};

export default connect(mapStateToProps, { addProject })(NewProject);

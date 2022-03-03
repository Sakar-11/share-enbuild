import React, { useState, useEffect } from "react";
import { getUsers } from "../../Redux/projectRedux/projectAction";
import { connect } from "react-redux";
import Loading from "../../Components/Loading";
import userRoleOptions from "../NewProject/userRoles";
import { editUserNotificationUtil } from "../../Redux/projectRedux/projectAction";

import _ from "lodash";
import {
  Button,
  //   Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Notifications from "react-notification-system-redux";

import axios from "axios";
// import Loading from "../../Components/Loading";
import {
  AddCircleOutline,
  DeleteOutlined,
  Add,
  Save,
} from "@material-ui/icons";

function EditUser(props) {
  const [state, setState] = useState({
    userNumber: 1,
    totalUsers: [],
    users: [],
    value: "",
    loadingRoles: true,
  });
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [tempUserRoles, setTempUserRoles] = useState([]);
  const [tempUsers, setTempUsers] = useState([]);
  const loading = open && state.users.length === 0;
  const [update, setUpdate] = useState(true);
  const [mainLoading, setMainLoading] = useState(true);
  const [refreshPage, setRefreshPage] = useState(false);

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

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async (notify = false) => {
    try {
      // fetching directly from backend
      const projectId = global.config.secureStorage.getItem("projectId");
      const responseUsers = await axios.get(
        `${global.config.backendURL}/users/getUsers`
      );

      setState(prev => ({ ...prev, users: responseUsers.data }));
      const res = await axios.get(
        `${global.config.backendURL}/project/getUserRolesByProjectId/${projectId}`
      );
      const temp = res.data.totalUsers;
      var users = temp.map(item => {
        return responseUsers.data.find(newItem => newItem._id === item.user);
      });
      setTempUsers(users);
      //
      var roles = temp.map(item => {
        return userRoleOptions.find(newItem => item.role === newItem.key);
      });
      setTempUserRoles(roles);
      setState(prev => ({
        ...prev,
        totalUsers: res.data.totalUsers,
        userNumber: res.data.userNumber,
      }));
      setMainLoading(false);
      if (notify) {
        props.editUserNotificationUtil(true);
      }
    } catch (err) {
      //
    }
  };

  const onSubmit = async () => {
    const userList = {
      userNumber: state.userNumber,
      totalUsers: state.totalUsers,
    };
    try {
      //
      const projectId = global.config.secureStorage.getItem("projectId");
      //
      setMainLoading(true);
      await axios.post(
        `${global.config.backendURL}/project/editUsers/${projectId}`,
        userList
      );
      loadUser(true);
    } catch (error) {
      props.editUserNotificationUtil(false);
    }
  };

  const handleUsers = (event, value, index) => {
    if (!value) return;
    let tem=[...tempUsers]
    tem[index] = value
    setTempUsers(tem);
    let tempReference = [...state.totalUsers];
    let tempData = {};
    tempData = {
      ...state.totalUsers[index],
      user: value ? value._id : "",
      name: value.firstName + " " + value.lastName,
      username: value.username,
    };
    tempReference[index] = tempData;

    setState({
      ...state,
      totalUsers: tempReference,
    });
  };
  const handleUserRoles = (event, value, index) => {
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

  if (mainLoading) {
    return <Loading loading={mainLoading} />;
  }

  return (
    <div className="container mt-2">
      {props.notifications && (
        <Notifications notifications={props.notifications} />
      )}

      {!mainLoading ? (
        <Grid container>
          {_.times(state.userNumber, index => {
            let tempIndex = index + 1;
            return (
              <React.Fragment key={index}>
                <Grid
                  container
                  spacing={2}
                  className="mt-2 mb-1"
                  direction="row"
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
                      value={tempUsers[index] ? tempUsers[index] : null}
                      fullWidth
                      onOpen={() => {
                        setOpen(true);
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
                      value={tempUserRoles[index] ? tempUserRoles[index] : null}
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
                        // //
                        handleUserRoles(event, value, index);
                      }}
                      onInputChange={(event, value) => {
                        // //
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
                        setRefreshPage(prev => !prev);
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

          {/* Adding new User */}
          <Grid container direction="column" className="mt-3 mb-4">
            <Grid item>
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
            <center>
              <Grid className="mt-4" item>
                <Button onClick={() => onSubmit()} startIcon={<Save />}>
                  Submit
                </Button>
              </Grid>
            </center>
          </Grid>
        </Grid>
      ) : (
        <Loading loading={props.loading} />
      )}
    </div>
  );
}
// }

const mapStateToProps = state => {
  //
  return {
    notifications: state.notifications,
    userRolesLoading: state.projectReducer.userRolesLoading,
    userRoles: state.projectReducer.userRoles,
  };
};

export default connect(mapStateToProps, {
  getUsers,
  editUserNotificationUtil,
})(EditUser);

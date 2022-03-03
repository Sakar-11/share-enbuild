import React, { useState, useEffect } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import Loading from "../../Components/Loading";
import axios from "axios";
import {
  Grid,
  TextField,
  withStyles,
  IconButton,
  Tooltip,
  Typography,
  Snackbar,
  Slide,
  Button,
} from "@material-ui/core";
import {
  CachedOutlined,
  ThumbDown,
  ThumbUp,
  Visibility,
} from "@material-ui/icons";
import { Alert, Autocomplete } from "@material-ui/lab";

function AdminDashboard(props) {
  const [users, setUsers] = useState([]);
  const [updatedusers, setUpdatedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openApproveSuccess, setOpenApproveSuccess] = useState(false);
  const [openRejectSuccess, setOpenRejectSuccess] = useState(false);
  const [openApproveFailure, setOpenApproveFailure] = useState(false);
  const [openRejectFailure, setOpenRejectFailure] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [value, setValue] = useState(null);
  const username = global.config.secureStorage.getItem("username");
  let tempusers = [];

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = (approved, id, organization) => {
    axios
      .put(`${global.config.backendURL}/users/approveAdmin`, {
        id: id,
        approved: approved,
      })
      .then(() => {
        let updatedusers = users;
        let userindex = updatedusers.findIndex(ele => ele.id == id);
        updatedusers.splice(userindex, 1);
        setUsers(updatedusers);
        updatedusers = updatedusers.filter(
          user => user.organization === value.title
        );
        setUpdatedUsers(updatedusers);
        if (updatedusers.length == 0) {
          setUpdatedUsers(users);
          setValue(null);
          let temporganizations = organizations;
          temporganizations = temporganizations.filter(
            org => org.title != organization
          );
          setOrganizations(temporganizations);
        }
        if (approved) {
          setOpenApproveSuccess(true);
        } else {
          setOpenRejectSuccess(true);
        }
      })
      .catch(e => {
        console.log(e);
        if (approved) {
          setOpenApproveFailure(true);
        } else {
          setOpenRejectFailure(true);
        }
      });
  };
  const handleRequests = () => {
    if (value == null) {
      setUpdatedUsers(users);
      return;
    } else {
      let temp = users;
      temp = temp.filter(user => user.organization === value.title);
      setUpdatedUsers(temp);
    }
  };

  const fetchUsers = () => {
    let isMainAdmin = global.config.secureStorage.getItem("main_admin");
    if (isMainAdmin === false) {
      props.history.push("/");
    }
    axios
      .get(`${global.config.backendURL}/users/getUsers`)
      .then(res => {
        res.data.map(user => {
          if (user.requestAdmin === true) {
            const newuser = {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              organization: user.organization,
            };
            tempusers.push(newuser);
          }
        });
        setUsers(tempusers);
        setUpdatedUsers(tempusers);
      })
      .catch(e => console.log(e));
    axios
      .get(`${global.config.backendURL}/users/getOrganizations`)
      .then(res => {
        setOrganizations(res.data);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  const CssTextField = withStyles({
    root: {
      "& .MuiOutlinedInput-root.Mui-disabled": {
        "& fieldset": {
          borderColor: "#2e86ab",
        },
      },
      "& .MuiInputBase-root.Mui-disabled": {
        color: "rgba(0, 0, 0, 0.8)",
      },
    },
  })(TextField);

  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="container">
      <Typography
        className="mt-5 d-flex justify-content-center align-items-center"
        variant="overline"
        color="textSecondary"
        style={{ textAlign: "center", fontSize: "1.5em" }}
      >
        <strong>Admin Status Approval</strong>
      </Typography>
      <Snackbar
        open={openApproveSuccess}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
        onClose={() => setOpenApproveSuccess(false)}
      >
        <Alert
          severity="success"
          onClose={() => setOpenApproveSuccess(false)}
          style={{ borderTop: "5px solid green" }}
        >
          <div style={{ color: "green" }}>
            <strong>Success</strong>
          </div>
          Approval successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openRejectSuccess}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
        onClose={() => setOpenRejectSuccess(false)}
      >
        <Alert
          severity="success"
          onClose={() => setOpenRejectSuccess(false)}
          style={{ borderTop: "5px solid green" }}
        >
          <div style={{ color: "green" }}>
            <strong>Success</strong>
          </div>
          Rejection successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openApproveFailure}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
        onClose={() => setOpenApproveFailure(false)}
      >
        <Alert
          severity="error"
          onClose={() => setOpenApproveFailure(false)}
          style={{ borderTop: "5px solid red" }}
        >
          <div style={{ color: "red" }}>
            <strong>Error</strong>
          </div>
          Error in approval!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openRejectFailure}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
        onClose={() => setOpenRejectFailure(false)}
      >
        <Alert
          severity="error"
          onClose={() => setOpenRejectFailure(false)}
          style={{ borderTop: "5px solid red" }}
        >
          <div style={{ color: "red" }}>
            <strong>Error</strong>
          </div>
          Error in rejection!
        </Alert>
      </Snackbar>
      {users.length === 0 ? (
        <Typography
          className="mt-5 d-flex justify-content-center align-items-center"
          variant="h4"
          color="textSecondary"
          style={{ textAlign: "center", fontSize: "1.5em" }}
        >
          No Pending Requests!
        </Typography>
      ) : (
        <>
          <Grid container justify="center">
            <Grid item>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                options={organizations}
                getOptionLabel={option => option.title}
                style={{
                  width: "220px",
                  marginTop: "1em",
                  marginBottom: "1em",
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Organizations"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Tooltip title="Load Requests">
                <IconButton
                  onClick={() => handleRequests()}
                  color="primary"
                  style={{
                    margin: "1em",
                    marginTop: "0.75em",
                  }}
                >
                  <CachedOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <div
            style={{
              maxHeight: "350px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {updatedusers.map((user, index) => (
              <React.Fragment key={index}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  style={{
                    marginTop: "2em",
                  }}
                >
                  <Grid item lg={3} xs={4}>
                    <CssTextField
                      label="Name"
                      defaultValue={`${user.firstName} ${user.lastName}`}
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid item lg={3} xs={4}>
                    <CssTextField
                      label="Organization"
                      defaultValue={user.organization}
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid item lg={1} xs={2}>
                    <Tooltip title="Approve">
                      <IconButton
                        style={{ color: "#4a934a" }}
                        onClick={() =>
                          handleApprove(true, user.id, user.organization)
                        }
                      >
                        <ThumbUp />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item lg={1} xs={2}>
                    <Tooltip title="Reject">
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          handleApprove(false, user.id, user.organization)
                        }
                      >
                        <ThumbDown />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      <Grid
        container
        justify="center"
        style={{ marginTop: "50px", marginBottom: "25px" }}
      >
        <Link
          to={{
            pathname: "/projectList",
            state: username,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            size="large"
            startIcon={<Visibility />}
          >
            <strong>View Projects</strong>
          </Button>
        </Link>
      </Grid>
    </div>
  );
}

export default withRouter(AdminDashboard);

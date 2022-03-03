import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  makeStyles,
  useMediaQuery,
  useTheme,
  DialogContent,
  DialogContentText,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Snackbar,
  Slide,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { Add as AddIcon, AddCircleOutline, Delete } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProgressCard from "./ProgressCard";
import DailyProgressCards from "./DailyProgressCards";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Alert } from "@material-ui/lab";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
}));

const DailyProgressReport = props => {
  const [dpr, setDpr] = useState({});
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addClicked, setAddClicked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState("");
  const [labor, setLabor] = useState([]);
  const [numberOfLabor, setNumberOfLabor] = useState(1);
  const [clicked, setClicked] = useState(null);
  const [openAddSuccess, setOpenAddSuccess] = useState(false);
  const [openAddFailure, setOpenAddFailure] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getDprData();
  }, []);

  async function getDprData() {
    let projectId = await global.config.secureStorage.getItem("projectId");
    try {
      const res = await axios.post(
        `${global.config.backendURL}/dpr/getAllDpr`,
        {
          projectId: projectId,
        }
      );
      let datesArr = Object.keys(res.data);
      setDates(datesArr);
      setDpr(res.data);
      setLoading(false);
      setDate(new Date());
    } catch (err) {
      console.log(err);
    }
  }

  const handleClick = e => {
    e.preventDefault();
    setAddClicked(true);
  };

  const addButtonHandler = async () => {
    if (activity.trim() === "" || description.trim() === "" || !qty) {
      alert("Please fill all fields");
      return;
    }

    let projectId = await global.config.secureStorage.getItem("projectId");
    const reqBody = {
      date,
      activity,
      work_desc: description,
      quantity_work: qty,
      labor,
      projectId,
    };

    try {
      const res = await axios.post(`${global.config.backendURL}/dpr/addDpr`, {
        ...reqBody,
      });
      setActivity("");
      setDescription("");
      setQty("");
      setLabor([]);
      setNumberOfLabor(1);
      setDate(new Date());
      let tempDates = dates;
      let tempDpr = dpr;
      const dateFound = tempDates.includes(res.data.date);
      if (!dateFound) {
        tempDates.unshift(res.data.date);
      }
      tempDpr[res.data.date]
        ? tempDpr[res.data.date].unshift(res.data.dpr)
        : (tempDpr[res.data.date] = [res.data.dpr]);
      setDates(tempDates);
      setDpr(tempDpr);
      setAddClicked(false);
      setOpenAddSuccess(true);
    } catch (err) {
      console.log(err);
      setOpenAddFailure(true);
    }
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleCardClick = date => setClicked(date);

  const handleBackButtonClick = () => setClicked(null);

  const handleClose = () => setAddClicked(false);

  const handleDelete = ids => {
    let temp_dates = dates;
    let temp_dpr = dpr;
    ids.forEach(id => {
      const index = temp_dpr[clicked].findIndex(elem => elem._id === id);
      if (index >= 0) {
        if (temp_dpr[clicked].length === 1) {
          delete temp_dpr[clicked];
          let date_index = temp_dates.findIndex(elem => elem === clicked);
          temp_dates.splice(date_index, 1);
        } else {
          temp_dpr[clicked].splice(index, 1);
        }
      }
    });
    setDate(temp_dates);
    setDpr(temp_dpr);
  };

  const handleLaborAddCount = () => {
    setNumberOfLabor(numberOfLabor + 1);
  };

  const handleLaborDeleteCount = index => {
    if (numberOfLabor === 1) return;
    let temp = labor;
    temp.splice(index, 1);
    setLabor(temp);
    setNumberOfLabor(numberOfLabor - 1);
  };

  return (
    <>
      <Snackbar
        open={openAddSuccess}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
        onClose={() => setOpenAddSuccess(false)}
      >
        <Alert
          severity="success"
          onClose={() => setOpenAddSuccess(false)}
          style={{ borderTop: "5px solid green" }}
        >
          <div style={{ color: "green" }}>
            <strong>Success</strong>
          </div>
          DPR added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAddFailure}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
        onClose={() => setOpenAddFailure(false)}
      >
        <Alert
          severity="error"
          onClose={() => setOpenAddFailure(false)}
          style={{ borderTop: "5px solid red" }}
        >
          <div style={{ color: "red" }}>
            <strong>Error</strong>
          </div>
          Error while adding DPR!
        </Alert>
      </Snackbar>
      <Dialog
        open={addClicked}
        onClose={handleClose}
        className="mt-5"
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className="mt-2" id="form-dialog-title">
          New Daily Progress Report
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Provide details of DPR</DialogContentText>
          <form onSubmit={addButtonHandler}>
            <TextField
              value={activity}
              margin="dense"
              type="text"
              variant="standard"
              label="Activity"
              fullWidth
              onChange={e => setActivity(e.target.value)}
              required
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="mt-4"
                fullWidth
                disableToolbar
                label="Date"
                format="dd/MM/yyyy"
                margin="none"
                id="date-picker-inline"
                value={date}
                placeholder="Not available"
                onChange={date => {
                  setDate(date);
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              value={description}
              margin="dense"
              type="text"
              variant="standard"
              label="Work Description"
              fullWidth
              onChange={e => setDescription(e.target.value)}
              required
            />
            <TextField
              value={qty}
              margin="dense"
              variant="standard"
              label="Quantity of Work"
              fullWidth
              onChange={e => setQty(e.target.value)}
              required
            />
            {_.times(numberOfLabor, index => {
              let indexValue = index + 1;
              return (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl className="mt-1" fullWidth>
                      <InputLabel id="labor-label">Labor</InputLabel>
                      <Select
                        labelId="labor-label"
                        value={
                          typeof labor[index] === "object" &&
                          labor[index] !== null
                            ? labor[index].labor
                            : ""
                        }
                        onChange={e => {
                          let tempArr = [...labor];
                          if (tempArr[index] && "number" in tempArr[index]) {
                            tempArr[index] = {
                              labor: e.target.value,
                              number: tempArr[index].number,
                            };
                          } else {
                            tempArr[index] = {
                              labor: e.target.value,
                              number: "",
                            };
                          }
                          setLabor(tempArr);
                        }}
                        id="labor"
                      >
                        <MenuItem value={"Mason"}>Mason</MenuItem>
                        <MenuItem value={"Male Coolie"}>Male Coolie</MenuItem>
                        <MenuItem value={"Female Coolie"}>
                          Female Coolie
                        </MenuItem>
                        <MenuItem value={"Carpenter"}>Carpenter</MenuItem>
                        <MenuItem value={"Fitter"}>Fitter</MenuItem>
                        <MenuItem value={"Helper"}>Helper</MenuItem>
                        <MenuItem value={"Plumber"}>Plumber</MenuItem>
                        <MenuItem value={"Electrician"}>Electrician</MenuItem>
                        <MenuItem value={"Dept. Labour Male"}>
                          Dept. Labour Male
                        </MenuItem>
                        <MenuItem value={"Dept. Labour Female"}>
                          Dept. Labour Female
                        </MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={
                        typeof labor[index] === "object" &&
                        labor[index] !== null
                          ? labor[index].number
                          : ""
                      }
                      margin="dense"
                      type="number"
                      variant="standard"
                      label="Number of Laborers"
                      fullWidth
                      onChange={e => {
                        let tempArr = [...labor];
                        if (tempArr[index] && "labor" in tempArr[index]) {
                          tempArr[index] = {
                            number: e.target.value,
                            labor: tempArr[index].labor,
                          };
                        } else {
                          tempArr[index] = {
                            number: e.target.value,
                            labor: "",
                          };
                        }
                        setLabor(tempArr);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="secondary"
                      className="mt-4"
                      onClick={() => handleLaborDeleteCount(index)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
          </form>
          <Button
            variant="outlined"
            className="my-3"
            startIcon={<AddCircleOutline />}
            onClick={handleLaborAddCount}
          >
            Add a Laborer
          </Button>
        </DialogContent>
        <DialogActions style={{ marginBottom: "1.5em", marginRight: "1em" }}>
          <Button onClick={() => setAddClicked(false)} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={addButtonHandler}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {!loading && (
        <>
          {clicked === null ? (
            <div className={classes.root}>
              {Object.keys(dpr).length === 0 ? (
                <>
                  <Grid
                    item
                    container
                    justify="flex-end"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                  >
                    <Button
                      style={{ margin: "1rem 1rem" }}
                      onClick={handleClick}
                      startIcon={<AddIcon />}
                    >
                      Add DPR
                    </Button>
                  </Grid>

                  <Typography
                    className="mt-5 d-flex justify-content-center align-items-center"
                    variant="h4"
                    color="textSecondary"
                    style={{ textAlign: "center" }}
                  >
                    No DPRs Available!
                  </Typography>
                </>
              ) : (
                <>
                  <Grid
                    item
                    container
                    justify="flex-end"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                  >
                    <Button
                      style={{ margin: "1rem 1rem" }}
                      onClick={handleClick}
                      startIcon={<AddIcon />}
                    >
                      Add DPR
                    </Button>
                  </Grid>
                  {dates.map((elem, key) => (
                    <Grid container justify="center" key={key}>
                      <Grid item xs={11} sm={11} md={6} lg={6}>
                        <ProgressCard
                          heading={elem}
                          handleCardClick={handleCardClick}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </>
              )}
            </div>
          ) : (
            <DailyProgressCards
              dprs={dpr[clicked]}
              clicked={clicked}
              handleBackButtonClick={handleBackButtonClick}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}
    </>
  );
};

export default DailyProgressReport;

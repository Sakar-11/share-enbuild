import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Divider,
  Button
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Item = props => {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    if (props.startdate === null) {
      return new Date();
    }
    return props.startdate;
  });
  const [endDate, setEndDate] = useState(() => {
    if (props.enddate === null) {
      return new Date();
    }
    return props.enddate;
  });
  return (
    <Card
      variant="outlined"
      style={{ padding: 20, marginBottom: 15 }}
      elevation={2}
    >
      {/* <CardContent style={{ marginBottom: 5 }}> */}
      <Typography variant="h5">
        <strong>{props.name}</strong>
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        {props.startdate === null && !start ? (
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px"
            }}
            item
          >
            {props.isEditable ? (
              <Button
                variant="outlined"
                onClick={() => {
                  props.handleStartDate(props.index, new Date());
                  setStart(true);
                }}
              >
                Add Start Date
              </Button>
            ) : (
              <Typography>
                <strong>Start Date :</strong> Not available
              </Typography>
            )}
          </Grid>
        ) : (
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "15px"
            }}
            item
          >
            <Typography>
              <strong>Start Date :</strong>
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled={!props.isEditable}
                disableToolbar
                format="dd/MM/yyyy"
                margin="none"
                id="date-picker-inline"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                value={startDate}
                placeholder="Not available"
                onChange={date => {
                  setStartDate(date);
                  props.handleStartDate(props.index, date);
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        )}
        {props.enddate === null && !end ? (
          <Grid
            style={{
              display: "flex",
              flexDirection: "column"
            }}
            item
          >
            {props.isEditable ? (
              <Button
                style={{ marginTop: "11px" }}
                variant="outlined"
                onClick={() => {
                  props.handleEndDate(props.index, new Date());
                  setEnd(true);
                }}
              >
                Add End date
              </Button>
            ) : (
              <Typography>
                <strong>End Date :</strong> Not available
              </Typography>
            )}
          </Grid>
        ) : (
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "15px"
            }}
            item
          >
            <Typography>
              <strong>End Date :</strong>
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                disabled={!props.isEditable}
                format="dd/MM/yyyy"
                minDate={startDate}
                margin="none"
                id="date-picker-inline"
                value={endDate}
                placeholder="Not available"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                onChange={date => {
                  setEndDate(date);
                  props.handleEndDate(props.index, date);
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        )}
      </Grid>
      {/* </CardActions> */}
    </Card>
  );
};

export default Item;

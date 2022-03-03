import React from "react";
import {
  makeStyles,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  withStyles,
  Radio,
  Typography,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  body: {
    fontSize: 10,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    backgroundColor: "#fff",
  },
});

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: orange[400],
    "&$checked": {
      color: orange[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

export default function TaskList(props) {
  return (
    <Grid
      item
      xs={12}
      style={{
        backgroundColor: "#fff",
        padding: "20px 10px",
      }}
    >
      <Typography variant="h4">Task Lists:</Typography>

      {props.tasks !== undefined && props.tasks.length !== 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1.5em",
            backgroundColor: "#ddd",
            padding: "20px 0",
          }}
        >
          <TableContainer
            style={{ backgroundColor: "#fff" }}
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Tasks</StyledTableCell>
                <StyledTableCell align="center">Completed</StyledTableCell>
                <StyledTableCell align="center">In Progress</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Typography align={"center"} variant="h6" align="center">
                      {task}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ padding: 0 }} align="center">
                    <GreenRadio
                      disabled={!props.isEditable}
                      checked={props.checked[index] === "complete"}
                      onChange={event => props.handleChange(event, index)}
                      value="complete"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "C" + index }}
                    />
                  </TableCell>
                  <TableCell style={{ padding: 0 }} align="center">
                    <OrangeRadio
                      disabled={!props.isEditable}
                      checked={props.checked[index] === "progress"}
                      onChange={event => props.handleChange(event, index)}
                      value="progress"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "P" + index }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </div>
      ) : (
        <Typography variant="h5" align="center">
          No Tasks
        </Typography>
      )}

      {/* FORM */}
      <Grid display="flex" direction="row" xs={12} sm={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Add Task"
          variant="outlined"
          value={props.newtask.length !== 0 ? props.newtask : ""}
          onChange={event => props.handleTask(event)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          // startIcon={<Update />}
          onClick={() => {
            props.addTask();
          }}
        >
          Add+
        </Button>
      </Grid>
    </Grid>
  );
}

import React from "react";

import { useTheme } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Grid,
} from "@material-ui/core";

export default function AddTasks(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog open={props.open} fullScreen={fullScreen}>
        <DialogTitle>New {props.isSubTask ? "SubTask" : "Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a new {props.isSubTask ? "SubTask" : "SubTask"}
          </DialogContentText>
          <TextField
            margin="dense"
            id="taskName"
            name={props.isSubTask ? "taskSubName" : "taskName"}
            label="Task Name"
            type="text"
            variant="standard"
            value={props.isSubTask ? props.taskSubName : props.taskName}
            // error={props.alertSubActivity}
            // helperText={props.alertSubActivityField}
            onChange={props.handleTaskChange}
            fullWidth
          />
          {/* <TextField
            margin="dense"
            id="taskQuantity"
            name={props.isSubTask ? "taskSubQuantity" : "taskQuantity"}
            label="Task Quantity"
            type="number"
            variant="standard"
            value={props.isSubTask ? props.taskSubQuantity : props.taskQuantity}
            // error={props.alertSubActivity}
            // helperText={props.alertSubActivityField}
            onChange={props.handleTaskChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="taskUnit"
            name={props.isSubTask ? "taskSubUnit" : "taskUnit"}
            label="Task Unit"
            type="text"
            variant="standard"
            value={props.isSubTask ? props.taskSubUnit : props.taskUnit}
            // error={props.alertSubActivity}
            // helperText={props.alertSubActivityField}
            onChange={props.handleTaskChange}
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleModalOpen} color="secondary">
            Cancel
          </Button>
          {/* <Button onClick={props.submitTask} color="primary"> */}
          <Button
            onClick={props.isSubTask ? props.submitSubTask : props.submitTask}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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

export default function EditSubTask(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog open={props.open} fullScreen={fullScreen}>
        <DialogTitle>Edit SubTask</DialogTitle>
        <DialogContent>
          <DialogContentText>Provide a new SubTask Details</DialogContentText>
          <TextField
            margin="dense"
            id="taskName"
            name="taskSubName"
            label="Task Name"
            type="text"
            variant="standard"
            value={props.taskSubName}
            // error={props.alertSubActivity}
            // helperText={props.alertSubActivityField}
            onChange={props.handleTaskChange}
            fullWidth
          />
          {/* <TextField
            margin="dense"
            id="taskQuantity"
            name="taskSubQuantity"
            label="Task Quantity"
            type="number"
            variant="standard"
            value={props.taskSubQuantity}
            // error={props.alertSubActivity}
            // helperText={props.alertSubActivityField}
            onChange={props.handleTaskChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="taskUnit"
            name="taskSubUnit"
            label="Task Unit"
            type="text"
            variant="standard"
            value={props.taskSubUnit}
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
          <Button onClick={props.submitTask} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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

export default function AddRoadActivity(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog open={props.open} fullScreen={fullScreen}>
        <DialogTitle>New Road Activity Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a new Road Activity Name
          </DialogContentText>
          <TextField
            margin="dense"
            id="roadActivityName"
            name="roadActivityName"
            label="Road Activity Name"
            type="text"
            variant="standard"
            value={props.roadActivityName}
            // error={props.alertSubActivity}
            // helperText={props.alertSubActivityField}
            onChange={props.handleActivityChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleModalRoadOpen} color="secondary">
            Cancel
          </Button>
          {/* <Button onClick={props.submitTask} color="primary"> */}
          <Button
            onClick={
              props.isEditRoadActivity
                ? props.EditRoadActivity
                : props.submitRoadActivity
            }
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

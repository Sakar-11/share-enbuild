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
} from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

export default function AddActivity(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const filter = createFilterOptions();
  return (
    <div>
      <Dialog
        open={props.open}
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a new Activity and new Sub Activity (if necessary)
          </DialogContentText>
          <Autocomplete
            value={props.activityName}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                props.handleAutoComplete(event, newValue);
              } else if (newValue && newValue.inputValue) {
                props.handleAutoComplete(event, newValue.inputValue);
              } else {
                props.handleAutoComplete(event, newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `Add "${params.inputValue}"`,
                });
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={props.data}
            getOptionLabel={option => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }

              return option.title;
            }}
            renderOption={option => option.title}
            className="my-3"
            freeSolo
            fullWidth
            renderInput={params => (
              <TextField
                {...params}
                label="Activity Name"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <TextField
            margin="dense"
            id="subActivityName"
            name="subActivityName"
            label="Sub Activity Name"
            type="text"
            variant="standard"
            error={props.alertSubActivity}
            helperText={props.alertSubActivityField}
            onChange={props.handleActivityChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions style={{ marginBottom: "1.5em", marginRight: "1em" }}>
          <Button onClick={props.handleModalOpen} color="secondary">
            Cancel
          </Button>
          <Button onClick={props.submitActivity} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React from "react";
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
  IconButton
} from "@material-ui/core";
import { Delete, AddCircleOutline } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import _ from "lodash";

export default function AddDefault(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const filter = createFilterOptions();

  let content = [...props.content];

  return (
    <div>
      <Dialog
        className="mt-5"
        open={props.open}
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className="mt-2" id="form-dialog-title">
          New Checklist
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a new Checklist Title and Checklists (if necessary)
          </DialogContentText>
          <Autocomplete
            value={props.checklistTitle}
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
                  title: `Add "${params.inputValue}"`
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
            className="mt-3 mb-2"
            freeSolo
            fullWidth
            renderInput={params => (
              <TextField
                {...params}
                label="Checklist Title"
                variant="outlined"
                fullWidth
                error={props.alertChecklistTitle}
                helperText={
                  props.alertChecklistTitle
                    ? props.alertChecklistTitleField
                    : ""
                }
              />
            )}
          />
          {_.times(props.noOfChecklist, index => {
            let indexValue = index + 1;
            return (
              <React.Fragment key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <TextField
                      margin="dense"
                      label={"Checklist Point " + indexValue}
                      type="text"
                      variant="standard"
                      value={
                        typeof content[index] === "object" &&
                        content[index] !== null
                          ? content[index].description
                          : ""
                      }
                      onChange={event => props.handleContent(event, index)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="secondary"
                      className="mt-2"
                      onClick={() => props.handleChecklistDeleteCount(index)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
          <Button
            onClick={props.handleChecklistAddCount}
            variant="outlined"
            className="my-3"
            startIcon={<AddCircleOutline />}
          >
            Add New Checklist Point
          </Button>
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

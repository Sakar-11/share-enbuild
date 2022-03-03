import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { TextField, Grid, Button } from "@material-ui/core";
import { Save, Cancel } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Style from "./style.module.scss";

const AddToDo = props => {
  return (
    <div>
      <section className={Style.create__plan}>
        <form onSubmit={props.savePlan}>
          <h1 className={Style.add__plan__header}>Add New Plans</h1>
          <TextField
            className="m-1"
            name="planTitle"
            variant="outlined"
            required
            value={props.planTitle}
            onChange={props.handleChange}
            id="planTitle"
            label="Title"
            type="text"
            fullWidth
          />
          <br />
          <br />
          <TextField
            name="planDetail"
            id="planDetail"
            variant="outlined"
            multiline
            rows={4}
            onChange={props.handleChange}
            label="Plan Details"
            fullWidth
            value={props.planDetail}
          />
          <br />
          <br />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              display="block"
              name="deadline"
              id="deadline"
              inputVariant="outlined"
              // format="dd/MM/yyyy"
              margin="normal"
              // required
              label="Deadline"
              minDate={new Date()}
              onChange={props.handleChangeDate}
              value={props.deadline}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>

          <br />
          <br />
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                startIcon={<Save />}
              >
                Add
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={props.toggleCreateNewPlan}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </div>
  );
};
export default AddToDo;

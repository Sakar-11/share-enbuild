import "date-fns";
import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { TextField, Grid, Button } from "@material-ui/core";
import { Save, Cancel } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import axios from "axios";
import Style from "./style.module.scss";

const AddToDo = props => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const loading = open && users.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const projectId = global.config.secureStorage.getItem("projectId");
        const response = await axios.get(
          `${global.config.backendURL}/project/getUsers/${projectId}`
        );
        //
        if (active) {
          setUsers(response.data);
        }
      } catch (err) {}

      //
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setUsers([]);
    }
  }, [open]);

  return (
    <div>
      <section className={Style.create__todo}>
        <form onSubmit={props.saveTodo}>
          <h1 className={Style.add__todo__header}>Add New Tasks</h1>
          <TextField
            className="m-1"
            name="taskTitle"
            variant="outlined"
            required
            value={props.taskTitle}
            onChange={props.handleChange}
            id="taskTitle"
            label="Title"
            type="text"
            fullWidth
          />
          <br />
          <br />
          <TextField
            name="taskDetail"
            id="taskDetails"
            variant="outlined"
            multiline
            rows={4}
            onChange={props.handleChange}
            label="Task Details"
            fullWidth
          />
          <br />
          <br />

          <Autocomplete
            fullWidth
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            id="userName"
            options={users}
            getOptionLabel={option => option.firstName + " " + option.lastName}
            onChange={(event, value) => {
              props.handleChangeUser(event, value);
            }}
            renderInput={params => (
              <TextField
                {...params}
                label={"Select User "}
                variant="outlined"
              />
            )}
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
                "aria-label": "change date"
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
                onClick={props.toggleCreateNewTodo}
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

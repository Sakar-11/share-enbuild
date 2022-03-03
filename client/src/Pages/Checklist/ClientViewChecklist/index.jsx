import React, { useEffect, useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import { makeStyles, Card, CardContent } from "@material-ui/core";
import axios from "axios";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  root: {
    // maxWidth: "40%",
    margin: "0.5em",
    alignSelf: "center",
    padding: "0",
  },
});

export default function CheckboxLabels() {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [toShow, setToShow] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/?_limit=5"
      );
      setTasks(response.data);
      setLoaded(true);
    })();
  }, []);

  const classes = useStyles();

  const handleClick = () => setToShow(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => setSelectedDate(date);

  return (
    <div>
      {loaded ? (
        <div>
          <div className="mb-4">
            <button
              className="btn btn-primary ml-4 mt-3 mr-4 p-2"
              onClick={handleClick}
            >
              Add Checklist
            </button>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                value={selectedDate}
                onChange={handleDateChange}
                style={{ marginLeft: "2em" }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>

          {toShow ? (
            <div>
              {/* </center> */}
              {tasks.map((task, index) => (
                <Card className={classes.root} key={index}>
                  <CardContent style={{ padding: "0px" }}>
                    {/* <FormGroup> */}
                    <CustomCheckbox label={task.title} name="checkedA" />
                    {/* </FormGroup> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Grid

  // CardActions
} from "@material-ui/core";
import {
  Add as AddIcon,
  Close as CloseIcon,
  AddComment as AddCommentIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px",
    padding: "10px"

    // backgroundColor: "#ccc",
  },
  todoCard: {
    padding: "10px !important"
  }
}));

export default function ToDo({
  taskTitle,
  taskDetail,
  userName,
  deadline,
  id,
  deleteTodo,
  isEditable,
  todoRemark,
  addRemark
}) {
  const classes = useStyles();
  var [toggleRemark, setToggleRemark] = useState(false);
  var [remark, setRemark] = useState("");

  return (
    <Card className={classes.root} elevation={3}>
      <CardHeader
        className={classes.todoCard}
        title={`Task - ${taskTitle}`}
        style={{ padding: "0px" }}
        // subheader={`Created At ${date}`}
      />
      <CardContent className={classes.todoCard} style={{ padding: "10px" }}>
        <Typography variant="body1">
          <strong> Description -</strong> {taskDetail}
        </Typography>
        <Typography variant="body1">
          <strong>Assigned To -</strong> {userName}
        </Typography>
        <Typography variant="body1">
          <strong>Deadline -</strong> {deadline}
        </Typography>
        {todoRemark !== undefined ? (
          <Typography>
            <strong>Remark :</strong> {todoRemark}
          </Typography>
        ) : null}
      </CardContent>
      {isEditable && (
        <Button
          color="secondary"
          variant="contained"
          style={{ marginLeft: "0.5em" }}
          onClick={() => deleteTodo(id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
      {!toggleRemark ? (
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "0.5em" }}
          onClick={() => setToggleRemark(true)}
          startIcon={<AddCommentIcon />}
        >
          Remark
        </Button>
      ) : (
        <>
          <CardActions style={{ marginLeft: "5px" }}>
            <Grid container>
              <Grid className="mt-4" item>
                <TextField
                  name="remark"
                  value={remark}
                  variant="outlined"
                  required
                  onChange={e => setRemark(e.target.value)}
                  id="remark"
                  label="Remarks"
                  autoFocus
                />
              </Grid>
              <Grid className="ml-2 mt-4" item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setToggleRemark(false);
                    addRemark(remark, id);
                  }}
                  startIcon={<AddIcon />}
                >
                  Done
                </Button>
              </Grid>
              <Grid className="ml-2 mt-4" item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setToggleRemark(false)}
                  startIcon={<CloseIcon />}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </>
      )}
    </Card>
  );
}

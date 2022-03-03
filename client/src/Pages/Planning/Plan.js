import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
  Button,
  Grid,
  TextField
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Cancel as CancelIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px",
    padding: "5px"
  },
  PlanCard: {
    padding: "10px !important"
  }
}));

export default function Plan(props) {
  var [toggleDelay, setToggleDelay] = useState(false);
  var [reason, setReason] = useState("");
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      elevation={3}
      style={{
        backgroundColor: !props.planCompleted
          ? "white"
          : Date.parse(props.deadline) <=
            Date.parse(
              parseInt(new Date().getMonth()) +
                1 +
                "-" +
                new Date().getDate() +
                "-" +
                new Date().getFullYear()
            )
          ? "rgba(255,0,0,0.45)"
          : "rgba(0,255,0,0.45)"
      }}
    >
      <CardHeader
        className={classes.PlanCard}
        title={`Plan - ${props.planTitle}`}
        style={{ padding: "0px" }}
        subheader={`Created At ${props.createdAt}`}
      />
      <CardContent className={classes.PlanCard} style={{ padding: "10px" }}>
        <Typography variant="body1">
          <strong> Description -</strong> {props.planDetail}
        </Typography>
        <Typography variant="body1">
          <strong>Deadline -</strong> {props.deadline}
        </Typography>
        <Typography>
          <strong>Status -</strong>{" "}
          {props.planCompleted ? "Executed" : "Not Executed"}
        </Typography>

        {props.delayReason !== "" ? (
          <Typography>
            <strong>Reason For Delay :</strong> {props.delayReason}
          </Typography>
        ) : (
          <></>
        )}
      </CardContent>
      {props.isEditable && (
        <>
          {props.show ? (
            !toggleDelay ? (
              <CardActions style={{ marginLeft: "5px" }}>
                <Grid container>
                  <Grid className="mr-4" item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setToggleDelay(true)}
                      startIcon={<AddIcon />}
                    >
                      Add Reason
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            ) : (
              <>
                <CardActions style={{ marginLeft: "5px" }}>
                  <Grid container>
                    <Grid className="mr-4" item>
                      <Typography>
                        <strong>Delay Reason : </strong>{" "}
                      </Typography>
                      <TextField
                        className="m-1"
                        name="reason"
                        variant="outlined"
                        required
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        label="Reason"
                        type="text"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardActions>
                <CardActions style={{ marginLeft: "5px" }}>
                  <Grid container>
                    <Grid className="mr-2" item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setToggleDelay(false);
                          props.editReason(reason, props.id);
                        }}
                        startIcon={<AddIcon />}
                      >
                        Done
                      </Button>
                    </Grid>
                    <Grid className="mr-2" item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setToggleDelay(false)}
                        startIcon={<CancelIcon />}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </>
            )
          ) : (
            <></>
          )}
        </>
      )}
      {props.isEditable && (
        <CardActions style={{ marginLeft: "5px" }}>
          <Grid container>
            <Grid className="mr-2" item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => props.deletePlan(props.id)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Grid>
            <Grid className="mr-2" item>
              {!props.planCompleted ? (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => props.editPlanStatus(props.id)}
                  startIcon={<EditIcon />}
                >
                  Completed
                </Button>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
}

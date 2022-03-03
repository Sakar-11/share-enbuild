import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardActions,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  Toolbar,
} from "@material-ui/core";
import { Info, Check, Close } from "@material-ui/icons";

const DetailsDialog = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  var checklist = props.checklist;
  return (
    <div>
      <Dialog
        open={props.open}
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Toolbar />
          <Typography variant="h5">{props.checklist.checklistTitle}</Typography>
          <DialogContentText>Checklist Details</DialogContentText>
          <Typography>
            <strong>Checklist ID:</strong> {checklist.checklistId}
          </Typography>
          <Typography>
            <strong>Project Name :</strong> {checklist.projectName}
          </Typography>
          <Typography></Typography>
          <Typography>
            <strong>Date Created:</strong>{" "}
            {new Date(checklist.createdDate).toDateString() || "Not available"}
          </Typography>
          <Typography>
            <strong>Image:</strong>
            <img style={{ height: "200px" }} src={checklist.checkListImage} />
          </Typography>
          <hr />
          <Typography>
            <strong>Submitted By:</strong> {checklist.submittedBy}
          </Typography>
          <Typography>
            <strong>To Be Checked By :</strong> {checklist.checkedBy}
          </Typography>
          <Typography>
            <strong>To Be Approved By:</strong> {checklist.approvedBy}
          </Typography>
          <hr />
          <Typography
            variant="h6"
            style={{ fontWeight: 700, marginBottom: "0.5em" }}
          >
            Checklist points:
          </Typography>
          {Object.keys(checklist.subChecklist).map((item, index) => {
            var point = checklist.subChecklist[item];
            var num = index + 1;
            return (
              <Typography key={index}>
                <strong>{num + ". " + point.description}:</strong>{" "}
                {point.type || "Not available"}
              </Typography>
            );
          })}
          <hr />
        </DialogContent>
        <DialogActions style={{ marginBottom: "1.5em", marginRight: "1em" }}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            startIcon={<Close />}
            onClick={props.toggleDialog}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const ChecklistCard = props => {
  //
  var checklist = props.item;
  const [details, setDetails] = useState(false);
  return (
    <Grid item xs={12} sm={8} style={{ margin: "0.75em" }}>
      <DetailsDialog
        open={details}
        toggleDialog={() => setDetails(prev => !prev)}
        checklist={checklist}
      />
      <Card variant="outlined" style={{ padding: "5px" }} elevation={3}>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
            <strong>{checklist.checklistTitle}</strong>
          </Typography>
          <Typography>
            <strong>Checklist ID:</strong> {checklist.checklistId}
          </Typography>
          <Typography>
            <strong>Date of Creation :</strong>{" "}
            {new Date(checklist.createdDate).toDateString() || "Not available"}
          </Typography>
          <Typography>
            <strong>Project Name:</strong> {checklist.projectName}
          </Typography>
          <Typography>
            <strong>Location:</strong> {checklist.location}
          </Typography>
          <Grid container spacing={1} style={{ marginTop: "1em" }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDetails(prev => !prev)}
                startIcon={<Info />}
              >
                View Details
              </Button>
            </Grid>
            <Grid item>
              {props.isCheckVisible && props.checkable && (
                <Button
                  disabled={!props.checkable}
                  startIcon={<Check />}
                  onClick={e => {
                    e.preventDefault();

                    props.approveCheckList(
                      checklist._id,
                      global.config.secureStorage.getItem("subprojectId"),
                      props.subActivity,
                      props.item.type,
                      false
                    );
                  }}
                >
                  Send for approval
                </Button>
              )}
            </Grid>
            <Grid item>
              {props.isApproveVisible && !props.checkable && props.approvable && (
                <Button
                  disabled={!props.approvable}
                  startIcon={<Check />}
                  onClick={e => {
                    e.preventDefault();

                    props.approveCheckList(
                      checklist._id,
                      global.config.secureStorage.getItem("subprojectId"),
                      props.subActivity,
                      props.item.type,
                      true
                    );
                  }}
                >
                  {props.approvable ? "Approve" : "Approved"}
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChecklistCard;

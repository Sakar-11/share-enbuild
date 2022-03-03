import React, { useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PhotoCamera, Check, Delete } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  innerRoot: {
    margin: "10px",
    marginBottom: "20px",
    padding: "10px",
    // backgroundColor: "#ccc",
  },
  issueCard: {
    padding: "5px !important",
    paddingLeft: "10px !important",
    // padding: "10px !important",
  },
}));

export default function OurTable(props) {
  const classes = useStyles();

  const [nonApproved, setNonApproved] = useState(() => {
    var temp = [];

    props.data.forEach(ele => {
      if (ele.status == "Approved") {
        return;
      }
      temp.push({
        ...ele,
        pics: (
          <Button
            color="primary"
            type="button"
            startIcon={<PhotoCamera />}
            onClick={() => {
              props.setImages(ele.images);
              props.handleOpen();
            }}
          >
            View Pictures
          </Button>
        ),
        action: (
          <Button
            color="primary"
            startIcon={<Check />}
            disabled={ele.status == "Approved"}
            onClick={e => {
              e.preventDefault();
              const subprojectId =
                global.config.secureStorage.getItem("subprojectId");

              props.askApproval(ele.issueId, subprojectId, props.type);
            }}
          >
            Approve
          </Button>
        ),
      });
    });
    return temp;
  });

  const [approved, setApproved] = useState(() => {
    var temp = [];

    props.data.forEach(ele => {
      if (ele.status == "pending") {
        return;
      }
      temp.push({
        ...ele,
        pics: (
          <Button
            color="primary"
            type="button"
            startIcon={<PhotoCamera />}
            onClick={() => {
              props.setImages(ele.images);
              props.handleOpen();
            }}
          >
            View Pictures
          </Button>
        ),
        action: (
          <Button
            color="secondary"
            startIcon={<Delete />}
            onClick={e => {
              const subprojectId =
                global.config.secureStorage.getItem("subprojectId");
              props.removeIssue(ele.issueId, subprojectId, props.type);
            }}
          >
            Delete
          </Button>
        ),
      });
    });
    return temp;
  });

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" style={{ marginLeft: "3%" }}>
          Non-Approved Issues
        </Typography>
        <Divider />
        <CardContent>
          {nonApproved.length == 0 && (
            <Grid>
              <Typography variant="h6" color="textSecondary">
                No issues available
              </Typography>
            </Grid>
          )}
          {nonApproved.map((ele, index) => {
            return (
              <Card key={index} className={classes.innerRoot} elevation={3}>
                <CardHeader
                  className={classes.issueCard}
                  title={`Issue Id - ${ele.issueId}`}
                  titleTypographyProps={{ variant: "body1" }}
                  subheader={`Created on: ${ele.date}`}
                />
                <CardContent className={classes.issueCard}>
                  <Grid container item xs={12} className="mb-2">
                    <Grid item xs={12} md={3}>
                      <Typography variant="body2">
                        <strong>Section</strong> - {ele.section}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="body2">
                        <strong>Priority</strong> - {ele.flatNum}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="body2">
                        <strong>Location</strong> - {ele.floorNum}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography variant="body2" wrap="true">
                        <strong>Description</strong> - {ele.description}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} direction="row">
                    <Grid item>{ele.pics}</Grid>
                    {props.isApprovable && <Grid item>{ele.action}</Grid>}
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
        <Typography variant="h5" style={{ marginLeft: "3%" }}>
          Approved Issues
        </Typography>
        <Divider />
        <CardContent>
          {approved.length == 0 && (
            <Grid>
              <Typography variant="h6" color="textSecondary">
                No approved issues available
              </Typography>
            </Grid>
          )}
          {approved.map((ele, index) => {
            return (
              <Card key={index} className={classes.innerRoot} elevation={3}>
                <CardHeader
                  className={classes.issueCard}
                  title={`Issue Id - ${ele.issueId}`}
                  titleTypographyProps={{ variant: "body1" }}
                  subheader={`Created on: ${ele.date}`}
                />
                <CardContent className={classes.issueCard}>
                  <Grid container item xs={12} className="mb-2">
                    <Grid item xs={12} md={3}>
                      <Typography variant="body2">
                        <strong>Section</strong> - {ele.section}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="body2">
                        <strong>Flat Number</strong> - {ele.flatNum}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant="body2">
                        <strong>Floor Number</strong> - {ele.floorNum}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography variant="body2" wrap="true">
                        <strong>Description</strong> - {ele.description}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} direction="row">
                    <Grid item>{ele.pics}</Grid>
                    {props.isApprovable && <Grid item>{ele.action}</Grid>}
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Grid>
    </>
  );
}

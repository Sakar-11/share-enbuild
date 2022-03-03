import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import img1 from "../assets/homepage1.png";
import img2 from "../assets/homepage2.png";
import AOS from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f3f5f8",
    padding: " 3rem 0",
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  gridImageContainer: {
    // padding: "5rem",
  },
  imgFluid: {
    maxWidth: "90%",
    height: "auto",
    boxShadow: "5px 5px 60px #0000001c",
    borderRadius: " 5px",
  },
  heading: {
    "&::after": {
      content: '""',
      display: "block",
      margin: "1.5rem auto 0 auto",
      backgroundColor: "#FFCD11",
      height: "4px",
      width: "70px",
    },
  },
  paragraphTitle: {
    fontSize: "1.5rem",
    color: theme.palette.text.primary,
    textAlign: "left",
    fontWeight: "bold",
  },
  paragraphContent: {
    fontSize: "1.05rem",
    color: theme.palette.text.secondary,
    textAlign: "left",
    // maxWidth: "300px",
    fontWeight: "bold",
  },
  mainGrid: {
    marginBottom: "0.5rem",
  },
  hr: {
    borderStyle: "none",
    borderTopStyle: "dotted",
    borderWidth: "5px",
    borderColor: "grey",
    width: "6%",
    margin: "2rem auto",
  },
}));

export default function Services() {
  const classes = useStyles();
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  });
  return (
    <div className={classes.root}>
      <div style={{ overflow: "hidden" }} data-aos="fade-up">
        <div>
          <Typography
            display="block"
            style={{
              fontSize: "2.25em",
              fontFamily: "Courgette",
              padding: "0.5em",
            }}
          >
            <strong>Features & Services</strong>
          </Typography>
          <hr
            style={{
              width: "75px",
              textAlign: "center",
              height: "3px",
              background: "#2E86AB",
              padding: 0,
              marginTop: 0,
              marginBottom: "2em",
            }}
          />

          <Grid container className={classes.mainGrid}>
            <Grid
              item
              className={classes.gridImageContainer}
              xs={12}
              sm={12}
              md={6}
            >
              <img className={classes.imgFluid} src={img1} alt="screenshot" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <ul style={{ listStyle: "none", marginRight: "2rem" }}>
                <li>
                  <p
                    className={classes.paragraphTitle}
                    style={{ marginTop: "0.75rem" }}
                  >
                    WBS Formatting
                    <p className={classes.paragraphContent}>
                      Each activity laid separately in the app.
                      <br />
                      <Typography style={{ color: "#2E86AB" }}>
                        <strong>
                          Execution, Planning, Purchase, Quality, Safety,
                          Checklist and Reports-Status
                        </strong>
                      </Typography>
                    </p>
                  </p>
                </li>
                <li>
                  <p className={classes.paragraphTitle}>
                    Reporting
                    <p className={classes.paragraphContent}>
                      <ul>
                        <li>Daily task updating(Activity Wise)</li>
                        <li> Checklist Filling(Activity Wise) </li>
                        <li> Updating quality - related issues</li>
                        <li>Updating safety-related issues</li>
                      </ul>
                    </p>
                  </p>
                </li>
                <li>
                  <p className={classes.paragraphTitle}>
                    Store Management Facility
                    <p className={classes.paragraphContent}>
                      <ul>
                        <li>Material Management</li>
                        <li>Requisition Management </li>
                      </ul>
                    </p>
                  </p>
                </li>
                <li>
                  <p className={classes.paragraphTitle}>
                    Communication Management
                    <p className={classes.paragraphContent}>
                      Elimination of communication gap between the site team and
                      the office team.
                    </p>
                  </p>
                </li>
              </ul>
            </Grid>
          </Grid>
        </div>
        <hr className={classes.hr} />

        <Grid container className={classes.mainGrid}>
          <Grid item xs={12} sm={12} md={6}>
            <ul style={{ listStyle: "none" }}>
              <li>
                <p
                  className={classes.paragraphTitle}
                  style={{ marginTop: "0.75rem" }}
                >
                  Execution
                  <p className={classes.paragraphContent}>
                    All construction activities and their status monitoring is
                    taken care in this feature.
                  </p>
                </p>
              </li>
              <li>
                <p className={classes.paragraphTitle}>
                  Quality & Safety
                  <p className={classes.paragraphContent}>
                    Remarks for quality and safety can be updated via. picture
                    format for actual reality.
                  </p>
                </p>
              </li>
              <li>
                <p className={classes.paragraphTitle}>
                  Planning
                  <p className={classes.paragraphContent}>
                    Ratio of actual work to planned work can be precisely
                    calculated.
                  </p>
                </p>
              </li>
              <li>
                <p className={classes.paragraphTitle}>
                  Daily Task (To Do List)
                  <p className={classes.paragraphContent}>
                    Completion of daily tasks is the backbone for every monthly
                    or weekly report. Allotment of daily tasks and updating of
                    the same has never been this simple.
                  </p>
                </p>
              </li>
              <li>
                <p className={classes.paragraphTitle}>
                  Purchase
                  <p className={classes.paragraphContent}>
                    Keeps track of purchase of material and details are
                    displayed across teams.
                  </p>
                </p>
              </li>
            </ul>
          </Grid>

          <Grid
            item
            className={classes.gridImageContainer}
            xs={12}
            sm={12}
            md={6}
          >
            <img
              className={classes.imgFluid}
              src={img2}
              alt="screenshot"
              style={{ marginTop: "2em" }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

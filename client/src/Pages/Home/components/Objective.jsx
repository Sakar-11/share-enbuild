import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import AssessmentIcon from "@material-ui/icons/Assessment";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import AOS from "aos";
import "aos/dist/aos.css";

const Objective = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div style={{ overflow: "hidden", backgroundColor: "#f3f5f8" }}>
      <div style={{ marginTop: 20 }} data-aos={"fade-left"}>
        <div style={{ textAlign: "center", marginBottom: 25 }}>
          <div>
            <Typography
              display="block"
              style={{
                fontSize: "2.25em",
                fontFamily: "Courgette",
                padding: "0.5em",
              }}
            >
              <strong>Our Solution</strong>
            </Typography>
            <hr
              style={{
                width: "75px",
                textAlign: "center",
                height: "3px",
                background: "#2E86AB",
                padding: 0,
                marginTop: 0,
              }}
            />
          </div>
        </div>
        <Grid
          container
          justify="space-evenly"
          style={{ textAlign: "center" }}
          // spacing={6}
        >
          <Grid item>
            <DescriptionIcon fontSize="large" style={{ color: "#2E86AB" }} />
            <br />
            <Typography variant="body1" style={{ marginTop: 15 }}>
              <strong>DOCUMENTATION</strong>
            </Typography>
            <div
              style={{
                maxWidth: 300,
                textAlign: "center",
                marginTop: "1em",
                fontSize: "1.2em",
              }}
            >
              Real time input, tracking, and monitoring on all levels. Result
              oriented input is the solution that we are offering.
            </div>
            <br />
          </Grid>
          <Grid item>
            <AssessmentIcon fontSize="large" style={{ color: "#2E86AB" }} />
            <br />
            <Typography variant="body1" style={{ marginTop: 15 }}>
              <strong>REPORTING</strong>
            </Typography>
            <div
              style={{
                maxWidth: 300,
                textAlign: "center",
                marginTop: "1em",
                fontSize: "1.2em",
              }}
            >
              Option based input, in a predefined structure to auto generate
              percentage based report. Elimination of duplicity to increase the
              efficiency and productivity.
            </div>
            <br />
          </Grid>
          <Grid item>
            <TouchAppIcon fontSize="large" style={{ color: "#2E86AB" }} />
            <br />
            <Typography variant="body1" style={{ marginTop: 15 }}>
              <strong>EASE OF USE</strong>
            </Typography>
            <div
              style={{
                maxWidth: 300,
                textAlign: "center",
                marginTop: "1em",
                fontSize: "1.2em",
              }}
            >
              Application based platform for ease of use and mobility. The
              solution to everything is technology, or in now days smart and
              efficient use of technology.
            </div>
            <br />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Objective;

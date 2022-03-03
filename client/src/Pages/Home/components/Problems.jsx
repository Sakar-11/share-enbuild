import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import AOS from "aos";
import "aos/dist/aos.css";

const Problems = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div style={{ backgroundColor: "#f3f5f8" }}>
      <div style={{ overflow: "hidden" }} data-aos={"fade-right"}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div>
            <Typography
              display="block"
              style={{
                fontSize: "2.25em",
                fontFamily: "Courgette",
                padding: "0.5em",
              }}
            >
              <strong>Problems Faced</strong>
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
        <Grid container justify="space-evenly">
          <Grid item>
            <Typography
              // variant="body1"
              style={{ maxWidth: 500, fontSize: "1.25em" }}
            >
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  <strong>Collection/Arrangement of data</strong> is the biggest
                  problem in the current system of the{" "}
                  <strong>Construction Industry</strong>.
                </li>
              </ul>
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  The amount of <strong>DUPLICITY</strong> and extra hard work
                  that is required for this duty is endless.
                </li>
              </ul>
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  The root cause is the{" "}
                  <strong>LACK OF USE OF TECHNOLOGY</strong>.
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              // variant="body1"
              style={{ maxWidth: 500, fontSize: "1.25em" }}
            >
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  <strong>Data Monitoring</strong> has always been a difficult
                  task for a Site Engineer.
                </li>
              </ul>
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  <strong>Maintaining DPR</strong>, converting it to{" "}
                  <strong>MPR</strong> then summarizing all the inputs to actual{" "}
                  <strong>Work Status Report</strong> has proven to be a very
                  tedious process.
                </li>
              </ul>
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  <strong>Communication Gap</strong> is created while
                  transferring the data from junior level to senior level.
                </li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </div>

      {/* <div>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div>
            <Typography
              variant="overline"
              display="block"
              style={{ fontSize: "1.75em" }}
            >
              <strong>HOW?</strong>
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
        <Grid container justify="space-evenly">
          <Grid item>
            <Typography
              variant="body1"
              style={{ maxWidth: 500, fontSize: "7 em" }}
            >
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  Result oriented input is the solution that we are offering.
                </li>
              </ul>
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  Elimination of duplicity to increase the efficiency and
                  productivity.
                </li>
              </ul>
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  The solution to everything is technology, or in now a days
                  smart and efficient use of technology.
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              style={{ maxWidth: 500, fontSize: "7 em" }}
            >
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  Solution:
                  <br />
                  Real time input,tracking and monitoring on all levels.
                </li>
              </ul>
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  Solution:
                  <br />
                  Option based input, in a predefined structure to auto generate
                  percentage based reports.
                </li>
              </ul>
              <ul>
                <li style={{ listStyleType: "disc", color: "black" }}>
                  Solution:
                  <br />
                  Application based platform for ease of use and mobility.
                </li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </div> */}
    </div>
  );
};
export default Problems;

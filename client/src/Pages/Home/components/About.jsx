import React, { useEffect } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutus from "../assets/team.svg";
import founder from "../assets/founder.PNG";
import business from "../assets/business.PNG";
import development from "../assets/development.PNG";

const useStyles = makeStyles(theme => ({
  imgFluid: {
    alignItems: "center",
  },
}));

const About = () => {
  const classes = useStyles();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div style={{ overflow: "hidden", backgroundColor: "#f3f5f8" }}>
      <div style={{ marginTop: 20, marginBottom: 20 }} data-aos={"fade-left"}>
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
              <strong>About Us</strong>
            </Typography>
            <hr
              style={{
                width: "75px",
                textAlign: "center",
                height: "4px",
                background: "#2E86AB",
                padding: 0,
                marginTop: 0,
              }}
            />
          </div>
        </div>
        <Grid container justify="center">
          <Grid item style={{ alignItems: "center" }}>
            <img
              src={aboutus}
              width="175"
              className={classes.imgFluid}
              alt="screenshot"
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid
            item
            style={{
              textAlign: "center",
              maxWidth: 800,
              margin: "0.5em",
              fontSize: "1.5em",
            }}
          >
            <strong>
              <i>
                We, at Daksh Constructions, are engineers turned entrepreneurs
                who have faced an actual site problem in our carriers, the urge
                to simplify complicated things has always been with us.
              </i>
            </strong>
          </Grid>
        </Grid>
        <Grid container justify="center">
          {/* <Grid
            item
            style={{
              margin: "1.5em",
              fontSize: "1.5em",
            }}
          >
            <img
              style={{
                maxWidth: "275px",
                height: "auto",
                boxShadow: "5px 5px 60px #0000003c",
                borderRadius: " 5px",
                marginBottom: "1em",
              }}
              src={founder}
            />
            <center>
              <strong>Kshitij Tikhe</strong>
            </center>
            <div style={{ color: "#2e86ab", fontSize: "0.9em" }}>
              <strong>
                <center>Founder</center>
              </strong>
            </div>
          </Grid> */}
          <Grid
            item
            style={{
              margin: "1.5em",
              fontSize: "1.5em",
            }}
          >
            <img
              style={{
                maxWidth: "275px",
                height: "auto",
                boxShadow: "5px 5px 60px #0000003c",
                borderRadius: " 5px",
                marginBottom: "1em",
              }}
              src={business}
            />
            <center>
              <strong>BRAND99</strong>
            </center>

            <div style={{ color: "#2e86ab", fontSize: "0.9em" }}>
              <strong>
                <center>Business Operations Team</center>
              </strong>
            </div>
          </Grid>
          <Grid
            item
            style={{
              margin: "1.5em",
              fontSize: "1.5em",
            }}
          >
            <img
              style={{
                maxWidth: "275px",
                height: "auto",
                boxShadow: "5px 5px 60px #0000001c",
                borderRadius: " 5px",
                marginBottom: "1em",
              }}
              src={development}
            />
            <center>
              <strong>SDS, CoEP</strong>
            </center>
            <div style={{ color: "#2e86ab", fontSize: "0.9em" }}>
              <strong>
                <center>App Development and Support</center>
              </strong>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default About;

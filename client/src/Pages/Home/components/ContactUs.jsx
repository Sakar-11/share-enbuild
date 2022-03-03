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
              <strong>Contact Us</strong>
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
        <Grid
          container
          justify="center"
          spacing={2}
          style={{ marginBottom: "2em" }}
        >
          <Grid item style={{ alignItems: "center", fontSize: "1.35em" }}>
            <strong>Contact Number</strong> :{" "}
            <a href="tel:+91 8888840639">+91 8888840639</a>
          </Grid>
          <Grid item style={{ alignItems: "center", fontSize: "1.35em" }}>
            <strong>Email ID</strong> :{" "}
            <a href="mailto:info@enbuild.in">info@enbuild.in</a>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default About;

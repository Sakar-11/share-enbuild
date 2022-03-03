import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";
import Style from "./style.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../Redux/checkListRedux/checklistAction";
const axios = require("axios");

const DetailsChecklist = props => {
  //

  return (
    <>
      <section className={Style.create__material}>
        <Typography
          style={{ fontSize: "1rem" }}
          variant="overline"
          display="block"
        >
          {" "}
          Details:
        </Typography>

        <hr />
        <Typography>
          <strong>Project Name :</strong> Project1
        </Typography>
        <Typography>
          <strong>Location:</strong> Pune
        </Typography>
        <Typography>
          <strong>Date Created:</strong> 28/7/20
        </Typography>
        <hr />
        <Typography>
          <strong>Submitted By:</strong> MANAGER
        </Typography>
        <Typography>
          <strong>To Be Checked By :</strong> STORE MANAGER
        </Typography>
        <Typography>
          <strong>To Be Approved By:</strong> CHIEF ENGINEER
        </Typography>
        <hr />
        <Typography>
          <strong>Point 1:</strong> NA
        </Typography>
        <Typography>
          <strong>Point 2:</strong> NA
        </Typography>
        <Typography>
          <strong>Pont 3:</strong> NA
        </Typography>
        <Typography>
          <strong>Pont 4:</strong> NA
        </Typography>
        <hr />
        <Grid justify="center" container>
          <Grid item>
            <Link to={`/checklist`}>
              <Button color="primary" variant="contained" size="large">
                Close
              </Button>
            </Link>
          </Grid>
        </Grid>
      </section>
    </>
  );
};
export default DetailsChecklist;

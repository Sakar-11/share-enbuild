import React, { Component } from "react";
import Style from "./subproject.module.scss";
import { Card, Typography } from "@material-ui/core";
export default class Subproject extends Component {
  // constructor(props) {
  //   super(props);
  // }

  cardClicked = () => {
    global.config.secureStorage.setItem("subprojectId", this.props.project._id);
    global.config.secureStorage.setItem(
      "subProjectName",
      this.props.project.subProjectName
    );
    const role = global.config.secureStorage.getItem("role");

    if (role === "quality_engineer") {
      this.props.history.push("/checklist/quality");
      return;
    }
    if (role === "safety_engineer") {
      this.props.history.push("/checklist/safety");
      return;
    }
    if (role == "planning_manager") {
      this.props.history.push("/plan");
      return;
    }
    this.props.history.push("/activities");
  };

  render() {
    return (
      <Card className={Style.card} onClick={this.cardClicked}>
        <Typography variant="p" style={{ fontWeight: 700 }} noWrap>
          Sub Project:
        </Typography>
        <Typography
          variant="h5"
          color="primary"
          style={{ fontWeight: 700 }}
          noWrap
        >
          {this.props.project.subProjectName}
        </Typography>
        {/* <div className={Style.project__flat}>
          <Typography
            variant="body2"
            display="inline"
            style={{ fontWeight: 700 }}
          >
            Number of floors:
          </Typography>
          <Typography variant="body2" noWrap display="inline">
            {" "}
            {this.props.project.floorNumber}
          </Typography>
          <br></br>
          <Typography
            variant="body2"
            display="inline"
            style={{ fontWeight: 700 }}
          >
            Number of flats per floor:
          </Typography>
          <Typography variant="body2" noWrap display="inline">
            {" "}
            {this.props.project.flatNumber}
          </Typography>
        </div> */}
      </Card>
    );
  }
}

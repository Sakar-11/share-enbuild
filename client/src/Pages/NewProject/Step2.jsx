import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import _ from "lodash";
import { DeleteOutlined } from "@material-ui/icons";
import { AddCircleOutline } from "@material-ui/icons";

const Step2 = props => {
  return (
    <div className="container mt-2" style={{ marginBottom: "1em" }}>
      {_.times(props.numberOfProjects, i => (
        <React.Fragment key={i}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="subProjectName"
                variant="outlined"
                required
                fullWidth
                value={
                  props.subProjectName.length !== 0
                    ? props.subProjectName[i]
                    : ""
                }
                onChange={event => props.handleSecondStep(event, i)}
                id="projectName"
                label="Subproject Name"
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                name="floorNumber"
                fullWidth
                id="floorNumber"
                onChange={event => props.handleSecondStep(event, i)}
                InputProps={{ inputProps: { min: 0 } }}
                label="No. of Floors"
                value={
                  props.floorNumber.length !== 0 ? props.floorNumber[i] : 0
                }
                type="number"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="flatNumber"
                fullWidth
                id="flatNumber"
                onChange={event => props.handleSecondStep(event, i)}
                InputProps={{ inputProps: { min: 0 } }}
                label="No. of Flats per floor"
                value={props.flatNumber.length !== 0 ? props.flatNumber[i] : 0}
                type="number"
                variant="filled"
              />
            </Grid> */}
          </Grid>
          <div className="my-3">
            <Grid
              direction="row"
              justify="flex-end"
              alignItems="center"
              container
            >
              <div onClick={() => props.deleteProject(i)}>
                <Grid
                  item
                  className="mb-1"
                  style={{ color: "red", cursor: "pointer" }}
                >
                  <DeleteOutlined fontSize="default" />
                  <span>Delete Subproject</span>
                </Grid>
              </div>
              <div
                style={{
                  backgroundColor: "#D0D0D0",
                  height: "0.1px",
                  width: "100%",
                }}
              ></div>
            </Grid>
          </div>
        </React.Fragment>
      ))}
      <div>
        <Grid item style={{ marginLeft: "2px" }}>
          <Button
            onClick={() => props.addNewProject()}
            variant="outlined"
            startIcon={<AddCircleOutline />}
          >
            Add New Subproject
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default Step2;

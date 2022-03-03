import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { Add, Cancel } from "@material-ui/icons";
import FileBase64 from "react-file-base64";

const createIssue = props => {
  return (
    <div>
      <div
        className="container mt-2"
        style={{
          width: `${window.innerWidth < 1000 ? "100%" : "80%"}`,
          margin: "30px auto",
          padding: "20px 20px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          // boxShadow:
          //   "0px 20px 30px rgba(0, 0, 0, 0.1), 0px 8px 8px rgba(0, 0, 0, 0.15),0px 4px 4px rgba(0, 0, 0, 0.5)"
        }}
      >
        <Typography style={{ margin: "10px 0px 20px" }} variant="h4">
          Create New Issue
        </Typography>
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                className="m-1"
                name="Section"
                variant="outlined"
                required
                value={props.section}
                onChange={props.saveIssueSectionToState}
                id="projectName"
                label="Section"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className="m-1"
                name="location"
                variant="outlined"
                required
                value={props.location}
                onChange={props.savelocationToState}
                id="location"
                InputProps={{ inputProps: { min: 0 } }}
                label="Location"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className="m-1"
                name="Activity"
                variant="outlined"
                required
                id="Activity"
                InputProps={{ inputProps: { min: 0 } }}
                label="Activity"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                fullWidth
                className="m-1"
                name="priority"
                variant="outlined"
                required
                value={props.priority}
                onChange={props.savepriorityToState}
                id="priority"
                InputProps={{ inputProps: { min: 0 } }}
                label="Flat Number"
                type="text"
              /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.priority}
                  label="Age"
                  onChange={props.handleDropdownChange}
                >
                  <MenuItem value={"Normal"}>Normal</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="issueDescription"
                label="Description"
                multiline
                placeholder="Issue Description"
                rows={4}
                required
                variant="outlined"
                value={props.desc}
                onChange={props.saveIssueDescriptionToState}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={2}>
                {props.constPics.length === 0 || props.constPics === [] ? (
                  <>
                    <h5>Select one or more Photos</h5>
                  </>
                ) : (
                  props.constPics.map((ele, key) => {
                    return (
                      <Grid item key={key}>
                        <img
                          src={ele.base64}
                          alt={"Contruction" + key.toString()}
                          height="150px"
                        />
                      </Grid>
                    );
                  })
                )}
                <Grid item xs={12}>
                  <FileBase64
                    multiple={true}
                    value={props.const_pics}
                    onDone={files => {
                      files.forEach(ele => ele.base64);
                      props.savePicsToState(files);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              style={{ marginTop: "1em" }}
              spacing={2}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={props.handleSubmit}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={props.toggleCreateNewIssue}
                  startIcon={<Cancel />}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  //
  return {
    loggedIn: state.loginReducer.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(createIssue);

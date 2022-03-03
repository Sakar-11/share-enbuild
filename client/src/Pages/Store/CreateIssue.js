import React, { useState, useEffect } from "react";
// import _ from "lodash";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { addIssue } from "../../Redux/storeRedux/storeAction";
import { connect } from "react-redux";

const CreateIssue = props => {
  
  const [state, setState] = useState({
    projects: [],
    projectNames: [],
    totalProjects: []
  });

  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [sub, setSub] = useState("");
  const [error, setError] = useState("");

  const handleChange = event => {
    setData(event.target.value);
  };

  const handleClick = () => {
    if (props.toShow === true) {
      props.setToShow(false);
    }
  };

  const handleProjects = (value, project) => {
    if (!project || project == null) return;

    setSub(project);
  };

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        var id = global.config.secureStorage.getItem("projectId");
        const response = await axios.get(
          `${global.config.backendURL}/project/getAllSubProjectNames/${id}`
        );
        if (active) {
          setState({
            ...state,
            projects: response.data,
            projectNames: response.data.map(
              project => project["subProjectName"]
            )
          });
        }
      } catch (error) {
        
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const onSubmit = () => {
    if (!data || !sub) {
      setError("Please fill all the fields");
      return;
    }
    if (
      !props.closingBalance ||
      parseInt(props.closingBalance) < parseInt(data)
    ) {
      setError("Not enough quantity available in store");
      return;
    }
    setError("");
    
    props.addIssue(props.id, {
      subProjectName: sub,
      quantity: data,
      date: new Date()
    });
  };

  return (
    <div className="container mt-2 mb-4">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="issueQuantity"
            variant="outlined"
            required
            id="issueQuantity"
            label="Issue Quantity"
            type="number"
            autoFocus
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Autocomplete
            fullWidth
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            id="autoComplete"
            onChange={(event, value) => handleProjects(event, value)}
            options={state.projectNames}
            renderInput={params => (
              <TextField
                {...params}
                label={"Select Project"}
                variant="outlined"
                name="projectName"
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ marginLeft: "0.5em", marginTop: "0em", marginBottom: "0" }}
        >
          <Typography color="error">{error}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            className="m-2"
            onClick={onSubmit}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="secondary"
            className="m-2"
            onClick={handleClick}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  
  return {
    loading: true
  };
};

export default connect(mapStateToProps, { addIssue })(CreateIssue);

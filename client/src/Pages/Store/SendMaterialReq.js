import React, { useState, useEffect } from "react";
// import _ from "lodash";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { addMaterialReq } from "../../Redux/storeRedux/storeAction";
import { connect } from "react-redux";
import SendIcon from "@material-ui/icons/Send";

const SendMaterialReq = props => {
  const [state, setState] = useState({
    projects: [],
    projectNames: [],
    totalProjects: [],
  });

  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [sub, setSub] = useState("");
  const [error, setError] = useState("");

  const handleChange = event => {
    setData(event.target.value);
  };

  const handleClick = () => {
    if (props.toShowReq === true) {
      props.setToShowReq(false);
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
            ),
          });
        }
      } catch (error) {
        console.log("error in sending");
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const onSubmit = () => {
    let quantity = data;
    if (!data || !sub) {
      setError("Please fill all the fields");
      return;
    }
    if (data < 0) {
      quantity = data * -1;
    }
    if (
      !props.closingBalance ||
      parseInt(props.closingBalance) < parseInt(quantity)
    ) {
      setError("Not enough quantity available in store");
      return;
    }
    setError("");
    props.addMaterialReq(props.id, {
      subProjectName: sub,
      quantity: quantity,
      date: new Date(),
    });
  };

  return (
    <div className="container mt-2 mb-4">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="materialReqQuantity"
            variant="outlined"
            required
            id="materialReqId"
            label="Quantity"
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
            justifyContent: "center",
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
            startIcon={<SendIcon />}
            className="m-2"
            onClick={onSubmit}
          >
            Send
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
    loading: true,
  };
};

export default connect(mapStateToProps, { addMaterialReq })(SendMaterialReq);

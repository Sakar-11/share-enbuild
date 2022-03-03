import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, Snackbar, Slide } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MUIDataTable from "mui-datatables";
import axios from "axios";

import { withRouter } from "react-router";
import { Alert } from "@material-ui/lab";

const TableIssues = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState("");

  const columns = [
    {
      name: "section",
      label: "Section",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "priority",
      label: "Priority",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "location",
      label: "Location",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "desc",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    const tempData = [];
    {
      props.data.map(elem => {
        tempData.push({
          section: elem.section,
          priority: elem.priority,
          location: elem.location,
          desc: elem.description,
          status: elem.status,
        });
      });
    }
    const projectId = global.config.secureStorage.getItem("projectId");
    axios
      .get(`${global.config.backendURL}/project/getProjectInfo/${projectId}`)
      .then(res => setProjectName(res.data.projectName))
      .catch(e => console.log(e));
    setData(tempData);
    setLoading(false);
  }, []);
  const subprojectName = global.config.secureStorage.getItem("subProjectName");

  return (
    <>
      {!loading && (
        <>
          <Grid item container justify="center" className="mt-4">
            <Button
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={props.toggleCloseTable}
            >
              Go back
            </Button>
          </Grid>

          <Grid container justify="center">
            <Grid item lg={6}>
              <center style={{ marginTop: "1.5em" }}>
                <Typography variant="overline" style={{ fontSize: "1.45em" }}>
                  <strong>Project: </strong>
                  {projectName}
                </Typography>
                <br />
                <Typography variant="overline" style={{ fontSize: "1.45em" }}>
                  <strong>Sub Project: </strong>
                  {subprojectName}
                </Typography>
              </center>
              <center>
                <button
                  className="btn-warning btn mt-3 mb-3 generatePDF"
                  onClick={() => {
                    window.print();
                  }}
                >
                  Download PDF
                </button>
              </center>
              <div style={{ margin: "0 20px" }} className="mt-4 mb-4">
                <MUIDataTable
                  title={`Issues `}
                  columns={columns}
                  data={data}
                  options={{
                    selectableRows: false,
                    responsive: "simple",
                    pagination: false,
                    download: false,
                    viewColumns: false,
                    filter: false,
                    print: false,
                    search: false,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default withRouter(TableIssues);

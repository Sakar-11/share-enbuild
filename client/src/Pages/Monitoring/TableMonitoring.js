import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, Snackbar, Slide } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MUIDataTable from "mui-datatables";
import axios from "axios";

import { withRouter } from "react-router";
import { Alert } from "@material-ui/lab";

const TableMonitoring = ({ monitoring, toggleCloseTable }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState("");

  const columns = [
    {
      name: "activityName",
      label: "Activity Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "estimatedcompletion",
      label: "Estimated Completion",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "actualcompletion",
      label: "Actual Completion",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "remarks",
      label: "Remarks",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  useEffect(() => {
    const tempData = [];
    {
      monitoring.map(elem => {
        let remark = "-";
        if (elem.remark) {
          remark = elem.remark;
        }
        tempData.push({
          activityName: elem.title,
          estimatedcompletion: elem.estimatedcompletion,
          actualcompletion: elem.actualcompletion,
          remarks: remark,
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
              onClick={toggleCloseTable}
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
                  title={`Montioring Table`}
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
export default withRouter(TableMonitoring);

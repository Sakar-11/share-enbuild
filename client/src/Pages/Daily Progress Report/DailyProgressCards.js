import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Snackbar,
  Slide,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { withRouter } from "react-router";
import { Alert } from "@material-ui/lab";

const DailyProgressCards = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteFailure, setOpenDeleteFailure] = useState(false);
  const [projectName, setProjectName] = useState("");

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const columns = [
    {
      name: "Activity",
      label: "Activity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Work Description",
      label: "Work Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity of Work",
      label: "Quantity of Work",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Labor",
      label: "Labor",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    const tempData = [];
    props.dprs.forEach((elem, id) => {
      let row = [];
      row.push(
        elem.activity,
        elem.work_desc,
        elem.quantity_work,
        <Accordion
          style={{ backgroundColor: "#f5f5f5" }}
          key={id}
          defaultExpanded={true}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Workers</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Labor</TableCell>
                    <TableCell>Number of Laborers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {elem.labor.map((lab, id) => (
                    <TableRow key={id}>
                      <TableCell>{lab.labor}</TableCell>
                      <TableCell>{lab.number}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      );
      tempData.push(row);
    });
    const projectId = global.config.secureStorage.getItem("projectId");
    axios
      .get(`${global.config.backendURL}/project/getProjectInfo/${projectId}`)
      .then(res => setProjectName(res.data.projectName))
      .catch(e => console.log(e));
    setData(tempData);
    setLoading(false);
  }, []); //eslint-disable-line
  const subprojectName = global.config.secureStorage.getItem("subProjectName");
  return (
    <>
      <Snackbar
        open={openDeleteFailure}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
        onClose={() => setOpenDeleteFailure(false)}
      >
        <Alert
          severity="error"
          onClose={() => setOpenDeleteFailure(false)}
          style={{ borderTop: "5px solid red" }}
        >
          <div style={{ color: "red" }}>
            <strong>Error</strong>
          </div>
          Error while deleting DPR!
        </Alert>
      </Snackbar>
      {!loading && (
        <>
          <Grid item container justify="center" className="mt-4">
            <Button
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={props.handleBackButtonClick}
            >
              Go back
            </Button>
          </Grid>
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
          <Grid item container justify="center" className="mt-4">
            <Typography
              variant="overline"
              component="h1"
              gutterBottom
              style={{ fontSize: 20 }}
            >
              {props.clicked}
            </Typography>
          </Grid>
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
          <Grid container justify="center">
            <Grid item lg={6}>
              <div style={{ margin: "0 20px" }} className="mt-4 mb-4">
                <MUIDataTable
                  title={`Daily Progress Report for ${props.clicked}`}
                  data={data}
                  columns={columns}
                  options={{
                    selectableRows: "single",
                    responsive: "simple",
                    pagination: false,
                    download: false,
                    viewColumns: false,
                    filter: false,
                    print: false,
                    onRowsDelete: row_data => {
                      let tempData = data;
                      const ids = row_data.data.map(elem => {
                        tempData.splice(elem.index, 1);
                        return props.dprs[elem.index]._id;
                      });
                      setData(tempData);
                      props.handleDelete(ids);
                      ids.forEach(id => {
                        axios
                          .post(`${global.config.backendURL}/dpr/deleteDpr`, {
                            id: id,
                          })
                          .catch(err => {
                            console.log(err);
                            setOpenDeleteFailure(true);
                          });
                      });
                    },
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

export default withRouter(DailyProgressCards);

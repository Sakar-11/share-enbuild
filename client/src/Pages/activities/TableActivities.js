import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MUIDataTable from "mui-datatables";
import { withRouter } from "react-router";
import axios from "axios";

const TableActivities = props => {
  const [data, setData] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "title",
      label: "Sub Activity Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "floors",
      label: "Floor-Wise Status",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    let tempData = [];
    let temparr = [];
    props.tableData.map(elem => {
      tempData = [];
      elem.subactivities.map((item, i) => {
        let row = [];
        row.push(
          <Accordion
            style={{ backgroundColor: "#f5f5f5" }}
            key={i}
            defaultExpanded={true}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Floor-wise Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Floor</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Flats Completed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.floors.map((lab, id) => (
                      <TableRow key={id}>
                        <TableCell>Floor{++id}</TableCell>
                        <TableCell>{lab.status}%</TableCell>
                        <TableCell>
                          {lab.flats && lab.flats.length != 0
                            ? lab.flats.map(
                                ele => ele && <li>{"Flat " + ele}</li>
                              )
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        );
        tempData.push({ title: item.title, floors: row });
      });
      temparr.push({ title: elem.activity, subactivities: tempData });
    });
    const projectId = global.config.secureStorage.getItem("projectId");
    axios
      .get(`${global.config.backendURL}/project/getProjectInfo/${projectId}`)
      .then(res => setProjectName(res.data.projectName))
      .catch(e => console.log(e));
    setData(temparr);
    setLoading(false);
  }, []); //eslint-disable-line
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
          <Grid container justify="center">
            <Grid item lg={6}>
              {data.map((elem, id) => (
                <div style={{ margin: "0 20px" }} className="mt-4 mb-4">
                  <MUIDataTable
                    title={`Activity: ${elem.title}`}
                    columns={columns}
                    data={elem.subactivities}
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
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default withRouter(TableActivities);

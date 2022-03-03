import React, { useState, useEffect } from "react";

import { useTheme } from "@material-ui/core/styles";
import {
  makeStyles,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  withStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";

import FileBase64 from "react-file-base64";

import IconButton from "@material-ui/core/IconButton";
import { Add as AddIcon, Update, Edit, Delete } from "@material-ui/icons";

import ProgressBar from "../../Components/ProgessBar";
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  box: {
    maxHeight: "80vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary",
      outline: "1px solid slategrey",
    },
  },
  table: {
    minWidth: 150,
  },
  image: {
    maxWidth: "100%",
    padding: "20px",
    "&:hover": {
      padding: "22px",
      // opacity: 0.8,
    },
  },
  btn: {
    padding: 20,
    backgroundColor: "#333",
    color: "#fff",
  },
});

export default function SubTaskTable(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelImageUrl, setModelImageUrl] = useState("");
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleShowDialog = url => {
    setModelImageUrl(url);
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <Dialog
          open={isModalOpen}
          fullScreen={fullScreen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Panaroma Image</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <img
                className={classes.image}
                src={modelImageUrl}
                alt="ss"
                loading="lazy"
              />
            </DialogContentText>
            <DialogActions
              style={{ marginBottom: "1.5em", marginRight: "1em" }}
            >
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                }}
                color="secondary"
              >
                Close
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
      <Accordion expanded={true}>
        <AccordionSummary
          style={{ backgroundColor: "#ddd" }}
          aria-controls="panel1d-content"
        >
          <Grid container alignItems="center">
            <Typography variant="h6">
              {props.subTaskData != null ? props.subTaskData.name : ""}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Button
              className="m-2"
              color="primary"
              onClick={props.handleModalOpen}
              startIcon={<Edit />}
            >
              Edit
            </Button>
            <Button
              className="m-2"
              color="primary"
              onClick={props.updateSubTask}
              startIcon={<Update />}
            >
              Update
            </Button>
          </Grid>
        </AccordionSummary>
        <AccordionDetails style={{ display: "inline" }}>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            style={{ padding: 20 }}
          >
            <Button
              className="m-2"
              color="primary"
              onClick={props.subPercentage}
            >
              -
            </Button>
            <ProgressBar value={props.subTaskPercentage} />
            <Button
              className="m-2"
              color="primary"
              onClick={props.addPercentage}
            >
              +
            </Button>
          </Grid>

          <Divider variant="middle" />
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            style={{
              marginTop: 20,
              padding: 20,
            }}
          >
            {/* <Grid item lg={6}>
              <TableContainer
                style={{ width: "100%", backgroundColor: "#fff" }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" style={{ width: "100%" }}>
                      Quantity
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: "100%" }}>
                      Unit
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={0}>
                    <TableCell style={{ padding: 0 }} align="center">
                      <Typography align={"center"} variant="h6" align="center">
                        {props.subTaskData.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ padding: 0 }} align="center">
                      <Typography align={"center"} variant="h6" align="center">
                        {props.subTaskData.unit}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </TableContainer>
            </Grid> */}
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginTop: 60, padding: 20, backgroundColor: "#3e5c66" }}
          >
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Upload Panaroma:
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  className="m-2"
                  color="primary"
                  // onClick={this.handleModalOpen}
                >
                  <FileBase64
                    multiple={false}
                    className="btn"
                    value={props.subTaskPanaroma}
                    onDone={file => {
                      // files.forEach(ele => ele.base64);
                      props.handlePanaroma(file.base64);
                    }}
                  />
                </Button>
              </Grid>
            </Grid>
            <Grid container sm={4} justify="center">
              <Box className={classes.box}>
                {props.subTaskData && props.subTaskData.panaroma
                  ? props.subTaskData.panaroma.map((imageUrl, imageIndex) => {
                      return (
                        <Grid item style={{ position: "relative" }}>
                          <IconButton
                            aria-label="settings"
                            // onClick={this.handleExpandClick}
                            style={{
                              position: "absolute",
                              right: 10,
                              top: 10,
                              backgroundColor: "red",
                              color: "#fff",
                              padding: 4,
                            }}
                          >
                            <Delete />
                          </IconButton>
                          <img
                            onClick={() => {
                              handleShowDialog(imageUrl);
                            }}
                            className={classes.image}
                            src={imageUrl}
                            alt="ss"
                            loading="lazy"
                          />
                        </Grid>
                      );
                    })
                  : ""}
                {/* <Grid item style={{ position: "relative" }}>
                  <IconButton
                    aria-label="settings"
                    // onClick={this.handleExpandClick}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                      backgroundColor: "red",
                      color: "#fff",
                      padding: 4,
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <img
                    className={classes.image}
                    src={`https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg`}
                    alt="ss"
                    loading="lazy"
                  />
                </Grid>
                <Grid item style={{ position: "relative" }}>
                  <IconButton
                    aria-label="settings"
                    // onClick={this.handleExpandClick}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                      backgroundColor: "red",
                      color: "#fff",
                      padding: 4,
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <img
                    className={classes.image}
                    src={`https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg`}
                    alt="ss"
                    loading="lazy"
                  />
                </Grid>
                <Grid item style={{ position: "relative" }}>
                  <IconButton
                    aria-label="settings"
                    // onClick={this.handleExpandClick}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                      backgroundColor: "red",
                      color: "#fff",
                      padding: 4,
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <img
                    className={classes.image}
                    src={`https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg`}
                    alt="ss"
                    loading="lazy"
                  />
                </Grid> */}
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

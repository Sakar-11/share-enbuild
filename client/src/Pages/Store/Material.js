import React, { useState } from "react";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
  // withStyles,
} from "@material-ui/core";
import { CheckCircleOutline, Edit as EditIcon, Send } from "@material-ui/icons";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HistoryIcon from "@material-ui/icons/History";
//import CircleChecked from '@material-ui/icons/CheckCircleOutline';
// import { green } from "@material-ui/core/colors";
import CreateIssue from "./CreateIssue";
import SendMaterialReq from "./SendMaterialReq";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "5px",
    marginBottom: "15px",
  },
  materialCard: {
    padding: "10px !important",
  },
}));
// const ColorButton = withStyles(theme => ({
//   root: {
//     color: theme.palette.getContrastText(green[700]),
//     backgroundColor: green[700],
//     "&:hover": {
//       backgroundColor: green[900]
//     }
//   }
// }))(Button);

export default function Material({
  materialName,
  materialQuantity,
  materialLimit,
  editMaterial,
  expectedDate,
  openingBalance,
  closingBalance,
  issue,
  deliveredDate,
  issueMaterial,
  materialReq,
  index,
  id,
  isEditable,
}) {
  const [toShow, setToShow] = useState(false);
  const [toShowReq, setToShowReq] = useState(false);

  const createIssue = () => {
    setToShow(true);
  };
  const createMaterialReq = () => {
    setToShowReq(true);
  };

  var props = { border: "3px solid green" };
  if (parseInt(materialLimit) >= parseInt(materialQuantity)) {
    props = { border: "3px solid red" };
  } else {
    props = { border: "3px solid green" };
  }
  const classes = useStyles(props);

  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        backgroundColor:
          deliveredDate === undefined
            ? "white"
            : Date.parse(expectedDate) < Date.parse(deliveredDate)
            ? "rgba(255,0,0,0.9)"
            : "rgba(0,255,0,0.9)",
      }}
    >
      <CardContent>
        <Typography variant="h5">
          <strong>{materialName}</strong>
        </Typography>
        <Typography>
          <strong>Received quantity :</strong>{" "}
          {materialQuantity || "Not available"}
        </Typography>
        <Typography>
          <strong>Opening Balance :</strong> {openingBalance || "Not available"}
        </Typography>
        <Typography>
          <strong>Closing Balance :</strong> {closingBalance || "Not available"}
        </Typography>
      </CardContent>
      {/* Dire Need to change this - will have to employ encryption */}
      <CardActions style={{ marginLeft: "5px" }}>
        <Grid container>
          <Grid className="mr-4" item>
            {isEditable && (
              <Button
                variant="contained"
                color="primary"
                className="m-2"
                onClick={() => editMaterial(materialName, index)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            )}
            {isEditable && (
              <Button
                variant="contained"
                color="secondary"
                className="m-2"
                onClick={() => createIssue(index)}
                startIcon={<AddCircleOutlineIcon />}
              >
                Issue Material
              </Button>
            )}
            {isEditable && (
              <Button
                variant="contained"
                className="m-2"
                onClick={() => issueMaterial(materialName, index)}
                startIcon={<HistoryIcon />}
              >
                Issue History
              </Button>
            )}
            {isEditable && (
              <Button
                variant="contained"
                className="m-2"
                onClick={() => materialReq(materialName, index)}
                startIcon={<CheckCircleOutline />}
              >
                Approve Issues
              </Button>
            )}

            {!isEditable && (
              <Button
                variant="contained"
                color="secondary"
                className="m-2"
                onClick={() => createMaterialReq(index)}
                startIcon={<AddCircleOutlineIcon />}
              >
                Send material requisition
              </Button>
            )}
          </Grid>
        </Grid>
      </CardActions>
      {toShow ? (
        <CreateIssue
          toShow={toShow}
          setToShow={setToShow}
          id={id}
          closingBalance={closingBalance}
        />
      ) : null}

      {toShowReq ? (
        <SendMaterialReq
          toShowReq={toShowReq}
          setToShowReq={setToShowReq}
          id={id}
          closingBalance={closingBalance}
        />
      ) : null}
    </Card>
  );
}

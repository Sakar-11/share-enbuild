import React, { useState } from "react";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  // CardHeader,
  Typography,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Close as CloseIcon,
  AddComment as AddCommentIcon,
} from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "5px",
    marginBottom: "15px",
  },
  materialCard: {
    padding: "10px !important",
  },
}));

export default function Material({
  materialName,
  materialQuantity,
  materialLimit,
  editMaterial,
  id,
  expectedDate,
  deleteMaterial,
  addDeliveryDate,
  showActions,
  deliveredDate,
  addRemark,
  materialRemark,
  isRemark,
  isEditable,
}) {
  var props = { border: "3px solid green" };
  if (parseInt(materialLimit) >= parseInt(materialQuantity)) {
    props = { border: "3px solid red" };
  } else {
    props = { border: "3px solid green" };
  }
  var [toggleRemark, setToggleRemark] = useState(false);
  var [remark, setRemark] = useState("");
  var [toggleDate, setToggleDate] = useState(false);
  var [deliveryDate, setDeliveryDate] = useState(new Date());
  const classes = useStyles(props);
  //
  // alert(1);
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        backgroundColor:
          deliveredDate === undefined
            ? "white"
            : Date.parse(expectedDate) < Date.parse(deliveredDate)
            ? "rgba(255,0,0,0.45)"
            : "rgba(0,255,0,0.45)",
      }}
    >
      <CardContent>
        <Typography variant="h5">
          <strong>{materialName}</strong>
        </Typography>
        <Typography>
          <strong>Quantity :</strong> {materialQuantity}
        </Typography>
        {/* <Typography>
          <strong>Expected Delivery Date :</strong> {materialLimit}
        </Typography> */}
        <Typography>
          <strong>Expected Delivery Date :</strong>{" "}
          {expectedDate !== undefined
            ? expectedDate
                .toString()
                .substring(0, 10)
                .split("-")
                .reverse()
                .join("-")
            : "Not Filled"}
        </Typography>
        {deliveredDate !== undefined ? (
          <Typography>
            <strong>Delivered Date :</strong>{" "}
            {deliveredDate
              .toString()
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("-")}
          </Typography>
        ) : (
          <></>
        )}
        {materialRemark !== undefined ? (
          <Typography>
            <strong>Remark :</strong> {materialRemark}
          </Typography>
        ) : null}
      </CardContent>

      {isEditable && (
        <>
          {!toggleRemark && isRemark && (
            <Button
              variant="contained"
              color="primary"
              style={{
                marginLeft: "1rem",
                marginBottom: ".5rem",
              }}
              onClick={() => setToggleRemark(true)}
              startIcon={<AddCommentIcon />}
            >
              Remark
            </Button>
          )}
          {toggleRemark && (
            <>
              <CardActions style={{ marginLeft: "5px" }}>
                <Grid container>
                  <Grid className="mt-4" item>
                    <Typography>
                      <strong>Add Remarks : </strong>{" "}
                    </Typography>
                    <TextField
                      name="remark"
                      value={remark}
                      variant="outlined"
                      required
                      onChange={e => setRemark(e.target.value)}
                      id="remark"
                      label="Remarks"
                      autoFocus
                    />
                  </Grid>
                  <Grid className="ml-2 mt-4" item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setToggleRemark(false);
                        // addDeliveryDate(deliveryDate, id);
                        addRemark(remark, id);
                      }}
                      startIcon={<AddIcon />}
                    >
                      Done
                    </Button>
                  </Grid>
                  <Grid className="ml-2 mt-4" item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setToggleRemark(false)}
                      startIcon={<CloseIcon />}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </>
          )}
          {showActions ? (
            !toggleDate ? (
              <CardActions style={{ marginLeft: "5px" }}>
                <Grid container>
                  <Grid className="mr-4" item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setToggleDate(true)}
                      startIcon={<AddIcon />}
                    >
                      Add Delivery Date
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            ) : (
              <>
                <CardActions style={{ marginLeft: "5px" }}>
                  <Grid container>
                    <Grid className="mr-4" item>
                      <Typography>
                        <strong>Select Delivery Date : </strong>{" "}
                      </Typography>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            // marginLeft: "30%",
                          }}
                          disableToolbar
                          variant="dialog"
                          format="dd/MM/yyyy"
                          margin="normal"
                          value={deliveryDate}
                          onChange={date => setDeliveryDate(date)}
                          name="expectedDate"
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid className="mr-2" item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setToggleDate(false);
                          addDeliveryDate(deliveryDate, id);
                        }}
                        startIcon={<AddIcon />}
                      >
                        Done
                      </Button>
                    </Grid>
                    <Grid className="mr-2" item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setToggleDate(false)}
                        startIcon={<CloseIcon />}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </>
            )
          ) : null}
        </>
      )}
    </Card>
  );
}

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
  TextField
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Close as CloseIcon,
  AddComment as AddCommentIcon
} from "@material-ui/icons";

export default function Activity({
  editActivity,
  activityName,
  estimatedcompletion,
  actualcompletion,
  index,
  addRemark,
  activityRemark,
  isEditable
}) {
  var [toggleRemark, setToggleRemark] = useState(false);
  var [remark, setRemark] = useState("");
  return (
    <Card variant="outlined" style={{ padding: "5px", marginBottom: "15px" }}>
      <CardContent>
        <Typography variant="h5">
          <strong>{activityName}</strong>
        </Typography>
        <Typography>
          <strong>Estimated Completion:</strong> {estimatedcompletion}
        </Typography>
        <Typography>
          <strong>Actual Completion :</strong>{" "}
          {actualcompletion ? actualcompletion.toFixed(2) : 0.0}%
        </Typography>
        {activityRemark !== undefined ? (
          <Typography>
            <strong>Remark :</strong> {activityRemark}
          </Typography>
        ) : (
          <></>
        )}
        {/* 
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={() => editActivity(activityName, index)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button> */}
        {isEditable && (
          <>
            {!toggleRemark ? (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={() => setToggleRemark(true)}
                startIcon={<AddCommentIcon />}
              >
                Remarks
              </Button>
            ) : (
              <>
                <CardActions style={{ marginLeft: "5px" }}>
                  <Grid container>
                    <Grid className="mt-4" item>
                      {/* <Typography>
                    <strong>Add Remarks : </strong>{" "}
                  </Typography> */}
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
                          addRemark(remark, index);
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
          </>
        )}
      </CardContent>
    </Card>
  );
}

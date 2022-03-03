import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import Style from "./style.module.scss";
import { Update, Cancel } from "@material-ui/icons";

const EditCompletion = ({
  activityName,
  estimatedcompletion,
  actualcompletion,
  handleClick,
  handleChange,
  handleSubmit,
  index
}) => {
  return (
    <>
      <section className={Style.create__activity}>
        <form>
          <Typography
            style={{ fontSize: "1rem" }}
            variant="overline"
            display="block"
          >
            Edit Completion - {activityName}
          </Typography>
          <hr />
          <br />
          <TextField
            name="activityName"
            value={activityName}
            variant="outlined"
            disabled={true}
            required
            fullWidth
            id="activity"
            label="Activity"
          />
          <br />
          <br />
          <TextField
            name="estimatedcompletion"
            value={estimatedcompletion}
            variant="outlined"
            disabled={true}
            required
            fullWidth
            id="estimatedCompletion"
            label="Estimated Completion"
          />
          <br />
          <br />
          <TextField
            name="actualcompletion"
            value={actualcompletion}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            id="actualCompletion"
            label="Actual Completion"
            type="number"
          />
          <br />
          <br />
          <Grid justify="center" container>
            <Grid className="mr-4" item>
              <Button
                startIcon={<Update />}
                variant="contained"
                size="large"
                color="primary"
                onClick={e => handleSubmit(index)}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                startIcon={<Cancel />}
                size="large"
                onClick={handleClick}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </>
  );
};
export default EditCompletion;

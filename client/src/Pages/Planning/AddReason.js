import { Save } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";
import React from "react";

export default function AddReason(props) {
  return (
    <div>
      <form>
        <TextField
          className="m-1"
          name="delayReason"
          variant="outlined"
          required
          value={props.delayReason}
          onChange={props.handleChange}
          id="delayReason"
          label="Reason"
          type="text"
          fullWidth
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={props.saveReason}
          startIcon={<Save />}
        >
          Add
        </Button>
      </form>
    </div>
  );
}

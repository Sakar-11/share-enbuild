import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { updateActivityName } from "../../Redux/activityRedux/activityAction";

export default function EditModal(props) {
  const [value, setValue] = useState(props.value);
  return (
    <Dialog open={props.isOpen} onClose={() => props.setEditOpen(false)}>
      <DialogTitle>Edit Subactivity Name</DialogTitle>
      <DialogContent>
        <TextField
          defaultValue={props.value}
          onChange={e => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            var projectId = global.config.secureStorage.getItem("projectId");
            props.updateActivityName({
              projectId,
              activityIndex: props.index,
              subActivityIndex: props.subIndex,
              title: value,
            });
            props.updateSubActivityNameUI(props.index, props.subIndex, value);
            props.setEditOpen(false);
          }}
        >
          Save
        </Button>
        <Button color="secondary" onClick={() => props.setEditOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

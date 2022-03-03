import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Grid,
  Button,
  FormControlLabel,
  IconButton
} from "@material-ui/core";
import EditModal from "./EditModal";

import { Done, Cancel, Edit } from "@material-ui/icons";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

const EditMainList = props => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editActivityValue, setActivityValue] = useState("");
  const [activityIndex, setActivityIndex] = useState(-1);
  const [subActivityIndex, setSubActivityIndex] = useState(-1);
  return (
    <div style={{ marginTop: "1em" }}>
      <EditModal
        isOpen={isEditOpen}
        setEditOpen={setEditOpen}
        value={editActivityValue}
        index={activityIndex}
        subIndex={subActivityIndex}
        updateActivityName={props.updateActivityName}
        updateSubActivityNameUI={props.updateSubActivityNameUI}
      />
      {props.defaultActivity.map((data, index) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }} key={index}>
            <div style={{ display: "inline-block" }}>
              <Checkbox
                checked={data.visibility}
                onChange={event => {
                  props.updateMainList(event, index);
                }}
                name="check"
                color="primary"
              />
            </div>
            <div style={{ display: "inline-block", flex: 1 }}>
              <Accordion
                className="mb-1"
                TransitionProps={{ unmountOnExit: true }}
                key={index}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon fontSize="large" color="secondary" />
                  }
                  aria-controls={"panelContent" + index}
                  id={"panelHeader" + index}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Typography>{data.title}</Typography>
                    <IconButton
                      style={{ marginRight: "20px" }}
                      onClick={e => {
                        e.stopPropagation();
                        setEditOpen(true);
                        setActivityValue(data.title);
                        setActivityIndex(index);
                        setSubActivityIndex(-1);
                      }}
                    >
                      <Edit color="primary" />
                    </IconButton>
                  </div>
                </AccordionSummary>

                {data.content !== null && data.content[0].link !== "null"
                  ? data.content.map((value, subIndex) => {
                      return (
                        <div key={subIndex}>
                          <hr style={{ padding: "5px", margin: 0 }} />
                          <AccordionDetails
                            style={{
                              paddingLeft: "50px",
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={value.visibility}
                                  onChange={event => {
                                    props.updateSubList(event, index, subIndex);
                                  }}
                                  name="check"
                                  color="primary"
                                />
                              }
                              label={value.subTitle}
                            ></FormControlLabel>
                            <IconButton
                              style={{ marginRight: "20px" }}
                              onClick={() => {
                                setEditOpen(true);
                                setActivityValue(value.subTitle);
                                setActivityIndex(index);
                                setSubActivityIndex(subIndex);
                              }}
                            >
                              <Edit color="primary" />
                            </IconButton>
                          </AccordionDetails>
                        </div>
                      );
                    })
                  : ""}
              </Accordion>
            </div>
          </div>
        );
      })}
      <Grid container spacing={2} className="mt-2 mb-4" justify="center">
        <Grid item>
          <Button startIcon={<Done />} onClick={props.submitActivityList}>
            Done
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            startIcon={<Cancel />}
            onClick={props.changeAct}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditMainList;

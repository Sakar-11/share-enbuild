import React, { useState, useEffect } from "react";
import { InputLabel, TextField, Grid, Button } from "@material-ui/core";
import { Save, Cancel, Add as AddIcon } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Style from "./style.module.scss";
import { isInteger } from "lodash";

const AddMaterial = props => {
  const [open, setOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [toggleText, setToggleText] = useState(false);
  const loading = open && materials.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }
    var tempMaterials = new Set();
    (() => {
      props.storeData.map(ele => {
        return tempMaterials.add(ele.materialName);
      });
      setMaterials(Array.from(tempMaterials));
    })();
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setMaterials([]);
    }
  }, [open]);

  return (
    <div>
      <section className={Style.create__material}>
        <form onSubmit={props.saveMaterial}>
          <h1 className={Style.add__material__header}>Create New Material</h1>
          {toggleText ? (
            <>
              <Grid container>
                <Grid item md={8} xs={12}>
                  <TextField
                    name="materialName"
                    value={props.materialName}
                    variant="outlined"
                    required
                    fullWidth
                    onChange={props.handleChange}
                    id="materialName"
                    label="Material Name"
                    autoFocus
                  />
                </Grid>
                <Grid
                  item
                  className="m-2 align-content-xs-center justify-xs-center"
                >
                  <Button
                    color="primary"
                    size="large"
                    onClick={() => setToggleText(false)}
                    startIcon={<AddIcon />}
                  >
                    Select Existing
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <Autocomplete
                  // fullWidth
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  id="autoComplete"
                  name="materialName"
                  onChange={(event, value) => props.handleChange(event, value)}
                  options={materials}
                  getOptionLabel={ele => ele}
                  renderInput={params => (
                    <TextField
                      {...params}
                      fullWidth
                      label={"Select Material"}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              {/* <Grid
                item
                className="m-2 align-content-xs-center justify-xs-center"
              >
                <Button
                  color="primary"
                  size="large"
                  onClick={() => setToggleText(true)}
                  startIcon={<AddIcon />}
                >
                  Add New Material
                </Button>
              </Grid> */}
            </Grid>
          )}
          <br />
          {/* change this later */}
          <TextField
            name="materialQuantity"
            id="materialQuantity"
            variant="outlined"
            onChange={event => {
              if (isInteger(parseInt(event.target.value))) {
                props.handleChange(event);
              }
            }}
            label="Quantity"
            value={props.materialQuantity}
            type="number"
            required
            fullWidth
          />
          <br />
          <br />
          <InputLabel>Expected Delivery By</InputLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              disableToolbar
              variant="dialog"
              format="dd/MM/yyyy"
              margin="normal"
              value={
                props.expectedDate === undefined ? null : props.expectedDate
              }
              onChange={props.handleExpectedDate}
              name="expectedDate"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <br />
          <Grid justify="center" container>
            <Grid className="mr-4" item>
              <Button
                variant="contained"
                size="large"
                type="submit"
                startIcon={<Save />}
              >
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                size="large"
                onClick={props.toggleCreateNewMaterial}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </div>
  );
};
export default AddMaterial;

import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import Style from "./style.module.scss";
import { Update, Cancel } from "@material-ui/icons";

const ModifyMaterial = props => {
  // 
  return (
    <>
      <section className={Style.modify__material}>
        <form>
          <h1 className={Style.add__material__header}>Edit Material Details</h1>
          <TextField
            name="materialName"
            value={props.materialName}
            variant="outlined"
            required
            fullWidth
            onChange={props.handleChange}
            id="materialName"
            label="Material Name"
          />
          <br />
          <br />
          <TextField
            name="materialQuantity"
            value={props.materialQuantity}
            variant="outlined"
            required
            fullWidth
            onChange={props.handleChange}
            id="materialQuantity"
            label="Quantity"
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
                onClick={props.updateMaterial}
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
                onClick={props.toggleModifyMaterialComponent}
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
export default ModifyMaterial;

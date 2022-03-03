import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import Style from "./style.module.scss";
import { Update, Cancel } from "@material-ui/icons";
// import { getMaterial, updateStore } from "../../Redux/storeRedux/storeAction";

// import { connect } from "react-redux";
const ModifyMaterial = props => {
  return (
    <>
      <section className={Style.create__material}>
        <form>
          <Typography
            style={{ fontSize: "1rem" }}
            variant="overline"
            display="block"
          >
            Edit Material - {props.materialName}
          </Typography>
          <hr />
          <br />
          <TextField
            name="materialName"
            value={props.materialName}
            variant="outlined"
            disabled={true}
            required
            fullWidth
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
            onChange={event => props.handleChange(event, props.index)}
            id="materialQuantity"
            label="Quantity"
            type="number"
          />
          <br />
          <br />
          <TextField
            name="openingBalance"
            variant="outlined"
            required
            fullWidth
            value={props.openingBalance}
            onChange={event => props.handleChange(event, props.index)}
            id="openingBalance"
            label="Opening Balance"
            type="number"
          />
          <br />
          <br />
          <TextField
            name="closingBalance"
            variant="outlined"
            required
            fullWidth
            value={props.closingBalance}
            onChange={event => props.handleChange(event, props.index)}
            id="closingBalance"
            label="Closing Balance"
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
                onClick={e => props.updateStore(e, props.index)}
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
                onClick={props.cancelButtonUtil}
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

import React from "react";
import { Grid, TextField, Button, IconButton } from "@material-ui/core";
import _ from "lodash";
import { Delete, AddCircleOutline } from "@material-ui/icons";

const Step3 = props => {
  return (
    <div className="container mt-2" style={{ marginBottom: "1em" }}>
      <Grid container spacing={2} style={{ padding: "10px" }}>
        {_.times(props.materialCount, i => (
          <Grid container style={{ padding: "10px" }} direction="row" key={i}>
            <Grid item xs={10}>
              <TextField
                name="materialname"
                variant="outlined"
                required
                fullWidth
                id="materialName"
                onChange={e => props.addMaterial(e, i)}
                label={`Material name ${i + 1}`}
                autoFocus
              />
            </Grid>
            <Grid>
              <IconButton
                color="secondary"
                onClick={() => props.deleteMaterial(i)}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item style={{ marginLeft: "2px" }}>
          <Button
            onClick={() => props.setMaterialCount(prev => prev + 1)}
            variant="outlined"
            startIcon={<AddCircleOutline />}
          >
            Add New Material
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step3;

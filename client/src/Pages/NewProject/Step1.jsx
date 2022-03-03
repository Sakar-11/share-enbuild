import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
const Step1 = props => {
  const filter = createFilterOptions();
  return (
    <div className="container mt-2">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="projectName"
            variant="outlined"
            required
            fullWidth
            value={props.projectName}
            onChange={props.handleChange}
            id="projectName"
            label="Project Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="projectDescription"
            label="Location"
            multiline
            placeholder="Project Location"
            rows={4}
            variant="outlined"
            value={props.projectDescription}
            onChange={props.handleChange}
          />
        </Grid>

        <Grid item>
          {/* <TextField
            id="outlined-select-currency-native"
            select
            label="Type of Project"
            name="projectType"
            value={props.projectType}
            onChange={props.handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {Types.map(option => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </TextField> */}
          <Autocomplete
            style={{ width: 200 }}
            value={props.projectType}
            options={[
              { id: 1, value: "Building Works" },
              { id: 2, value: "Infrastructure" },
            ]}
            getOptionSelected={(option, value) => option.value === value.value}
            onChange={props.handleDropdownChange}
            getOptionLabel={option => option.value}
            renderInput={params => (
              <TextField
                {...params}
                name="projectType"
                label="Project Type"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Step1;

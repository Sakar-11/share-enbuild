import React, { useState } from "react";
import { withStyles, Checkbox, FormControlLabel } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const CustomCheckbox = withStyles({
  root: {
    color: deepOrange[400],
    "&$checked": {
      color: deepOrange[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const CheckboxMain = props => {
  const [checked, setChecked] = useState(false);

  const handleChange = event => {
    setChecked(!checked);
  };

  return (
    <div>
      <FormControlLabel
        checked={checked}
        onChange={handleChange}
        style={{ marginLeft: "0.3em" }}
        control={<CustomCheckbox {...props} />}
        label={props.label}
      />
    </div>
  );
};

export default CheckboxMain;

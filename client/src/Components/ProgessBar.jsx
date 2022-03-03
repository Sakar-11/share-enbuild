import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Box, LinearProgress } from "@material-ui/core";

const styles = {
  LinerProgressColor: {
    backgroundColor: "red",
  },
};
const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    width: "100%",
    backgroundColor: "gray",
    borderRadius: "7px",
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "primary",
  },
})(LinearProgress);
export default function ProgressBar(props) {
  let value = props.value;
  return (
    <Box position="relative" display="inline-flex" style={{ width: "50%" }}>
      <BorderLinearProgress
        color="primary"
        variant="determinate"
        value={value}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <WhiteTextTypography variant="body2">{`${value}%`}</WhiteTextTypography>
      </Box>
    </Box>
  );
}

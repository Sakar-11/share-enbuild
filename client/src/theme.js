import { createMuiTheme } from "@material-ui/core";

//Blue and Red "#2E86AB" & "#F24236"

var primary = "#2E86AB";
var secondary = "#F24236";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    }
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "primary"
    },
    MuiTextField: {
      variant: "outlined"
    },
    MuiCard: {
      elevation: 2
    }
  }
});

export default theme;

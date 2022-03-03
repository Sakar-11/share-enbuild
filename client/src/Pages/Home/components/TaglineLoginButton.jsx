import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function TaglineLoginButton(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="overline"
              align="center"
              color="textPrimary"
              style={{
                fontSize: "3em",
                fontFamily: "Averia Serif Libre",
                textShadow: "1.5px 1.5px 2px #808080",
              }}
              gutterBottom
            >
              <strong>ENBUILD</strong>
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#2e86ab" }}
              paragraph
            >
              <strong>
                <i>A real time project tracker</i>
              </strong>
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              <strong>
                One-of-a-kind solution to track your work status on your
                fingertips
              </strong>
            </Typography>
            {!props.loggedIn && (
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link href="./login">
                      <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{
                          height: "50px",
                          width: "150px",
                          fontSize: "1.2em",
                        }}
                      >
                        <strong>LOGIN</strong>
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            )}
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
  };
};

export default connect(mapStateToProps)(TaglineLoginButton);

import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    height: 50,
    marginBottom: 10,
    display: "grid",
    alignItems: "center",
  },
});

const ProgressCard = props => {
  const styles = useStyles();
  return (
    <>
      <Paper className={styles.card}>
        <button
          style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "inherit",
          }}
          onClick={() => props.handleCardClick(props.heading)}
        >
          <Typography style={{ paddingLeft: 10 }}>{props.heading}</Typography>
        </button>
      </Paper>
    </>
  );
};

export default ProgressCard;

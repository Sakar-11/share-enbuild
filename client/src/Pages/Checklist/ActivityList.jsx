import React from "react";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ActivityList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.iterList && props.iterList.length !== 0 ? (
        props.iterList.map((data, index) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              to={`/checklist/${props.path}/${data.title}`}
              key={index}
            >
              <Accordion className="my-2">
                <AccordionSummary
                  aria-controls={"panelContent" + index}
                  id={"panelHeader" + index}
                >
                  <Typography className={classes.heading}>
                    {data.title}
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </Link>
          );
        })
      ) : (
        <Typography
          className="mt-5 d-flex justify-content-center align-items-center"
          variant="h4"
          color="textSecondary"
          style={{ textAlign: "center" }}
        >
          No Checklists Available !
        </Typography>
      )}
    </div>
  );
}

import React from "react";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: "1rem",
    marginTop: "1em",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function MainList(props) {
  const classes = useStyles();
  const checkEmpty = subActivity => {
    let temp = subActivity.filter(
      eachSubActivity => eachSubActivity.visibility === true
    );
    if (temp.length === 0) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div className={classes.root}>
        {props.defaultActivity &&
          props.defaultActivity.map((data, index) => {
            if (data.visibility) {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div style={{ display: "inline-block", flex: 1 }}>
                    <Accordion
                      className="mb-1"
                      TransitionProps={{ unmountOnExit: true }}
                      key={index}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon fontSize="large" color="secondary" />
                        }
                        aria-controls={"panelContent" + index}
                        id={"panelHeader" + index}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography className={classes.heading}>
                            {data.title}
                          </Typography>
                          <Typography
                            style={{ marginLeft: "20px" }}
                            color="textSecondary"
                          >
                            {props.percentage[index] !== undefined &&
                            props.percentage[index] !== null
                              ? props.percentage[index].toFixed(2) //add toFixed
                              : "0.00"}
                            %
                          </Typography>
                        </div>
                      </AccordionSummary>
                      {data.content !== null
                        ? data.content.map((value, subIndex) => {
                            if (value.visibility) {
                              return (
                                <div key={subIndex}>
                                  <hr style={{ padding: "5px", margin: 0 }} />
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={{
                                      state: {
                                        roadActivityIndex:
                                          props.activeActivityIndex,
                                      },
                                      pathname: `/activities/${data.activity}/${value.link}`,
                                    }}
                                  >
                                    <AccordionDetails
                                      style={{ paddingLeft: "50px" }}
                                    >
                                      {value.subTitle}
                                    </AccordionDetails>
                                  </Link>
                                </div>
                              );
                            }
                          })
                        : ""}

                      {data.content !== null && checkEmpty(data.content) ? (
                        <div>
                          <hr style={{ padding: "5px", margin: 0 }} />
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/activities/${data.activity}/null`}
                          >
                            <AccordionDetails style={{ paddingLeft: "50px" }}>
                              {"Update Here"}
                            </AccordionDetails>
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </Accordion>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
}

export default MainList;

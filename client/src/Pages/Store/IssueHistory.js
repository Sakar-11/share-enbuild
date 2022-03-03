import React, { useEffect,useState } from "react";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";
import Style from "./style.module.scss";
import { Cancel } from "@material-ui/icons";
import { connect } from "react-redux";
import { getIssues,addIssue} from "../../Redux/storeRedux/storeAction";
import Loading from "../../Components/Loading";
const IssueHistory = props => {



  useEffect(() => {
    
    props.getIssues(props.id);
  }, []);

  if (props.loading) {
    return <Loading loading={true}></Loading>;
  }

  return (
    <>
      <section className={Style.create__material}>
        <Typography
          style={{ fontSize: "1rem" }}
          variant="overline"
          display="block"
        >
          {" "}
          Issue History - {props.materialName}{" "}
        </Typography>

        <hr />

        {props.issueHistory.map((item, index) => {
          return (
            <div key={index}>
              <Typography>
                <strong>Quantity :</strong> {item.quantity}
              </Typography>
              <Typography>
                <strong>Subproject issued to :</strong> {item.subProjectName}
              </Typography>
              <Typography>
                <strong>Issue date :</strong>{" "}
                {new Date(item.date.toString()).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Issue time :</strong>{" "}
                {new Date(item.date.toString()).toLocaleTimeString()}
              </Typography>
         
              <hr />
            </div>
          );
        })}

        {props.issueHistory.length == 0 && (
          <Typography
            style={{ marginBottom: "2em", textAlign: "center" }}
            variant="h5"
            display="block"
          >
            No issue history available!
          </Typography>
        )}
        <Grid justify="center" container>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<Cancel />}
              size="large"
              onClick={props.toggleIssueMaterialComponent}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </section>
    </>
  );
};
const mapStateToProps = state => {
  // 
  return {
    loading: state.storeReducer.issueLoading,
    issueHistory: state.storeReducer.issueHistory
  };
};
export default connect(mapStateToProps, { getIssues,addIssue })(IssueHistory);

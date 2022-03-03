import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";
import Style from "./style.module.scss";
import { Cancel, Close } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  getMaterialReqIssues,
  approveMaterialReq,
  rejectMaterialReq,
} from "../../Redux/storeRedux/storeAction";
import Loading from "../../Components/Loading";
import { Add as AddIcon } from "@material-ui/icons";

const ApproveIssue = props => {
  //

  useEffect(() => {
    props.getMaterialReqIssues(props.id);
  }, []);

  if (props.loading) {
    return <Loading loading={true}></Loading>;
  }

  const onSubmit = (quan, sub, id) => {
    props.approveMaterialReq(props.id, {
      subProjectName: sub,
      quantity: quan,
      date: new Date(),
      id,
    });
    props.toggleMaterialReqComponent();
  };

  const onRejectSubmit = (quan, sub, id) => {
    props.rejectMaterialReq(props.id, {
      subProjectName: sub,
      quantity: quan,
      date: new Date(),
      id,
    });
    props.toggleMaterialReqComponent();
  };

  return (
    <>
      <section className={Style.create__material}>
        <Typography
          style={{ fontSize: "1rem" }}
          variant="overline"
          display="block"
        >
          {" "}
          Pending Approvals - {props.materialName}{" "}
        </Typography>

        <hr />

        {props.materialReqIssues.map((item, index) => {
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
              <Grid container>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className="m-2"
                    onClick={() =>
                      onSubmit(item.quantity, item.subProjectName, item.id)
                    }
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<Close />}
                    className="m-2"
                    color="secondary"
                    onClick={() =>
                      onRejectSubmit(
                        item.quantity,
                        item.subProjectName,
                        item.id
                      )
                    }
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>

              <hr />
            </div>
          );
        })}

        {props.materialReqIssues.length === 0 && (
          <Typography
            style={{ marginBottom: "2em", textAlign: "center" }}
            variant="h5"
            display="block"
          >
            No pending approvals!
          </Typography>
        )}
        <Grid justify="center" container>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<Cancel />}
              size="large"
              onClick={props.toggleMaterialReqComponent}
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
    loading: state.storeReducer.materialReqLoading,
    materialReqIssues: state.storeReducer.materialReqIssues,
  };
};
export default connect(mapStateToProps, {
  getMaterialReqIssues,
  approveMaterialReq,
  rejectMaterialReq,
})(ApproveIssue);

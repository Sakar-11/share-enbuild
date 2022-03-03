import React, { Component } from "react";
import { AddCircleOutline, Delete } from "@material-ui/icons";
import { Grid, TextField, Button, IconButton } from "@material-ui/core";
import _ from "lodash";
import Notifications from "react-notification-system-redux";
// import { addMaterialList } from "../../Redux/projectRedux/projectAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DisplayMaterial from "./DisplayMaterial";
import { addMaterialList } from "../../Redux/storeRedux/storeAction";

class AddMaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materialCount: 1,
      materials: []
      // isAdded: false,
    };
  }
  refreshPage = () => {
    window.location.reload(false);
    // this.setState({
    //   isAdded: false,
    // });
  };

  deleteMaterial = i => {
    if (this.state.materialCount === 1) {
      alert("atleast 1 material is required");
      return;
    }
    var arr = [...this.state.materials];
    arr.splice(i, 1);
    this.setState({
      materials: arr,
      materialCount: this.state.materialCount - 1
    });
  };

  addMaterial = (event, index) => {
    const prev = this.state.materials;
    prev[index] = {
      materialName: event.target.value
    };
    this.setState({
      materials: prev
    });
  };
  //   Check once if it works
  setMaterialCount = () => {
    this.setState({
      materialCount: this.state.materialCount + 1
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const materialsList = this.state.materials;
    this.setState({
      materialCount: 1,
      material: []
      // isAdded: true,
    });
    //
    this.props.addMaterialList(materialsList);
    e.target.reset();
    // this.refreshPage();
  };
  render() {
    return (
      <div>
        {this.props.notifications && (
          <Notifications notifications={this.props.notifications} />
        )}
        {/* {this.state.isAdded ? this.refreshPage() : null} */}

        <div className="container mt-2" style={{ marginBottom: "1em" }}>
          <form onSubmit={this.onSubmit}>
            <Grid container spacing={2} style={{ padding: "10px" }}>
              {/* <h3 className="mt-5 mb-4">Add Materials</h3> */}
              {_.times(this.state.materialCount, i => (
                <Grid
                  container
                  style={{ padding: "10px", marginTop: "10px" }}
                  direction="row"
                  key={i}
                >
                  <Grid item xs={10}>
                    <TextField
                      name="materialName"
                      variant="outlined"
                      required
                      fullWidth
                      id="materialName"
                      onChange={e => this.addMaterial(e, i)}
                      label={`Material name ${i + 1}`}
                      autoFocus
                    />
                  </Grid>
                  <Grid>
                    <IconButton
                      color="secondary"
                      onClick={() => this.deleteMaterial(i)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item style={{ marginLeft: "2px" }}>
                <Button
                  onClick={() => this.setMaterialCount()}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add New Material
                </Button>
              </Grid>
              <Grid item style={{ marginLeft: "4px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: "0px 5px" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <hr />
        <DisplayMaterial />
      </div>
    );
  }
}
AddMaterialList.propTypes = {
  materials: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    materials: state.storeReducer,
    notifications: state.notifications,
    addMaterialsLoading: state.storeReducer.materialListLoading,
    addMaterialsFailure: state.storeReducer.materialListFailure,
    addMaterialsSuccess: state.storeReducer.materialListSuccess
  };
};
export default connect(mapStateToProps, { addMaterialList })(AddMaterialList);

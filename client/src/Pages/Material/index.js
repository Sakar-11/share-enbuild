import React, { Component } from "react";
import { Button, CardHeader, Typography, Grid } from "@material-ui/core";
import Loading from "../../Components/Loading";
import Material from "./Material";
import AddMaterial from "./AddMaterial";
import ModifyMaterial from "./ModifyMaterial";
// import { blue } from "@material-ui/core/colors";
import { Add } from "@material-ui/icons";
import Style from "./style.module.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
  addDeliveryDate,
  getStore,
} from "../../Redux/materialRedux/materialAction";
import Notifications from "react-notification-system-redux";
// import Typography from "material-ui/styles/typography";
// import { each } from "lodash";

class Display extends Component {
  constructor(props) {
    super(props);
    const role = global.config.secureStorage.getItem("role");
    const editRoles = ["purchase_manager", "project_manager", "super_admin"];
    const isEditable = editRoles.find(item => item == role) ? true : false;
    this.state = {
      materialName: "",
      materialLimit: "",
      materialQuantity: "",
      editMaterialId: "",
      allMaterials: [],
      storeData: [],
      isCreateNewMaterial: false,
      isModifyMaterial: false,
      isEditable: isEditable,
    };
  }
  async componentDidMount() {
    await this.props.getMaterial();
    await this.props.getStore();
    if (!this.props.loading) {
      this.setState({
        allMaterials: this.props.material.data,
        storeData: this.props.material.storeData,
      });
    }
  }
  handleChange = (event, value = null) => {
    if (value === null) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
      this.setState({
        materialName: value,
      });
    }
  };
  handleExpectedDate = date => {
    this.setState({
      expectedDate: date,
    });
  };
  handleDeliveryDate = (date, id) => {
    if (date === undefined) {
      alert("How about putting a date Dude ? ");
      return;
    }
    const newMaterials = this.state.allMaterials.map(eachMaterial => {
      if (eachMaterial.materialID === id) {
        const change = {
          ...eachMaterial,
          deliveryDate: date,
        };
        this.props.addDeliveryDate(id, change);
        return change;
      }
      return eachMaterial;
    });
    this.setState({
      allMaterials: newMaterials,
    });
  };
  toggleCreateNewMaterial = () => {
    this.setState({
      materialName: "",
      materialQuantity: "",
      materialLimit: "",
      isCreateNewMaterial: !this.state.isCreateNewMaterial,
    });
  };
  toggleModifyMaterialComponent = () => {
    this.setState({
      isModifyMaterial: !this.state.isModifyMaterial,
    });
  };
  editMaterial = id => {
    this.setState({
      editMaterialId: id,
    });
    const Material = this.state.allMaterials.find(Material => {
      return Material.materialID === id;
    });
    this.setState({
      materialName: Material.materialName,
      materialQuantity: Material.materialQuantity,
      materialLimit: Material.materialLimit,
      isModifyMaterial: !this.state.isModifyMaterial,
    });
  };

  removeMaterial = id => {
    const requiredMaterial = this.state.allMaterials.find(eachMaterial => {
      return eachMaterial.materialID === id;
    });
    this.props.deleteMaterial(requiredMaterial._id);
    const newMaterials = this.state.allMaterials.filter(
      eachMaterial => eachMaterial.materialID !== id
    );
    this.setState({
      allMaterials: newMaterials,
    });
  };

  updateMaterial = event => {
    event.preventDefault();
    const newMaterials = this.state.allMaterials.map(eachMaterial => {
      if (eachMaterial.materialID === this.state.editMaterialId) {
        const change = {
          ...eachMaterial,
          materialName: this.state.materialName || eachMaterial.materialName,
          materialQuantity:
            this.state.materialQuantity || eachMaterial.materialQuantity,
          materialLimit: this.state.materialLimit || eachMaterial.materialLimit,
        };
        this.props.updateMaterial(eachMaterial.materialID, change);
        return change;
      }
      return eachMaterial;
    });
    this.setState({
      allMaterials: newMaterials,
      isModifyMaterial: !this.state.isModifyMaterial,
    });
  };
  handleRemark = async (remark, id) => {
    //
    const newMaterials = this.state.allMaterials.map(eachMaterial => {
      if (eachMaterial.materialID === id) {
        const change = {
          ...eachMaterial,
          remark: remark,
        };
        this.props.updateMaterial(eachMaterial.materialID, change);
        return change;
      }
      return eachMaterial;
    });
    //
    this.setState({
      allMaterials: newMaterials,
    });
  };
  saveMaterial = event => {
    event.preventDefault();
    const id = Date.now();
    if (
      this.state.expectedDate === undefined ||
      this.state.materialQuantity === undefined ||
      this.state.materialName === undefined
    ) {
      alert("Please fill all fields");
      return;
    }
    const finalMaterial = {
      materialName: this.state.materialName,
      materialQuantity: this.state.materialQuantity,
      // materialLimit: this.state.materialLimit,
      expectedDate: this.state.expectedDate,
      materialID: id,
    };

    let newMaterials = [...this.state.allMaterials, finalMaterial];

    this.setState({
      materialName: "",
      materialQuantity: "",
      materialLimit: "",
      allMaterials: newMaterials,
      isCreateNewMaterial: !this.state.isCreateNewMaterial,
    });
    this.props.addMaterial(finalMaterial);
  };
  render() {
    const { isCreateNewMaterial, isModifyMaterial } = this.state;
    if (isCreateNewMaterial) {
      return (
        <AddMaterial
          storeData={this.props.storeData}
          handleChange={this.handleChange}
          materialName={this.state.materialName}
          materialQuantity={this.state.materialQuantity}
          handleExpectedDate={this.handleExpectedDate}
          expectedDate={this.state.expectedDate}
          materialLimit={this.state.materialLimit}
          saveMaterial={this.saveMaterial}
          toggleCreateNewMaterial={this.toggleCreateNewMaterial}
        />
      );
    } else if (isModifyMaterial) {
      return (
        <ModifyMaterial
          materialName={this.state.materialName}
          materialQuantity={this.state.materialQuantity}
          materialLimit={this.state.materialLimit}
          updateMaterial={this.updateMaterial}
          handleChange={this.handleChange}
          toggleModifyMaterialComponent={this.toggleModifyMaterialComponent}
        />
      );
    }
    return (
      <div>
        {this.props.notifications && (
          <Notifications notifications={this.props.notifications} />
        )}
        {this.state.isEditable && (
          <section className={Style.button__display}>
            <Button
              onClick={this.toggleCreateNewMaterial}
              startIcon={<Add />}
              size="large"
            >
              Add Material
            </Button>
          </section>
        )}
        {this.props.loading ? (
          <Loading loading={this.props.loading} />
        ) : !this.props.loading && !this.props.data.length ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "80vh",
            }}
          >
            <Typography
              variant="h4"
              color="textSecondary"
              style={{ marginLeft: "0.5em", textAlign: "center" }}
            >
              No Materials Found!
            </Typography>
          </div>
        ) : (
          <>
            <div>
              <CardHeader
                title="Pending Orders"
                subheader="Material in repository"
              />

              <section className={Style.all__material}>
                {this.props.data.filter(item => item.deliveryDate === undefined)
                  .length === 0 && (
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    style={{ marginLeft: "0.5em" }}
                  >
                    No Pending Orders available
                  </Typography>
                )}
                {this.props.data.map((eachMaterial, index) => {
                  return eachMaterial.deliveryDate === undefined ? (
                    <div key={index}>
                      <Material
                        isEditable={this.state.isEditable}
                        id={eachMaterial.materialID}
                        materialName={eachMaterial.materialName}
                        materialQuantity={eachMaterial.materialQuantity}
                        // materialLimit={eachMaterial.materialLimit}
                        showActions={true}
                        expectedDate={eachMaterial.expectedDate}
                        editMaterial={this.editMaterial}
                        addDeliveryDate={this.handleDeliveryDate}
                        deleteMaterial={this.removeMaterial}
                        materialRemark={eachMaterial.remark}
                        addRemark={this.handleRemark}
                        isRemark={true}
                      />
                    </div>
                  ) : (
                    <div key={index}></div>
                  );
                })}
              </section>
            </div>
            {/* Important : Change this to purchase manager role when that role is  added and replace the not statement here with === to prevent unauthorised access to this section*/}

            <div>
              <CardHeader
                title="Delivered Orders"
                subheader="Material in repository"
              />
              <section className={Style.all__material}>
                {this.props.data.filter(item => item.deliveryDate !== undefined)
                  .length === 0 && (
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    style={{ marginLeft: "0.5em" }}
                  >
                    No delivered Orders available
                  </Typography>
                )}
                {this.props.data.map((eachMaterial, index) => {
                  return eachMaterial.deliveryDate !== undefined ? (
                    <div key={index}>
                      <Material
                        isEditable={this.state.isEditable}
                        id={eachMaterial.materialID}
                        deliveredDate={eachMaterial.deliveryDate}
                        materialName={eachMaterial.materialName}
                        materialQuantity={eachMaterial.materialQuantity}
                        expectedDate={eachMaterial.expectedDate}
                        editMaterial={this.editMaterial}
                        addDeliveryDate={this.handleDeliveryDate}
                        deleteMaterial={this.removeMaterial}
                        materialRemark={eachMaterial.remark}
                        addRemark={this.handleRemark}
                        isRemark={false}
                      />
                    </div>
                  ) : (
                    <div key={index}></div>
                  );
                })}
              </section>
            </div>
          </>
        )}
      </div>
    );
  }
}

Display.propTypes = {
  material: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  //
  return {
    material: state.materialReducer,
    notifications: state.notifications,
    success: state.materialReducer.success,
    loading: state.materialReducer.loading,
    data: state.materialReducer.data,
    storeData: state.materialReducer.storeData,
  };
};

export default connect(mapStateToProps, {
  addMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
  addDeliveryDate,
  getStore,
})(Display);

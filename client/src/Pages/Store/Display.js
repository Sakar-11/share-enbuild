import React, { Component } from "react";
import { CardHeader } from "@material-ui/core";
import Loading from "../../Components/Loading";
import Material from "./Material";
import ModifyMaterial from "./ModifyMaterial";
import IssueHistory from "./IssueHistory";
import ApproveIssue from "./ApproveIssue";
import Style from "./style.module.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addMaterial,
  getStore,
  deleteMaterial,
  addDeliveryDate,
  updateStore
} from "../../Redux/storeRedux/storeAction";
import Notifications from "react-notification-system-redux";


class Store extends Component {
  constructor(props) {
    super(props);
    const editRoles = ["store_manager", "super_admin"];
    const role = global.config.secureStorage.getItem("role");
    const isEditable = editRoles.find(item => item == role) ? true : false;
    this.state = {
      materialName: "",
      materialLimit: "",
      materialQuantity: "",
      openingBalance: "",
      closingBalance: "",
      editMaterialId: "",
      allMaterials: [],
      isCreateNewMaterial: false,
      isModifyMaterial: false,
      isIssueMaterial: false,
      isMaterialReq:false,
      isApproveIssue : false,
      isEditable: isEditable,
      isDataFetched: false,
      index: -1,
      issueId: "",
      materialReqId:""
    };
  }
  async componentDidMount() {
    this.props.getStore();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleModifyMaterialComponent = () => {
    this.setState({
      isModifyMaterial: !this.state.isModifyMaterial
    });
  };

  cancelButtonUtil = () => {
    this.setState({
      isModifyMaterial: !this.state.isModifyMaterial,
      materialName: "",
      materialLimit: "",
      materialQuantity: "",
      openingBalance: "",
      closingBalance: "",
      editMaterialId: "",
      index: -1
    });
  };

  toggleIssueMaterialComponent = () => {
    this.setState({
      isIssueMaterial: !this.state.isIssueMaterial
    });
  };

  toggleMaterialReqComponent = () => {
    this.setState({
      isMaterialReq: !this.state.isMaterialReq
    });
  };

  editMaterial = (name, index) => {
    this.setState({
      editMaterialName: name
    });
    const Material = this.props.storeData[index];
    this.setState({
      index: index,
      materialName: Material.materialName,
      materialQuantity: Material.materialQuantity,
      openingBalance: Material.openingBalance,
      closingBalance: Material.closingBalance,
      isModifyMaterial: !this.state.isModifyMaterial
    });
  };

  issueMaterial = (name, index) => {
    this.setState({
      editMaterialName: name
    });
    const Material = this.props.storeData[index];
    this.setState({
      issueId: Material._id,
      materialName: Material.materialName,

      isIssueMaterial: !this.state.isIssueMaterial
    });
  };

  materialReq = (name, index) => {
    this.setState({
      editMaterialName: name
    });
    const Material = this.props.storeData[index];
    this.setState({
      materialReqId: Material._id,
      materialName: Material.materialName,

      isMaterialReq: !this.state.isMaterialReq
    });
  };



  
  /*deleteMaterialReqIssues = id => {

    const requiredMaterialReq = this.props.storeData[0].materialReqIssues.splice(id,1);
    console.log(this.props.storeData[0].materialReqIssues);
    this.props.deleteMaterialReq(requiredMaterialReq.id);
  };*/



  updateStore = (event, index) => {
    event.preventDefault();
    const id = this.props.storeData[index]._id;

    var prev = {
      _id: id,
      openingBalance: this.state.openingBalance,
      closingBalance: this.state.closingBalance,
      materialName: this.state.materialName,
      materialQuantity: this.state.materialQuantity,
      projectId: this.props.storeData[index].projectId
    };

    this.props.updateStore(prev);
    this.setState({
      isModifyMaterial: !this.state.isModifyMaterial
    });
  };



  render() {
    const { isModifyMaterial } = this.state;
    if (isModifyMaterial) {
      return (
        <ModifyMaterial
          index={this.state.index}
          materialName={this.state.materialName}
          materialQuantity={this.state.materialQuantity}
          openingBalance={this.state.openingBalance}
          issue={this.state.issue}
          closingBalance={this.state.closingBalance}
          updateStore={this.updateStore}
          handleChange={this.handleChange}
          cancelButtonUtil={this.cancelButtonUtil}
        />
      );
    }
    const { isIssueMaterial } = this.state;
    if (isIssueMaterial) {
      //
      return (
        <IssueHistory
          id={this.state.issueId}
          materialName={this.state.materialName}
          toggleIssueMaterialComponent={this.toggleIssueMaterialComponent}
        />
      );
    }
    const {isMaterialReq} = this.state;
    if(isMaterialReq){
      return(
        <ApproveIssue
        id={this.state.materialReqId}
        materialName={this.state.materialName}
        materialQuantity = {this.state.materialQuantity}
        toggleMaterialReqComponent={this.toggleMaterialReqComponent}
        ></ApproveIssue>
      )
    }

    return (
      <div>
        {this.props.notifications && (
          <Notifications notifications={this.props.notifications} />
        )}
        {this.props.loading ? (
          <Loading loading={this.props.loading} />
        ) : !this.props.loading && this.props.storeData.length === 0 ? (
          <section className={Style.no__material}>
            <h1>Nothing in Store</h1>
            <br />
            <br />
          </section>
        ) : (
          <>
            <div>
              <section className={Style.all__material}>
                {this.props.storeData.map((eachMaterial, index) => {
                  return (
                    <div key={index}>
                      <Material
                        isEditable={this.state.isEditable}
                        id={eachMaterial._id}
                        index={index}
                        materialName={eachMaterial.materialName}
                        materialQuantity={eachMaterial.materialQuantity}
                        showActions={true}
                        editMaterial={this.editMaterial}
                        issueMaterial={this.issueMaterial}
                        materialReq = {this.materialReq}
                        deleteMaterialReqIssues = {this.deleteMaterialReqIssues}
                        deleteMaterial={this.removeMaterial}
                        openingBalance={eachMaterial.openingBalance}
                        closingBalance={eachMaterial.closingBalance}
                      />
                    </div>
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

Store.propTypes = {
  material: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    storeData: state.storeReducer.storeData,
    notifications: state.notifications,
    success: state.storeReducer.getStoreSuccess,
    loading: state.storeReducer.getStoreLoading
  };
};

export default connect(mapStateToProps, {
  addMaterial,
  getStore,
  updateStore,
  deleteMaterial,
  addDeliveryDate
})(Store);

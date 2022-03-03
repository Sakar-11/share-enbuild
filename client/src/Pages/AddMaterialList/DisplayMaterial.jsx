import React, { Component } from "react";
import { getStore } from "../../Redux/storeRedux/storeAction";

import { connect } from "react-redux";
import { CardContent, Typography, Grid, Card } from "@material-ui/core";
import _ from "lodash";
import Loading from "../../Components/Loading";

class DisplayMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
    };
  }
  async componentDidMount() {
    await this.props.getStore();
    if (!this.props.getStoreLoading) {
      console.log(this.props.storeData);
      this.setState({
        store: this.props.storeData,
      });
    }
  }

  render() {
    return (
      <>
        {this.props.getStoreLoading ? (
          <Loading loading={this.props.loading} />
        ) : (
          <div className="container mt-2" style={{ marginBottom: "1em" }}>
            <h3 className="mt-4 mb-3">Materials Registered</h3>

            {this.props.storeData.map((material, index) => {
              return (
                <Card
                  style={{
                    backgroundColor: "ececec",
                    width: "80%",
                    padding: "1em",
                    // margin: "0 auto",
                  }}
                  variant="outlined"
                  key={index}
                >
                  <Typography>{material.materialName}</Typography>
                </Card>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
//

const mapStateToProps = state => {
  return {
    //   check weather getStoreloading ??
    getStoreLoading: state.storeReducer.getStoreLoading,
    storeData: state.storeReducer.storeData,
  };
};

export default connect(mapStateToProps, {
  getStore,
})(DisplayMaterial);

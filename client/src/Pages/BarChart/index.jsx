import React, { useEffect, useState } from "react";
import { CardHeader, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import {
  getBarChartData,
  saveBarChart,
} from "../../Redux/BarCharts/barChartAction";
import Loading from "../../Components/Loading";
import Item from "./Item";
import { Save } from "@material-ui/icons";
import Notifications from "react-notification-system-redux";
import editRoles from "./planningEditRoles";

const BarChart = props => {
  const [data, setData] = useState([]);
  const [isEditable, setEditable] = useState(() => {
    const role = global.config.secureStorage.getItem("role");
    return editRoles.find(item => item == role) ? true : false;
  });

  const handleStartDate = (index, date) => {
    if (data.length === 0) {
      setData(props.defaultActivityNames);
    }
    setData(prev => {
      prev[index][1] = date;
      return prev;
    });
  };

  const handleEndDate = (index, date) => {
    if (data.length === 0) {
      setData(props.defaultActivityNames);
    }
    setData(prev => {
      prev[index][2] = date;
      return prev;
    });
  };

  useEffect(() => {
    async function fetchData() {
      await props.getBarChartData();
    }
    fetchData();
  }, []);

  if (props.loading) {
    return <Loading loading={true}></Loading>;
  }

  if (props.isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "80vh",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Something Went Wrong!!</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Notifications notifications={props.notifications} />
      <Grid container alignItems="center" justify="space-between">
        {/* <Grid item>
          <CardHeader title="Bar Chart" />
        </Grid> */}
        {isEditable && (
          <div
            style={{
              width: "100%",
              // border: "2px solid red",
              textAlign: "end",
              marginBottom: "20px",
            }}
          >
            <Grid item>
              <Button
                onClick={async () => {
                  if (data.length === 0) {
                    await props.saveBarChart(props.defaultActivityNames);
                    return;
                  }
                  props.saveBarChart(data);
                }}
                endIcon={<Save />}
              >
                Submit
              </Button>
            </Grid>
          </div>
        )}
      </Grid>
      {props.defaultActivityNames.map((item, index) => {
        return (
          <Item
            isEditable={isEditable}
            key={index}
            name={item[0]}
            startdate={item[1]}
            enddate={item[2]}
            handleStartDate={handleStartDate}
            index={index}
            handleEndDate={handleEndDate}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    defaultActivityNames: state.barChartReducer.defaultActivityNames,
    loading: state.barChartReducer.loading,
    isError: state.barChartReducer.isError,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBarChartData: () => dispatch(getBarChartData()),
    saveBarChart: data => dispatch(saveBarChart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);

import React, { Component } from "react";
import "date-fns";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
// import { blue } from "@material-ui/core/colors";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Update as UpdateIcon,
} from "@material-ui/icons";
import { connect } from "react-redux";
import {
  updateChecklistTasks,
  getChecklistTasks,
} from "../../Redux/checkListRedux/checklistAction";
import Notifications from "react-notification-system-redux";
import Loading from "../../Components/Loading";

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checklistField: "",
      loading: true,
      allCheckLists: [],
      editButton: false,
      editIndex: 0,
      isUpdated: false,
    };
  }
  async componentDidMount() {
    await this.props.getChecklistTasks(
      global.config.secureStorage.getItem("subprojectId")
    );
    this.setState({
      loading: !this.state.loading,
    });
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  editCheckList = (data, index) => {
    this.setState({
      checklistField: data,
      editButton: !this.state.editButton,
      editIndex: index,
    });
  };
  deleteCheckList = index => {
    let newCheckList = [...this.state.allCheckLists];
    newCheckList.splice(index, 1);
    this.setState({
      allCheckLists: newCheckList,
    });
  };
  updateCheckList = () => {
    let newCheckList = [...this.state.allCheckLists];
    newCheckList[this.state.editIndex] = this.state.checklistField;
    this.setState({
      allCheckLists: newCheckList,
      editButton: !this.state.editButton,
      checklistField: "",
    });
  };
  addCheckList = () => {
    const newCheckList = [
      ...this.state.allCheckLists,
      this.state.checklistField,
    ];
    this.setState({
      allCheckLists: newCheckList,
      checklistField: "",
    });
  };
  submitCheckList = () => {
    //
    const obj = {
      id: global.config.secureStorage.getItem("subprojectId"),
      list: this.state.allCheckLists,
    };
    this.props.updateChecklistTasks(obj);
  };

  componentDidUpdate() {
    if (!this.state.isUpdated && this.props.tasks.length !== 0) {
      this.setState({
        allCheckLists: this.props.tasks,
        isUpdated: true,
      });
    }
  }
  render() {
    if (this.props.getLoading) {
      return <Loading loading={this.props.getLoading} />;
    }

    return (
      <div>
        {this.props.notifications && (
          <Notifications notifications={this.props.notifications} />
        )}
        <div className="d-flex justify-content-center my-2">
          <Typography variant="h4">Checklists</Typography>
        </div>
        <div className="mt-1">
          <Grid direction="row" justify="center" alignItems="center" container>
            <Grid item>
              <TextField
                name="checklistField"
                required
                value={this.state.checklistField}
                onChange={this.handleChange}
                id="checklistField"
                label="Checklist"
                type="text"
              />
            </Grid>
            <Grid item>
              {this.state.editButton ? (
                <Button
                  onClick={this.updateCheckList}
                  startIcon={<UpdateIcon />}
                  size="large"
                >
                  Update Checklist
                </Button>
              ) : (
                <Button
                  onClick={this.addCheckList}
                  startIcon={<AddIcon />}
                  size="large"
                >
                  Add Checklist
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
        <div className="container mt-4">
          {this.state.loading ? (
            <Loading loading={this.state.loading} />
          ) : (
            <div>
              {this.state.allCheckLists.map((data, index) => {
                return (
                  <Card
                    style={{
                      boxShadow: "0 2px 4px rgb(179, 179, 179)",
                    }}
                    className="mb-2"
                    key={index}
                  >
                    <CardContent>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        direction="row"
                      >
                        <Grid item>
                          <Typography variant="h5" component="h2">
                            {data}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <EditIcon
                            onClick={() => this.editCheckList(data, index)}
                            color="primary"
                            style={{ cursor: "pointer" }}
                            className="mr-4"
                          />
                          <DeleteIcon
                            onClick={() => this.deleteCheckList(index)}
                            style={{ cursor: "pointer" }}
                            color="secondary"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
              <center>
                <Button
                  onClick={this.submitCheckList}
                  startIcon={<UpdateIcon />}
                  style={{ marginTop: "1em" }}
                  size="large"
                >
                  Submit
                </Button>
              </center>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //
  return {
    tasks: state.checkListReducer.tasks,
    notifications: state.notifications,
    getSuccess: state.checkListReducer.isGetSuccess,
    getLoading: state.checkListReducer.isGetLoading,
    getError: state.checkListReducer.isGetError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateChecklistTasks: obj => dispatch(updateChecklistTasks(obj)),
    getChecklistTasks: id => dispatch(getChecklistTasks(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);

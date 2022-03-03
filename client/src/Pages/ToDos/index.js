import React, { Component } from "react";
import { Button, CardHeader, Typography } from "@material-ui/core";
import ToDo from "./ToDo";
import Loading from "../../Components/Loading";
import AddToDo from "./AddToDo";
// import { blue } from "@material-ui/core/colors";
import { Add } from "@material-ui/icons";
import Style from "./style.module.scss";
import { connect } from "react-redux";
import {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo
} from "../../Redux/todoRedux/todoAction";
import Notifications from "react-notification-system-redux";
import PropTypes from "prop-types";

class DisplayToDo extends Component {
  constructor(props) {
    super(props);
    const role = global.config.secureStorage.getItem("role");
    const editRoles = ["project_manager", "super_admin"];
    var isEditable = editRoles.find(item => item == role) ? true : false;
    this.state = {
      taskTitle: "",
      taskDetail: "",
      userName: "",
      deadline: new Date(),
      todoId: "",
      allTodos: [],
      isCreateNewTodo: false,
      isEditable: isEditable
    };
  }

  async componentDidMount() {
    await this.props.getTodo();
    // console.clear();
    if (!this.props.loading) {
      this.setState({
        allTodos: this.props.todo.data
      });
      //
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleChangeUser = (event, value) => {
    this.setState({
      userName: value.firstName + " " + value.lastName
    });
    this.setState({
      userId: value._id
    });
  };
  handleChangeDate = event => {
    this.setState({
      deadline: event
    });
  };
  toggleCreateNewTodo = () => {
    this.setState({
      taskTitle: "",
      taskDetail: "",
      userName: "",
      deadline: new Date(),
      isCreateNewTodo: !this.state.isCreateNewTodo
    });
  };

  deleteTodo = id => {
    const requiredTodo = this.props.todo.data.find(eachTodo => {
      return eachTodo.todoId === id;
    });
    //
    this.props.deleteTodo(requiredTodo._id);
  };

  saveTodo = event => {
    event.preventDefault();
    const id = Date.now();
    let now = this.state.deadline;
    const date =
      now.getDate() +
      "/" +
      (parseInt(now.getMonth()) + 1).toString() +
      "/" +
      now.getFullYear();

    const finalTodo = {
      taskTitle: this.state.taskTitle,
      taskDetail: this.state.taskDetail,
      userName: this.state.userName,
      deadline: date,
      todoId: id,
      userId: this.state.userId
    };

    // let newTodos = [...this.state.allTodos, finalTodo];

    this.setState({
      taskTitle: "",
      taskDetail: "",
      userName: "",
      isCreateNewTodo: !this.state.isCreateNewTodo
    });
    this.props.addTodo(finalTodo);
  };
  handleRemark = async (remark, id) => {
    var todo = this.props.todo.data.find(item => item.todoId === id);
    const change = {
      ...todo,
      remark: remark
    };
    this.props.updateTodo(todo._id, change);
  };

  render() {
    const { isCreateNewTodo } = this.state;
    if (isCreateNewTodo) {
      return (
        <AddToDo
          handleChange={this.handleChange}
          handleChangeUser={this.handleChangeUser}
          handleChangeDate={this.handleChangeDate}
          taskTitle={this.state.taskTitle}
          taskDetail={this.state.taskDetail}
          userName={this.state.userName}
          deadline={this.state.deadline}
          saveTodo={this.saveTodo}
          toggleCreateNewTodo={this.toggleCreateNewTodo}
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
              onClick={this.toggleCreateNewTodo}
              startIcon={<Add />}
              size="large"
            >
              Add Todo
            </Button>
          </section>
        )}
        {this.props.loading ? (
          <Loading loading={this.props.loading} />
        ) : !this.props.loading && !this.props.todo.data.length ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "80vh"
            }}
          >
            <Typography
              variant="h4"
              color="textSecondary"
              style={{ marginLeft: "0.5em", textAlign: "center" }}
            >
              No Todo Found!
            </Typography>
          </div>
        ) : (
          <div>
            <section className={Style.all__todo}>
              {this.props.todo.data.map((eachTodo, index) => {
                return (
                  <div key={index}>
                    <ToDo
                      isEditable={this.state.isEditable}
                      id={eachTodo.todoId}
                      taskTitle={eachTodo.taskTitle}
                      taskDetail={eachTodo.taskDetail}
                      userName={eachTodo.userName}
                      deadline={eachTodo.deadline}
                      deleteTodo={this.deleteTodo}
                      todoRemark={eachTodo.remark}
                      addRemark={this.handleRemark}
                    />
                  </div>
                );
              })}
            </section>
          </div>
        )}
      </div>
    );
  }
}

DisplayToDo.propTypes = {
  todo: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    todo: state.todoReducer,
    notifications: state.notifications,
    success: state.todoReducer.success,
    loading: state.todoReducer.loading
  };
};

export default connect(mapStateToProps, {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo
})(DisplayToDo);

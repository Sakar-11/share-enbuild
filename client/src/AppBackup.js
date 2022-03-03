import React, { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./Redux/store";
import AppBar from "./Pages/NavBar";
import Test from "./Components/Test";
import Checklist from "./Pages/Checklist";
import Modal from "./Components/Modal";
import NewProject from "./Pages/NewProject";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Issues from "./Pages/Issues/Issues";
import Display from "./Components/Material/Display";
import DisplayToDo from "./Pages/ToDos/DisplayToDo";
import ProjectList from "./Pages/ProjectList";
import SubProjectList from "./Pages/SubprojectList";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppBar />
        <Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={props => <Register {...props} />}
            />
            <Route
              exact
              path="/activities"
              name="Dashboard"
              render={props => <Checklist {...props} />}
            />
            <Route
              exact
              path="/projectList"
              name="Dashboard Page"
              render={props => <ProjectList {...props} />}
            />
            <Route
              exact
              path="/subprojectList"
              name="Dashboard Page"
              render={props => <SubProjectList {...props} />}
            />
            <Route
              exact
              path="/addProject"
              render={props => <NewProject {...props} />}
            />
            <Route
              exact
              path="/material"
              render={() => (
                <ProtectedRoute exact path="/material" component={Display} />
              )}
            />
            <Route
              exact
              path="/todo"
              render={() => (
                <ProtectedRoute exact path="/todo" component={DisplayToDo} />
              )}
            />
            <Route
              exact
              path="/issues"
              render={() => (
                <ProtectedRoute exact path="/issues" component={Issues} />
              )}
            />
          </Switch>
        </Suspense>
        {/* <Checklist /> */}
        {/* <header className="App-header">Construction App</header> */}

        {/* <Test /> */}
      </Router>
    </Provider>
  );
}

export default App;

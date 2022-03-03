import React, { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./Redux/store";
import AppBar from "./Components/NavBar";

import Routes from "./Pages";
import ProtectedRoute from "./Pages/ProtectedRoute";

import theme from "./theme";
import { ThemeProvider } from "@material-ui/core";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar />
          <Suspense fallback={loading()}>
            <Switch>
              {Routes.map((item, index) => {
                if (item.isProtected) {
                  return (
                    <ProtectedRoute
                      key={index}
                      exact
                      path={item.path}
                      component={item.component}
                    />
                  );
                } else {
                  return (
                    <Route
                      key={index}
                      exact
                      path={item.path}
                      name={item.name}
                      render={item.component}
                    />
                  );
                }
              })}
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

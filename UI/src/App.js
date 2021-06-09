import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/LandingPage/LandingPage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import Settings from "./components/settings/Settings";

import PrivateRoute from "./routing/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import ChangePassword from "./components/auth/ChangePassword";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Practice from "./components/practice/Practice";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/*<Navbar />
          <Route exact path="/" component={Landing} />*/}
          <section className="">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/reset-password/:token" component={ChangePassword} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/cases/support/:id"
                component={Practice}
              />
              <PrivateRoute exact path="/settings" component={Settings} />
              <PrivateRoute
                exact
                path="/cases/support/:id"
                component={Practice}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;

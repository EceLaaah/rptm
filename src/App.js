import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Context/auth";
import { PrivateRoute } from "./components";
import {
  Dashboard,
  Login,
  Register,
  Profile,
  Transaction,
  Post,
} from "./Pages";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/post" component={Post} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/Transaction" component={Transaction} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

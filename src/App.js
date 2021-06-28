import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AuthProvider} from './Context/auth'
import { Login, Register, PrivateRoute, Dashboard } from './components'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;

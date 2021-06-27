import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Register } from './components'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserProvider";
import { AuthProvider } from "./Context/auth";
import { ProductProvider } from "./Context/ProductProvider";
import { PrivateRoute } from "./components";
import {
  Dashboard,
  Login,
  Register,
  Profile,
  Transaction,
  Post,
  Marketplace,
  Products,
  UpdateProduct,
} from "./Pages";

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/post" component={Post} />
              <PrivateRoute
                exact
                path="/updateProduct"
                component={UpdateProduct}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/Transaction" component={Transaction} />
              <PrivateRoute exact path="/marketplace" component={Marketplace} />
              <PrivateRoute exact path="/products" component={Products} />
            </Switch>
          </Router>
        </AuthProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;

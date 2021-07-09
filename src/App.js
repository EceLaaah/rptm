import React, { Suspense } from "react";
import { Spin } from "antd";
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
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
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
                <PrivateRoute
                  exact
                  path="/Transaction"
                  component={Transaction}
                />
                <PrivateRoute
                  exact
                  path="/marketplace"
                  component={Marketplace}
                />
                <PrivateRoute exact path="/products" component={Products} />
              </Switch>
            </Router>
          </AuthProvider>
        </ProductProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;

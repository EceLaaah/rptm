import React, { Suspense } from "react";
import { Spin } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserProvider";
import { AuthProvider } from "./Context/auth";
import { ProductProvider } from "./Context/ProductProvider";
import { RiceVarietyProvider } from "./Context/RiceVarietyProvider";
import { FarmLocationProvider } from "./Context/FarmLocationProvider";
import { ProcurementProvider } from "./Context/ProcurementProvider";
import { DistributionProvider } from "./Context/DistributionProvider";
import { PrivateRoute } from "./components";
import {
  Dashboard,
  Procurement,
  Inventory,
  Distribution,
  Login,
  Register,
  Profile,
  Transaction,
  Post,
  Marketplace,
  Products,
  UpdateProduct,
  Rice,
  Farm,
  Produce,
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
      <DistributionProvider>
        <UserProvider>
          <ProcurementProvider>
            <FarmLocationProvider>
              <RiceVarietyProvider>
                <ProductProvider>
                  <AuthProvider>
                    <Router>
                      <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute
                          exact
                          path="/dashboard"
                          component={Dashboard}
                        />
                        <PrivateRoute
                          exact
                          path="/procurement"
                          component={Procurement}
                        />
                        <PrivateRoute
                          exact
                          path="/distribution"
                          component={Distribution}
                        />
                        <PrivateRoute
                          exact
                          path="/produce"
                          component={Produce}
                        />
                        <PrivateRoute
                          exact
                          path="/inventory"
                          component={Inventory}
                        />
                        <PrivateRoute exact path="/post" component={Post} />
                        <PrivateRoute
                          exact
                          path="/updateProduct"
                          component={UpdateProduct}
                        />
                        <PrivateRoute
                          exact
                          path="/profile"
                          component={Profile}
                        />
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
                        <PrivateRoute
                          exact
                          path="/products"
                          component={Products}
                        />
                        <PrivateRoute exact path="/rice" component={Rice} />
                        <PrivateRoute exact path="/farm" component={Farm} />
                      </Switch>
                    </Router>
                  </AuthProvider>
                </ProductProvider>
              </RiceVarietyProvider>
            </FarmLocationProvider>
          </ProcurementProvider>
        </UserProvider>
      </DistributionProvider>
    </Suspense>
  );
}

export default App;

import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import MemberUpdate from "./Member/MemberUpdate";
import Product from "./Product";
import ProductAdd from "./Product/ProductAdd";
import ProductEdit from "./Product/ProductEdit";
import App from "./App";

class Account extends PureComponent {
  render() {
    return (
      <App>
        <Switch>
          <Route path="/account/member" component={MemberUpdate} />
          <Route path="/account/product/list" component={Product} />
          <Route path="/account/product/add" component={ProductAdd} />
          <Route path="/account/product/edit/:id" component={ProductEdit} />
        </Switch>
      </App>
    );
  }
}

export default Account;

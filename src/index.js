import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import Blog from "./components/Blog/Blog";
import BlogDetail from "./components/Blog/BlogDetail";
import NotFound from "./components/NotFound";
import Login from "./components/Login/";
import Home from "./components/Home/Home";
import Account from "./components/Account";
import Product from "./components/Product";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Product/Cart";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog/list" exact component={Blog} />
          <Route path="/product/list" component={Product} />
          <Route path="/product/detail/:id" component={ProductDetail} />
          <Route path="/product/cart" component={Cart} />
          <Route path="/blog/detail/:id" component={BlogDetail} />
          <Route path="/login" component={Login} />
          <Route component={Account} />
          <Route default component={NotFound} />
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

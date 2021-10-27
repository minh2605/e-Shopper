import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import "./App.css";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import SideBar from "./components/SideBar";
import MyProvider from "./components/Context";

class App extends PureComponent {
  // const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  render() {
    const { pathname: pathName } = this.props.location;
    return (
      <MyProvider>
        <div className="App">
          <Header />
          <main>
            <div className="container">
              <div className="row">
                {pathName.includes("account") ? null : <SideBar />}
                {this.props.children}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </MyProvider>
    );
  }
}

export default withRouter(App);

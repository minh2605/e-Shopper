import React, { PureComponent } from "react";

import API from "../Api";
import API_LINK from "../Api/ApiLink";
import ProductList from "../Product/ProductList";

const getHomeProducts = async () => {
  const url = "/api/product";
  const res = await API.get(url);
  if (res.data.response === "success") {
    return res.data.data;
  }
};

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.api = `${API_LINK}/upload/user/product`;
    this.state = {
      homeProducts: [],
    };
  }

  async componentDidMount() {
    const homeProducts = await getHomeProducts();
    this.setState({
      homeProducts: homeProducts,
    });
  }
  render() {
    return (
      <div className="col-sm-9">
        <ProductList listProduct={this.state.homeProducts} />
      </div>
    );
  }
}

export default Home;

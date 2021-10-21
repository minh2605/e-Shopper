import React, { PureComponent } from "react";

import ProductList from "./ProductList";
import API from "../Api";

const getAllProducts = async () => {
  const url = "/api/product/list";
  const res = await API.get(url);
  if (res.data.response === "success") {
    return res.data.data;
  }
};

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: {},
      listProduct: [],
    };
  }

  async componentDidMount() {
    const allProducts = await getAllProducts();
    this.setState({
      allProducts: allProducts,
      listProduct: allProducts.data,
    });
  }

  handlePageChange = async (pageUrl) => {
    const res = await API.get(pageUrl);
    if (res.data.response === "success") {
      const newListProduct = res.data.data.data;
      // console.log(res.data.data);
      this.setState({
        listProduct: newListProduct,
        allProducts: res.data.data,
      });
    }
  };

  render() {
    const { next_page_url: nextPageUrl, prev_page_url: prevPageUrl } =
      this.state.allProducts;
    return (
      <div className="col-sm-9">
        <ProductList
          allProducts={this.state.allProducts}
          listProduct={this.state.listProduct}
        />
        <div className="pagination">
          <button
            className="btn-prev"
            disabled={!prevPageUrl}
            onClick={() => this.handlePageChange(prevPageUrl)}
          >
            <i className="fas fa-chevron-left"></i>
            Prev
          </button>
          <button
            className="btn-next"
            disabled={!nextPageUrl}
            onClick={() => this.handlePageChange(nextPageUrl)}
          >
            Next
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Product;

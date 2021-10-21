import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./Product.css";
import API_LINK from "../Api/ApiLink";
// import API from "../Api";

class ProductList extends PureComponent {
  constructor(props) {
    super(props);
    this.api = `${API_LINK}/upload/user/product`;
    this.state = {
      cart: {},
    };
  }

  handleAddToCart = (productId, e) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    let newCart = {};

    //When cart in local storage
    if (localCart) {
      newCart = localCart;
      newCart[productId] =
        newCart[productId] + 1 || parseInt(e.target.dataset.count) + 1;
    }
    //When cart in local storage null
    else {
      newCart[productId] = parseInt(e.target.dataset.count) + 1;
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  render() {
    const { listProduct } = this.props;
    return (
      <div className="features-items row">
        <h2 className="title text-center col-sm-12">Features Items</h2>
        {listProduct.map((product) => (
          <div className="col-sm-4" key={product.id}>
            <div className="product-image-wrapper">
              <div className="single-products">
                <div
                  className="productinfo text-center"
                  data-index="1"
                  data-count="0"
                >
                  <img
                    src={`${this.api}/${product.id_user}/${
                      JSON.parse(product.image)[0]
                    }`}
                    alt=""
                  />
                  <h2>${product.price}</h2>
                  <p>{product.name}</p>
                  <a href="#a" className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart"></i>Add to cart
                  </a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${product.price}</h2>
                    <p>{product.name}</p>
                    <span
                      className="btn btn-default add-to-cart"
                      data-count="0"
                      onClick={(e) => this.handleAddToCart(product.id, e)}
                    >
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </span>
                    <Link
                      to={`/product/detail/${product.id}`}
                      className="btn btn-default more-detail"
                    >
                      <span>More</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <a href="#a">
                      <i className="fa fa-plus-square"></i>Add to wishlist
                    </a>
                  </li>
                  <li>
                    <a href="#a">
                      <i className="fa fa-plus-square"></i>Add to compare
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ProductList.propsType = {
  allProducts: PropTypes.object,
  listProduct: PropTypes.array,
};

ProductList.defaultProps = {
  allProducts: {},
  listProduct: [],
};

export default ProductList;

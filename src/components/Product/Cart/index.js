import React, { PureComponent } from "react";

import API from "../../Api";
import API_LINK from "../../Api/ApiLink";
import CartProduct from "./CartProduct";
import CartAction from "./CartAction";
import "./Cart.css";

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
    this.api = `${API_LINK}/upload/user/product`;
    this.state = {
      cart: [],
      deleteId: "",
    };
  }

  componentDidMount() {
    const url = "/api/product/cart";
    const config = {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    };
    const data = JSON.parse(localStorage.getItem("cart"));
    API.post(url, data, config)
      .then((res) => {
        if (res.data.response === "success") {
          this.setState({
            cart: res.data.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  handleDeleteId = (id) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    const newCart = this.state.cart.filter((product) => product.id !== id);
    this.setState({
      cart: newCart,
    });
    delete localCart[id];
    localStorage.setItem("cart", JSON.stringify(localCart));
  };

  handleProductIncrement = (id, qty) => {
    const newCart = this.state.cart.map((product) => {
      if (product.id === id) {
        product.qty = qty;
      }
      return product;
    });
    this.setState({
      cart: newCart,
    });
  };
  handleProductDecrement = (id, qty) => {
    const newCart = this.state.cart.map((product) => {
      if (product.id === id) {
        product.qty = qty;
      }
      return product;
    });
    this.setState({
      cart: newCart,
    });
  };

  render() {
    console.log("Index render");
    if (this.state.cart.length > 0) {
      return (
        <>
          <section id="cart_items" className=" col-sm-9">
            <div className="container">
              <div className="breadcrumbs">
                <ol className="breadcrumb">
                  <li>
                    <a href="#a">Home</a>
                  </li>
                  <li className="active">Shopping Cart</li>
                </ol>
              </div>
              <div className="table-responsive cart_info">
                <table className="table table-condensed">
                  <thead>
                    <tr className="cart_menu">
                      <td className="image">Item</td>
                      <td className="description"></td>
                      <td className="price">Price</td>
                      <td className="quantity">Quantity</td>
                      <td className="total">Total</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.cart.map((product) => (
                      <CartProduct
                        product={product}
                        key={product.id}
                        handleDeleteId={this.handleDeleteId}
                        handelIncrement={this.handleProductIncrement}
                        handelDecrement={this.handleProductDecrement}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <CartAction cart={this.state.cart} />
        </>
      );
    } else return null;
  }
}

export default Cart;

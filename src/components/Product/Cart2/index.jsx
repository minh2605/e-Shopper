import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct.tsx";
// import API from "../../Api";
// import API_LINK from "../../Api/ApiLink";

function Cart2(props) {
  const cart =
    useSelector((state) => state.cart.list) ||
    JSON.parse(localStorage.getItem("cart")); //If store dont have cart, get cart from local
  console.log("cart", cart);
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
                {Object.values(cart).map((product) => (
                  <CartProduct key={product} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart2;

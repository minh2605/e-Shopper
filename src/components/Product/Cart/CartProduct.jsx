import React, { useState } from "react";
// import PropTypes from "prop-types";

// import API from "../../Api";
import API_LINK from "../../Api/ApiLink";
import "./Cart.css";

// CartProduct.propTypes = {};

function CartProduct(props) {
  const { product, handleDeleteId, handelIncrement, handelDecrement } = props;
  const localProduct = JSON.parse(localStorage.getItem("cart"));
  const [qty, setQty] = useState(product.qty);

  const handleQty = (id, e) => {
    if (e.target.value === "0") {
      delete localProduct[id];
    }
    setQty(parseInt(e.target.value));
    localProduct[id] = parseInt(e.target.value);
    localStorage.setItem("cart", JSON.stringify(localProduct));
  };

  const handleIncreaseQty = (id) => {
    let newQty = qty;
    newQty++;
    setQty(newQty);
    localProduct[id] = newQty;
    handelIncrement(id, newQty);
    localStorage.setItem("cart", JSON.stringify(localProduct));
  };

  const handleDecreaseQty = (id) => {
    let newQty = localProduct[id];
    newQty--;
    setQty(newQty);
    localProduct[id] = newQty;
    handelDecrement(id, newQty);
    if (newQty <= 0) {
      delete localProduct[id];
      handleDeleteId(id);
    }
    localStorage.setItem("cart", JSON.stringify(localProduct));
  };

  const handleDelete = (id) => {
    handleDeleteId(id);
  };
  const { id, id_user, image, name, price, sale } = props.product;
  return (
    <>
      {qty === 0 || (
        <tr>
          <td className="cart_product">
            <a href="#a">
              <img
                src={`${API_LINK}/upload/user/product/${id_user}/small_${
                  JSON.parse(image)[0]
                }`}
                alt=""
              />
            </a>
          </td>
          <td className="cart_description">
            <h4>
              <a href="#a">{name}</a>
            </h4>
            <p>Web ID: {id}</p>
          </td>
          <td className="cart_price">
            <p>${price}</p>
          </td>
          <td className="cart_quantity">
            <div className="cart_quantity_button">
              <a
                className="cart_quantity_up"
                href="#a"
                onClick={() => handleIncreaseQty(id)}
              >
                +
              </a>
              <input
                className="cart_quantity_input"
                value={qty}
                type="number"
                name="quantity"
                autoComplete="off"
                size="2"
                onChange={(e) => handleQty(id, e)}
              />
              <a
                className="cart_quantity_down"
                href="#a"
                onClick={() => handleDecreaseQty(id)}
              >
                -
              </a>
            </div>
          </td>
          <td className="cart_total">
            <p className="cart_total_price">
              $
              {sale === 0
                ? price * qty
                : price * qty - (price * qty * sale) / 100}
            </p>
          </td>
          <td className="cart_delete">
            <a
              className="cart_quantity_delete"
              href="#a"
              onClick={() => handleDelete(id)}
            >
              <i className="fa fa-times"></i>
            </a>
          </td>
        </tr>
      )}
    </>
  );
}

export default CartProduct;

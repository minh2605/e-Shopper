import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishList } from "../../actions/wishlist";
import API_LINK from "../Api/ApiLink";

function WishList() {
  const wishList =
    useSelector((state) => state.wishList.list) ||
    JSON.parse(localStorage.getItem("wishlist"));
  const dispatch = useDispatch();
  console.log("wishList", wishList);

  const handleDeleteWishList = (id, e) => {
    e.preventDefault();
    console.log("id", id);
    const action = deleteWishList(id);
    dispatch(action);
  };

  return (
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
                <td></td>
              </tr>
            </thead>
            <tbody>
              {wishList &&
                wishList.map((product) => (
                  <tr key={product.id}>
                    <td className="cart_product">
                      <a href="#a">
                        <img
                          src={`${API_LINK}/upload/user/product/${
                            product.id_user
                          }/small_${JSON.parse(product.image)[0]}`}
                          alt=""
                        />
                      </a>
                    </td>
                    <td className="cart_description">
                      <h4>
                        <a href="#a">{product.name}</a>
                      </h4>
                      <p>Web ID: {product.id}</p>
                    </td>
                    <td className="cart_price">
                      <p>${product.price}</p>
                    </td>
                    <td className="cart_delete">
                      <a
                        className="cart_quantity_delete"
                        href="#a"
                        onClick={(e) => handleDeleteWishList(product.id, e)}
                      >
                        <i className="fa fa-times"></i>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default WishList;

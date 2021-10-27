import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MyContext } from "../Context";

import "./Product.css";
import API_LINK from "../Api/ApiLink";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { addNewWishList } from "../../actions/wishlist";
import { addNewCart } from "../../actions/Cart";

function ProductList(props) {
  const context = useContext(MyContext);
  const dispatch = useDispatch();

  const api = `${API_LINK}/upload/user/product`;
  // const [cart, setCart] = useState({});

  const handleAddToCart = (productId, e) => {
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
    localStorage.setItem("cartCount", Object.keys(newCart).length);
    context.setCartCount(Object.keys(newCart).length);
  };

  const handleAddToCart2 = (productId, e) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    let newCart = {};

    if (localCart) {
      newCart = localCart;
      newCart[productId] =
        newCart[productId] + 1 || parseInt(e.target.dataset.count) + 1;
    }
    //When cart in local storage null
    else {
      newCart[productId] = parseInt(e.target.dataset.count) + 1;
    }
    const action = addNewCart(newCart);
    dispatch(action);
  };

  const handleAddToWishList = (product, e) => {
    e.preventDefault();
    console.log(product);
    const newWishList = product;

    const action = addNewWishList(newWishList);
    dispatch(action);
  };

  const { listProduct } = props;
  return (
    <MyContext.Consumer>
      {(context) => (
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
                      src={`${api}/${product.id_user}/${
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
                        onClick={(e) =>
                          handleAddToCart2(product.id, e, context.setCartCount)
                        }
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
                    <li onClick={(e) => handleAddToWishList(product, e)}>
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
      )}
    </MyContext.Consumer>
  );
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

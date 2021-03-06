import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MyContext } from "../Context";

function Header(props) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const wishList = useSelector((state) => state.wishList.list);
  const cart = useSelector((state) => state.cart.list);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  }

  function handleAccountMenuLogined() {
    let jsx = (
      <li className="nav__link">
        <Link to="/login">
          <i className="fas fa-user"></i>
          <span>Account</span>
        </Link>
      </li>
    );
    if (auth) {
      const { name } = auth;
      jsx = (
        <li className="nav__link">
          <Link to="/account/member">
            <i className="fas fa-user"></i>
            <span>{name}</span>
          </Link>
        </li>
      );
    }
    return jsx;
  }

  function handleLoginMenuLogined() {
    let jsx = (
      <li className="nav__link">
        <Link to="/login">
          <i className="fas fa-lock"></i>
          <span>Login</span>
        </Link>
      </li>
    );
    if (auth) {
      jsx = (
        <li className="nav__link" onClick={handleLogout}>
          <Link to="/login">
            <i className="fas fa-lock"></i>
            <span>Logout</span>
          </Link>
        </li>
      );
    }
    return jsx;
  }
  return (
    <MyContext.Consumer>
      {(context) => (
        <header className="header">
          <div className="header__container">
            <div className="header__top">
              <div className="container">
                <div className="row">
                  <ul className="header__contact col-sm-6">
                    <li>
                      <i className="fas fa-phone"></i>
                      <a href="#a"> +12345687</a>
                    </li>
                    <li>
                      <i className="fas fa-envelope"></i>
                      <a href="#a"> e@gmail.com</a>
                    </li>
                  </ul>
                  <ul className="header__socials col-sm-6">
                    <li>
                      <a href="#a">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#a">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#a">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#a">
                        <i className="fab fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#a">
                        <i className="fab fa-google"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="header__mid">
              <div className="container">
                <div className="row">
                  <div className="header__mid-left col-sm-5">
                    <div className="logo">
                      <a href="#a">
                        <img src="/images/logo.png" alt="logo" />
                      </a>
                    </div>
                    <div className="options-group">
                      <select name="" id="" className="countries">
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                        <option value="uk">UK</option>
                      </select>
                      <select name="" id="" className="currency">
                        <option value="dollar">Dollar</option>
                        <option value="can_dollar">Canada Dollar</option>
                        <option value="uk">Pound</option>
                      </select>
                    </div>
                  </div>
                  <div className="header__mid-right col-sm-7">
                    <nav>
                      {handleAccountMenuLogined()}
                      <li className="nav__link">
                        <i className="fas fa-star"></i>
                        <Link to="/wishlist">
                          Wishlist {wishList.length ? wishList.length : ""}
                        </Link>
                      </li>
                      <li className="nav__link">
                        <i className="fas fa-crosshairs"></i>
                        <a href="#a">Checkout</a>
                      </li>
                      <li className="nav__link">
                        <i className="fas fa-shopping-cart"></i>
                        <Link to="/product/cart">
                          <span>Cart {context.cartCount}</span>
                          {/* <span>
                            Cart {cart ? Object.keys(cart).length : ""}
                          </span> */}
                        </Link>
                      </li>
                      {handleLoginMenuLogined()}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className="header__bot">
              <div className="container">
                <div className="row">
                  <ul className="menu col-sm-9">
                    <li className="menu__item">
                      <Link to="/" className="menu__link">
                        <span>Home</span>
                      </Link>
                    </li>
                    <li className="menu__item">
                      <a href="/" className="menu__link">
                        Shop <i className="fas fa-caret-down"></i>
                      </a>
                      <ul>
                        <li>
                          <Link to="/product/list">
                            <span>Products</span>
                          </Link>
                        </li>
                        <li>
                          <a href="#a">Product Detail</a>
                        </li>
                        <li>
                          <a href="#a">Checkout</a>
                        </li>
                        <li>
                          <Link to="/product/cart">
                            {console.log(context.cartCount)}
                            <span>Cart {context.cartCount}</span>
                          </Link>
                        </li>
                        <li>
                          <a href="#a">Login</a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu__item">
                      <a href="/blog/list" className="menu__link">
                        Blog <i className="fas fa-caret-down"></i>
                      </a>
                      <ul>
                        <li>
                          <Link to="/blog/list">
                            <span>Blog List</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/blog/detail/">
                            <span>Blog Single</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="menu__item">
                      <a href="#a" className="menu__link">
                        404
                      </a>
                    </li>
                    <li className="menu__item">
                      <a href="#a" className="menu__link">
                        Contact
                      </a>
                    </li>
                  </ul>
                  <div className="search-menu col-sm-3">
                    <div className="search-bar ml-auto">
                      <input type="text" placeholder="Search" />
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </MyContext.Consumer>
  );
}

export default Header;

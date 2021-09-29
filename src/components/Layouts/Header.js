import React, { PureComponent } from "react";
// import abc from "../../../public/images/logo.png";
import { Link } from "react-router-dom";
class Header extends PureComponent {
  render() {
    return (
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
                      <img src="images/logo.png" alt="logo" />
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
                    <li className="nav__link">
                      <i className="fas fa-user"></i>
                      <a href="#a">Account</a>
                    </li>
                    <li className="nav__link">
                      <i className="fas fa-star"></i>
                      <a href="#a">Wishlist</a>
                    </li>
                    <li className="nav__link">
                      <i className="fas fa-crosshairs"></i>
                      <a href="#a">Checkout</a>
                    </li>
                    <li className="nav__link">
                      <i className="fas fa-shopping-cart"></i>
                      <a href="#a">Cart</a>
                    </li>
                    <li className="nav__link">
                      <i className="fas fa-lock"></i>
                      <a href="#a">Login</a>
                    </li>
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
                        <a href="#a">Products</a>
                      </li>
                      <li>
                        <a href="#a">Product Detail</a>
                      </li>
                      <li>
                        <a href="#a">Checkout</a>
                      </li>
                      <li>
                        <a href="#a">Cart</a>
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
    );
  }
}

export default Header;

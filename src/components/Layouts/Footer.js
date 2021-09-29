import React, { PureComponent } from "react";

class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__top">
            <div className="container">
              <div className="row">
                <div className="first col-sm-2">
                  <h4 className="first__title">E-Shopper</h4>
                  <p className="first__desc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
                  </p>
                </div>
                <div className="second col-sm-7">
                  <ul className="second__list">
                    <li className="second__item">
                      <div className="img">
                        <img
                          src="https://images.pexels.com/photos/3618162/pexels-photo-3618162.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt=""
                        />
                      </div>
                      <span className="title">Circle of Hands</span>
                      <span className="date">24 DEC 2014</span>
                    </li>
                    <li className="second__item">
                      <div className="img">
                        <img
                          src="https://images.pexels.com/photos/3618162/pexels-photo-3618162.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt=""
                        />
                      </div>
                      <span className="title">Circle of Hands</span>
                      <span className="date">24 DEC 2014</span>
                    </li>
                    <li className="second__item">
                      <div className="img">
                        <img
                          src="https://images.pexels.com/photos/3618162/pexels-photo-3618162.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt=""
                        />
                      </div>
                      <span className="title">Circle of Hands</span>
                      <span className="date">24 DEC 2014</span>
                    </li>
                    <li className="second__item">
                      <div className="img">
                        <img
                          src="https://images.pexels.com/photos/3618162/pexels-photo-3618162.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt=""
                        />
                      </div>
                      <span className="title">Circle of Hands</span>
                      <span className="date">24 DEC 2014</span>
                    </li>
                  </ul>
                </div>
                <div className="third col-sm-3">
                  <div className="img">
                    <img src="./images/map.png" alt="Map" />
                    <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__mid">
            <div className="container">
              <div className="row">
                <div className="footer__funcs col-sm-2">
                  <h5 className="func__title">Service</h5>
                  <ul>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                  </ul>
                </div>
                <div className="footer__funcs col-sm-2">
                  <h5 className="func__title">Service</h5>
                  <ul>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                  </ul>
                </div>
                <div className="footer__funcs col-sm-2">
                  <h5 className="func__title">Service</h5>
                  <ul>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                  </ul>
                </div>
                <div className="footer__funcs col-sm-2">
                  <h5 className="func__title">Service</h5>
                  <ul>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                    <li className="func">
                      <a href="#a">Online help</a>
                    </li>
                  </ul>
                </div>
                <div className="footer__ask col-sm-3 ml-auto">
                  <h2 className="footer__ask-title">About Shopper</h2>
                  <div className="footer__ask-email">
                    <input type="text" placeholder="Your email address" />
                    <button>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <p className="footer__ask-desc">
                    Get the most recent updates from our site and be updated
                    your self...
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bot">
            <div className="container">
              <div className="footer__bot-left">
                <p>Copyright © 2013 E-SHOPPER Inc. All rights reserved.</p>
              </div>
              <div className="footer__bot-right">
                <p className="ml-auto">Designed by Themeum</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

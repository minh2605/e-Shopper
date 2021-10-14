import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class MenuLeft extends PureComponent {
  dropItems = (e) => {
    console.log(e.target.className);
    e.target.classList.toggle("active");
  };

  render() {
    return (
      <section className="side-bar col-sm-3">
        <div className="category__panel">
          <div className="panel__title">
            <h3>Account</h3>
          </div>
          <div className="category__list">
            <div className="category__item">
              <Link to="/account/member">
                <h4 className="category__item-title">Account</h4>
              </Link>
            </div>
            <div className="category__item">
              <Link to="/account/product/list">
                <h4 className="category__item-title">My Product</h4>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MenuLeft;

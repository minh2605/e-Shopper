import React, { PureComponent } from "react";

class SideBar extends PureComponent {
  dropItems = (e) => {
    console.log(e.target.className);
    e.target.classList.toggle("active");
  };
  render() {
    return (
      <section className="side-bar col-sm-3">
        <div className="category__panel">
          <div className="panel__title">
            <h3>Category</h3>
          </div>
          <div className="category__list">
            <div className="category__item" onClick={this.dropItems}>
              <h4 className="category__item-title">SportSwear</h4>
              <ul id="sportswear">
                <li>
                  <a href="#a">Nike</a>
                </li>
                <li>
                  <a href="#a">Under Armour</a>
                </li>
                <li>
                  <a href="#a">Adidas</a>
                </li>
                <li>
                  <a href="#a">Puma</a>
                </li>
                <li>
                  <a href="#a">Asics</a>
                </li>
              </ul>
            </div>
            <div className="category__item" onClick={this.dropItems}>
              <h4 className="category__item-title">Mens</h4>
              <ul id="sportswear">
                <li>
                  <a href="#a">Fendi</a>
                </li>
                <li>
                  <a href="#a">Guess</a>
                </li>
                <li>
                  <a href="#a">Valentino</a>
                </li>
                <li>
                  <a href="#a">Dior</a>
                </li>
                <li>
                  <a href="#a">Versace</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SideBar;

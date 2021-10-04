import React from "react";

import "./Rating.scss";

function Rating(props) {
  return (
    <section className="rating__section">
      <div className="rating__container">
        <div className="rating__top">
          <div className="rating__stars">
            <span className="rating__stars-title">Rate this item</span>
            <div className="rating__stars-list">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <span className="rating__stars-vote">(6 votes)</span>
          </div>
          <div className="rating__tag">
            <span>Tag:</span>
            <span>Pink</span>
            <span>T-Shirt</span>
            <span>Girls</span>
          </div>
        </div>
        <div className="rating__bot">
          <div className="rating__social">
            <a href="#a">Facebook</a>
            <a href="#a">Tweet</a>
            <a href="#a">Pinterest</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rating;

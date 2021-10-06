import React, { PureComponent } from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import axios from "axios";

import "./Rating.scss";

class Rating extends PureComponent {
  constructor(props) {
    super(props);
    this.api = "http://192.168.30.105:8080/laravel/public";
    this.state = {
      rate: 0,
    };
  }

  changeRating = (newRating) => {
    this.setState({ rate: newRating });
    const blogId = this.props.blogId;
    const userId = JSON.parse(localStorage.getItem("auth")).id;
    const token = localStorage.getItem("token");

    const url = `${this.api}/api/blog/rate/${blogId}`;
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("blog_id", blogId);
    formData.append("rate", newRating);

    axios
      .post(url, formData, config)
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          alert("Thanks for your rating");
        }
      })
      .catch((err) => alert("Error", err));
  };

  render() {
    return (
      <section className="rating__section">
        <div className="rating__container">
          <ul className="rating__stars">
            <li className="rate-this">Rate this item:</li>
            <li>
              <StarRatings
                rating={this.props.rate}
                starDimension="20px"
                starSpacing="5px"
                changeRating={this.changeRating}
                starRatedColor="#ffa400"
              />
            </li>
            <li className="color">(6 votes)</li>
          </ul>
          <ul className="rating__tag">
            <li>TAG:</li>
            <li>
              <a className="color" href="#a">
                Pink <span>/</span>
              </a>
            </li>
            <li>
              <a className="color" href="#a">
                T-Shirt <span>/</span>
              </a>
            </li>
            <li>
              <a className="color" href="#a">
                Girls
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

Rating.propTypes = {
  blogId: PropTypes.number,
  rate: PropTypes.number,
};

Rating.defaultProps = {
  blogId: 0,
  rate: 0,
};

export default Rating;

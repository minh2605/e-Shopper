import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class BlogPost extends PureComponent {
  render() {
    let blogBtn = (
      <Link to={`/blog/detail/${this.props.blog.id}`} className="blog__btn">
        Read More
      </Link>
    );
    if (this.props.isDetail) {
      blogBtn = (
        <div className="blog__btn detail">
          <Link
            to={`/blog/detail/${this.props.blog.id - 1}`}
            className="blog__btn-prev"
          >
            Prev
          </Link>
          <Link
            to={`/blog/detail/${this.props.blog.id + 1}`}
            className="blog__btn-next"
          >
            Next
          </Link>
        </div>
      );
    }
    return (
      <div className="blog-post">
        <h4 className="blog__title">{this.props.blog.title}</h4>
        <div className="blog__meta">
          <ul>
            <li>
              <i className="fas fa-user"></i>
              <span>Mac Doe {this.props.blog.id}</span>
            </li>
            <li>
              <i className="fas fa-user"></i>
              <span>1:33 pm</span>
            </li>
            <li>
              <i className="fas fa-user"></i>
              <span>Dec 5,2013</span>
            </li>
          </ul>
          <div className="blog__rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <Link className="blog__img" to={`/blog/detail/${this.props.blog.id}`}>
          <img src={this.props.blog.image} alt="" />
        </Link>
        <p className="blog__desc">{this.props.blog.description}</p>
        {blogBtn}
      </div>
    );
  }
}

export default BlogPost;

import React, { PureComponent } from "react";
import BlogPost from "./BlogPost";
// import axios from "axios";

class Blog extends PureComponent {
  constructor(props) {
    super(props);
    this.api = "http://192.168.30.105:8080/laravel/public";
    this.state = {
      blogList: [],
    };
  }
  componentDidMount = () => {
    // axios
    //   .get(`${this.api}/api/blog`)
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({ blogList: res.data.blog.data });
    //   })
    //   .catch((error) => alert(error));
    fetch(`${this.api}/api/blog`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({ blogList: res.blog.data });
      });
  };

  renderBlogList = () => {
    const { blogList } = this.state;
    if (blogList) {
      return blogList.map((blog, key) => {
        return <BlogPost key={key} blog={blog} />;
      });
    }
    return null;
  };

  render() {
    return (
      <section className="blog__section col-sm-9">
        <div className="blog__container">
          <div className="blog__heading">
            <h3>Lastest from out blog</h3>
          </div>
          <div className="blog__list">{this.renderBlogList()}</div>
          <div className="blog__pagination">
            <a href="#a" className="page">
              1
            </a>
            <a href="#a" className="page">
              2
            </a>
            <a href="#a" className="page">
              3
            </a>
            <a href="#a" className="page">
              4
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Blog;

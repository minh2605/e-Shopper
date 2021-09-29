import React, { PureComponent } from "react";
import BlogPost from "./BlogPost";
import axios from "axios";

class BlogDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.api = "http://192.168.30.105:8080/laravel/public";
    this.state = {
      blogDetail: [],
    };
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    console.log(`${this.api}/api/blog/detail/${id}`);
    console.log(id);
    axios
      .get(`${this.api}/api/blog/detail/${id}`)
      .then((res) => {
        console.log(res);
        this.setState({ blogDetail: res.data.data });
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <section className="blog__section col-sm-9">
        <div className="blog__container">
          <div className="blog__heading">
            <h3>Lastest from out blog</h3>
          </div>
          <div className="blog__detail">
            <BlogPost blog={this.state.blogDetail} isDetail={true} />
          </div>
        </div>
      </section>
    );
  }
}

export default BlogDetail;

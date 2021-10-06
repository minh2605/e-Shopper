import React, { PureComponent } from "react";
import axios from "axios";

import BlogPost from "./BlogPost";
import Rating from "./Rating";
import CommentList from "./CommentList";
import CommentArea from "./CommentArea";

class BlogDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.api = "http://192.168.30.105:8080/laravel/public";
    this.userAuth = JSON.parse(localStorage.getItem("auth"));
    this.token = localStorage.getItem("token");
    this.state = {
      blogDetail: [],
      listComment: [],
      isReply: false,
      commentFocusId: 0,
      rate: 0,
    };
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;

    //Get Comment api
    axios
      .get(`${this.api}/api/blog/detail/${id}`)
      .then((res) => {
        // console.log(res);
        this.setState({
          blogDetail: res.data.data,
          listComment: res.data.data.comment,
        });
      })
      .catch((error) => console.log(error));

    //Get Rating api
    axios
      .get(`${this.api}/api/blog/rate/${id}`)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data.length === 0) return;
        const averageRate = this.getAverageRate(res.data.data);
        this.setState({ rate: averageRate });
      })
      .catch((error) => console.log(error));
  };

  handleCommentPost = (commentInfo) => {
    const { level, comment } = commentInfo;
    const { id: id_blog } = this.state.blogDetail;
    const { id: id_user, name, avatar } = this.userAuth;
    const idFocusBlog = this.state.commentFocusId;

    const url = `${this.api}/api/blog/comment/${id_blog}`;
    const config = {
      headers: {
        Authorization: "Bearer " + this.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("id_blog", id_blog);
    formData.append("id_user", id_user);
    formData.append("id_comment", idFocusBlog || level);
    formData.append("comment", comment);
    formData.append("image_user", avatar);
    formData.append("name_user", name);

    axios
      .post(url, formData, config)
      .then((res) => {
        console.log(res.data.data);
        console.log(this.state.listComment);
        const listComment = this.state.listComment;
        const newComment = res.data.data;
        const newListComment = listComment.concat(newComment);
        console.log("new list:", newListComment);

        this.setState({
          isReply: false,
          commentFocusId: 0,
          listComment: newListComment,
        });
      })
      .catch((err) => console.log(err));
  };

  setIsReply = (isReply) => {
    this.setState({ isReply: isReply });
  };

  setCommentFocusId = (id) => {
    this.setState({ commentFocusId: id });
  };

  getAverageRate = (listRate) => {
    const totalRate = Object.values(listRate).reduce((prev, curr) => {
      return prev + curr.rate;
    }, 0);
    const averageRate = totalRate / Object.values(listRate).length;
    return averageRate;
  };

  render() {
    return (
      <div className="col-sm-9">
        <section className="blog__section">
          <div className="blog__container">
            <div className="blog__heading">
              <h3>Lastest from out blog</h3>
            </div>
            <div className="blog__detail">
              <BlogPost blog={this.state.blogDetail} isDetail={true} />
            </div>
          </div>
        </section>
        <Rating blogId={this.state.blogDetail.id} rate={this.state.rate} />
        <CommentList
          comments={this.state.listComment}
          setIsReply={this.setIsReply}
          setCommentFocusId={this.setCommentFocusId}
        />
        <CommentArea
          onSubmit={this.handleCommentPost}
          commentFocusId={this.state.commentFocusId} //this prop to know is focusing on which comment id
        />
      </div>
    );
  }
}

export default BlogDetail;

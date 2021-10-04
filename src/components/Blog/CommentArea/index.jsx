import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./CommentArea.scss";

CommentArea.propTypes = {
  commentFocusId: PropTypes.number,
  onSubmit: PropTypes.func,
};

CommentArea.defaultProps = {
  commentFocusId: 0,
  onSubmit: null,
};

function CommentArea(props) {
  const { commentFocusId, onSubmit } = props;
  const [commentValue, setCommentValue] = useState("");
  const inputRef = useRef(null);

  //Keep Focus on textarea again if blogId change
  useEffect(() => {
    if (commentFocusId !== 0) {
      inputRef.current && inputRef.current.focus();
    }
  }, [commentFocusId]);

  //GetValue when value of textarea change
  function handleInputChange(e) {
    setCommentValue(e.target.value);
  }

  //Check login before comment
  //Send comment info to BlogDetail to post to server
  function handleCommentPost(e) {
    e.preventDefault();
    const commentContent = commentValue;
    let commentInfo = {};
    const token = localStorage.getItem("token");
    if (token) {
      if (commentContent.trim().length === 0) {
        alert("You have to write comment before post it");
        return;
      }
      if (onSubmit) {
        commentInfo = {
          level: 0,
          comment: commentValue,
        };
        onSubmit(commentInfo);
      }
      setCommentValue("");
      return;
    }
    alert("You need to login before comment");
  }

  return (
    <div className="comment__area">
      <h3 className="comment__area-title">Leave your comment here</h3>
      <form className="comment__area-form" onSubmit={handleCommentPost}>
        <div className="comment__area-user">
          <span>User Name</span>
        </div>
        <textarea
          ref={inputRef}
          name=""
          rows="12"
          value={commentValue}
          className="comment__area-ip"
          placeholder="Type something ..."
          onChange={handleInputChange}
        ></textarea>
        <button type="submit" className="comment__area-btn">
          Post
        </button>
      </form>
    </div>
  );
}

export default CommentArea;

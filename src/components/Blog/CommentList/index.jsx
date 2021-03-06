import React from "react";
import PropTypes from "prop-types";
import "./CommentList.scss";
import API_LINK from "../../Api/ApiLink";

CommentList.propTypes = {
  comments: PropTypes.array,
  setIsReply: PropTypes.func,
  setCommentFocusId: PropTypes.func,
};

CommentList.defaultProps = {
  comments: [],
  setIsReply: null,
  setCommentFocusId: null,
};

function CommentList(props) {
  const { comments, setIsReply, setCommentFocusId } = props;
  const api = API_LINK; //to get link image

  function handleReplyComment(e) {
    if (setIsReply) {
      //Check if user click on reply button
      const commentId = e.target.closest(".comment").dataset.id; //get commentId parent
      setCommentFocusId(parseInt(commentId)); //set state of parent comment Id in blogDetail
      setIsReply(true);
    }
  }

  return (
    <section className="comment__section">
      <div className="comment__container">
        <div className="comment__title">{comments.length} Responses</div>
        <div className="comment__list">
          {comments.map((comment, index, orgArr) => {
            if (comment.id_comment == 0) {
              return (
                <div className="comment" key={comment.id} data-id={comment.id}>
                  <div className="comment__sup">
                    <a className="comment__ava" href="#a">
                      <img
                        src={`${api}/upload/user/avatar/${comment.image_user}`}
                        alt="avatar"
                      />
                    </a>
                    <div className="comment__info">
                      <span>{comment.name_user}</span>
                      <span>{comment.updated_at.split(" ")[1]}</span>
                      <span>{comment.updated_at.split(" ")[0]}</span>
                      <p className="comment__content">{comment.comment}</p>
                      <div
                        className="comment__reply"
                        onClick={handleReplyComment}
                      >
                        Reply
                      </div>
                    </div>
                  </div>
                  <div className="comment__subs">
                    {orgArr.map((subcomment) => {
                      if (subcomment.id_comment == comment.id) {
                        return (
                          <div className="comment__sub" key={subcomment.id}>
                            <a
                              className="comment__ava comment__ava--sub"
                              href="#a"
                            >
                              <img
                                src={`${api}/upload/user/avatar/${subcomment.image_user}`}
                                alt="avatar"
                              />
                            </a>
                            <div className="comment__info">
                              <span>{subcomment.name_user}</span>
                              <span>{subcomment.updated_at.split(" ")[1]}</span>
                              <span>{subcomment.updated_at.split(" ")[0]}</span>
                              <p className="comment__content">
                                {subcomment.comment}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}

export default CommentList;

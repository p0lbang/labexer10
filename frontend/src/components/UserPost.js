import React from "react";

class UserPost extends React.Component {
  render() {
    const postData = this.props.data
    return (
      <div>
        {postData.map((postdetails) => {
          return (
            <article className="post">
              <div className="post-userinfo">
                <div>
                  <img className="post-profile-image" src={require("../images/user-01.jpg")} alt="" />
                </div>
                <div className="post-details">
                  <div className="post-name">{postdetails._id}</div>
                  <time className="post-time">{postdetails.timestamp}</time>
                </div>
              </div>
              <div className="post-content">
                <div className="post-content-text">
                  <p>{postdetails.content}</p>
                </div>
              </div>
              <div className="post-interactions">
                <div className="post-interactions-container">
                  <i className="icon icon-like"></i> <span>Like</span>
                </div>
                <div className="post-interactions-container">
                  <i className="icon icon-comment"></i> <span>Comment</span>
                </div>
                <div className="post-interactions-container">
                  <i className="icon icon-s"></i> <span>Share</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  }
}

export default UserPost;
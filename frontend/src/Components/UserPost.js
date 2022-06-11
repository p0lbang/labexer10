import React from "react";

class UserPost extends React.Component {
  render() {
    const postData = this.props.data
    return (
      <div>
        {postData.map((postdetails) => {
          return (
            <article class="post">
              <div class="post-userinfo">
                <div>
                  <img class="post-profile-image" src={require("../images/user-01.jpg")} alt="" />
                </div>
                <div class="post-details">
                  <div class="post-name">{postdetails.name}</div>
                  <time class="post-time">{postdetails.time}</time>
                </div>
              </div>
              <div class="post-content">
                <div class="post-content-text">
                  <p>{postdetails.body}</p>
                </div>
              </div>
              <div class="post-interactions">
                <div class="post-interactions-container">
                  <i class="icon icon-like"></i> <span>Like</span>
                </div>
                <div class="post-interactions-container">
                  <i class="icon icon-comment"></i> <span>Comment</span>
                </div>
                <div class="post-interactions-container">
                  <i class="icon icon-s"></i> <span>Share</span>
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
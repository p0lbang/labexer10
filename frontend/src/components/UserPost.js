import React from "react";

class UserPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem("id"),
    };

    this.deletePostHandler = this.deletePostHandler.bind(this);
  }

  deletePostHandler(e) {
    fetch("http://localhost:3001/delete/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (!body.success) {
          alert("Failed to publish post!");
        }
        console.log(body);
      });
  }

  render() {
    const postData = this.props.data;
    return (
      <div>
        {postData.map((postdetails) => {
          return (
            <article className="post">
              <div className="post-userinfo">
                <div>
                  <img
                    className="post-profile-image"
                    src={require("../images/user-01.jpg")}
                    alt=""
                  />
                </div>
                <div className="post-details">
                  <div className="post-name">{postdetails._id}</div>
                  <time className="post-time">{postdetails.timestamp}</time>
                </div>
                <div>
                  <input
                    className="btnDeletePost"
                    type="button"
                    value="delete me"
                    onClick={() => this.deletePostHandler(postdetails._id)}
                  />
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

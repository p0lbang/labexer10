import React from "react";

class UserPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.data.id,
      email: this.props.data.email,
      DisplayData: [],
    };

    this.deletePostHandler = this.deletePostHandler.bind(this);
    this.editPostHandler = this.editPostHandler.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3001/get/feed", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        email: this.state.email,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        this.setState({ DisplayData: body });
        // console.log(body)
      });
  }

  deletePostHandler(e) {
    // Send post request to delete a post
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
          console.log("Failed to publish post!");
        }
        window.location.reload(false);
      });
  }

  editPostHandler(e) {
    var newContent = prompt("Edit Post");
    if (newContent === "") {
      return;
    }
    // Send post request to delete a post
    fetch("http://localhost:3001/edit/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e,
        content: newContent,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (!body.success) {
          console.log("Failed to publish post!");
        }
        window.location.reload(false);
      });
  }

  parseImagefile(imageFilename) {
    try {
      return require("../images/" + imageFilename);
    } catch (err) {
      return require("../images/default-profile.jpg");
    }
  }

  deleteBtn(postdetails) {
    if (postdetails.poster_id._id === this.state.id) {
      return (
        <div id="postButtons">
          <input
            className="btnfunctions btnEditPost"
            type="button"
            value="Edit"
            onClick={() => this.editPostHandler(postdetails._id)}
          />
          <input
            className="btnfunctions btnDeletePost"
            type="button"
            value="Delete"
            onClick={() => this.deletePostHandler(postdetails._id)}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.DisplayData.map((postdetails) => {
          return (
            <article className="post">
              <div className="post-userinfo">
                <div>
                  <img
                    className="post-profile-image"
                    src={this.parseImagefile(postdetails.imageFilename)}
                    alt=""
                  />
                </div>
                <div className="post-details">
                  <div className="post-name">
                    {postdetails.poster_id.firstname +
                      " " +
                      postdetails.poster_id.lastname}
                  </div>
                  <time className="post-time">{postdetails.timestamp}</time>
                </div>
                <div id="postSpacer"></div>
                {this.deleteBtn(postdetails)}
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

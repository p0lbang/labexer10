import React from "react";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageFilename: "",
      id: localStorage.getItem("id"),
    };

    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    e.preventDefault();
    let txtarea = document.getElementById("postInput");

    if (txtarea.value === "") {
      return;
    }

    fetch("http://localhost:3001/create/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        content: txtarea.value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (!body.success) {
          console.log("Failed to publish post!");
        }else{
          window.location.reload(false);
        }
      });
  }

  parseImagefile(imageFilename) {
    try {
      return require("../images/" + imageFilename);
    } catch (err) {
      return require("../images/default-profile.jpg");
    }
  }

  render() {
    return (
      <div id="postFormContainer">
        <div id="postFormLeft">
          <img
            className="post-profile-image"
            src={this.parseImagefile(this.state.imageFilename)}
            alt=""
          />
        </div>
        <form id="postForm" onSubmit={this.inputHandler}>
          <textarea
            id="postInput"
            className="input"
            placeholder="What's on your mind?"
          ></textarea>
          <input id="submitPost" type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

export default PostForm;

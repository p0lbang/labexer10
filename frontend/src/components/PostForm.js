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
    let txtarea = document.getElementById("postInput").value;

    if (txtarea === "") {
      e.preventDefault();
      return;
    }
    
    fetch("http://localhost:3001/create/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        content: txtarea,
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

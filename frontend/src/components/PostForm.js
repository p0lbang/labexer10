import React from "react";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    e.preventDefault();
    let txtarea = document.getElementById("postInput").value;

    if (txtarea === "") {

      fetch("http://localhost:3001/create/friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requester_id: localStorage.getItem("id"),
        receiver_id: "62a4bed9f903bd7828059abb",
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          alert("Successfully add user!");
        } else {
          alert("Failed to add user.");
        }
      });

      return;
    }
    e.preventDefault();
    fetch("http://localhost:3001/create/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "62a4bf23f903bd7828059abf",
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

  render() {
    return (
      <div id="postFormContainer">
        <div id="postFormLeft">
          <img
            className="post-profile-image"
            src={require("../images/user-01.jpg")}
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

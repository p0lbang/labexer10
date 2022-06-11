import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";
import FriendItem from "../components/FriendItem";
import UserPost from "../components/UserPost";
import SponsorItem from "../components/SponsorItem";
import Header from "../components/Header";

const userData = [{ name: "Van Paul" }];

const postData = [
  { name: "Van Paul Dayag", time: "11:59 PM", body: "Hello World!" },
  { name: "User1", time: "11:59 PM", body: "this is an example text" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
  { name: "User2", time: "11:59 PM", body: "this is the body" },
];

const friendsData = [
  { name: "Miyah Queliste", imageFilename: "friend-01.jpg" },
  { name: "Sie Maranan", imageFilename: "friend-02.jpg" },
  { name: "Vanessa Pia Dayag", imageFilename: "friend-03.jpg" },
  { name: "Van Peter Dayag", imageFilename: "friend-04.jpg" },
];

const sponsorsData = [{ text: "Keychron k8", image: "ads.gif" }];

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null,
      username: localStorage.getItem("username"),
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // Send POST request to check if user is logged in
    fetch("http://localhost:3001/checkifloggedin", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.isLoggedIn) {
          this.setState({
            checkedIfLoggedIn: true,
            isLoggedIn: true,
            username: localStorage.getItem("username"),
          });
        } else {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: false });
        }
      });
  }

  logout(e) {
    e.preventDefault();

    // Delete cookie with authToken
    const cookies = new Cookies();
    cookies.remove("authToken");

    // Delete username in local storage
    localStorage.removeItem("username");

    this.setState({ isLoggedIn: false });
  }

  render() {
    if(this.state.isLoggedIn){

    return (
      <div>
        <Header data={userData} />
        <aside id="sidebar_left" class="sidebar">
          <div>Contacts</div>
          <ul>
            <FriendItem data={friendsData} />
          </ul>
        </aside>
        <aside id="sidebar_right" class="sidebar">
          <div>Sponsored</div>
          <SponsorItem data={sponsorsData} />
        </aside>

        <main id="main">
          <div id="postFormContainer">
            <div id="postFormLeft">
              <img
                class="post-profile-image"
                src={require("../images/user-01.jpg")}
                alt=""
              />
            </div>
            <form id="postForm">
              <textarea
                id="postInput"
                class="input"
                placeholder="What's on your mind?"
              ></textarea>
              <input id="submitPost" type="submit" value="Post" />
            </form>
          </div>
          <UserPost data={postData} />
        </main>
      </div>
    );
  }else{
    <Navigate to="/log-in" />
  }

  }
}

export default Feed;

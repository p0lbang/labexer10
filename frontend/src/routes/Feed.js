import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";
import FriendItem from "../components/FriendItem";
import UserPost from "../components/UserPost";
import SponsorItem from "../components/SponsorItem";
import Header from "../components/Header";
import PostForm from "../components/PostForm";

const userData = [{ name: "Van Paul" }];

const sponsorsData = [{ text: "Keychron k8", image: "ads.gif" }];

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null,
      email: localStorage.getItem("email"),
      id: localStorage.getItem("id"),
      postData: [],
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
          });
        } else {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: false });
        }
      });
    // //send post request to get feed
    // fetch("http://localhost:3001/get/feed", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     id: this.state.id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((body) => {
    //     this.setState({ postData: body });
    //     console.log(body);
    //   });
  }

  logout(e) {
    e.preventDefault();

    // Delete cookie with authToken
    const cookies = new Cookies();
    cookies.remove("authToken");

    // Delete username in local storage
    localStorage.removeItem("id");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");

    this.setState({ isLoggedIn: false });
    // return <Navigate to="/log-in" />;
  }

  render() {
    if (!this.state.checkedIfLoggedIn) {
      return <div></div>;
    }

    if (!this.state.isLoggedIn) {
      return <Navigate to="/log-in" />;
    }

    return (
      <div>
        <Header data={userData} handleClick={this.logout} />
        <aside id="sidebar_left" className="sidebar">
          <div>Contacts</div>
          <ul>
            <FriendItem data={{
              id: this.state.id,
              email: this.state.email,
            }} />
          </ul>
        </aside>
        <aside id="sidebar_right" className="sidebar">
          <div>Sponsored</div>
          <SponsorItem data={sponsorsData} />
        </aside>

        <main id="main">
          <PostForm />
          <UserPost
            data={{
              id: this.state.id,
              email: this.state.email,
            }}
          />
        </main>
      </div>
    );
  }
}

export default Feed;

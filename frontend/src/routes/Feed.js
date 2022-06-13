import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";
import FriendRequestSent from "../components/FriendRequestSent";
import FriendRequest from "../components/FriendRequest";
import FriendItem from "../components/FriendItem";
import UserPost from "../components/UserPost";
import SponsorItem from "../components/SponsorItem";
import Header from "../components/Header";
import PostForm from "../components/PostForm";

const sponsorsData = [{ text: "Keychron k8", image: "ads.gif" }];

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null,
      email: localStorage.getItem("email"),
      id: localStorage.getItem("id"),
      firstname: localStorage.getItem("firstname"),
      lastname: localStorage.getItem("lastname"),
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
        <Header
          data={{
            name: this.state.firstname + " " + this.state.lastname,
          }}
          handleClick={this.logout}
        />
        <aside id="sidebar_left" className="sidebar">
          <div>Friend Requests</div>
          <ul>
            <FriendRequest
              data={{
                id: this.state.id,
                email: this.state.email,
              }}
            />
          </ul>
          <div>Pending Friend Requests</div>
          <ul>
            <FriendRequestSent
              data={{
                id: this.state.id,
                email: this.state.email,
              }}
            />
          </ul>
          <div>Friends</div>
          <ul>
            <FriendItem
              data={{
                id: this.state.id,
                email: this.state.email,
              }}
            />
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

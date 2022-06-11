import React from "react";
import "./App.css";
import FriendItem from "./components/FriendItem";
import UserPost from "./components/UserPost";
import SponsorItem from "./components/SponsorItem";
import Header from "./components/Header";
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home';

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

function App() {
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
              src={require("./images/user-01.jpg")}
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
}

export default App;

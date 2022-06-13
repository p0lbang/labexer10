import React from "react";
import "./Login.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <form id="login-from" action="">
          <img
            className="website-logo"
            src={require("../images/icons/bookface.jpg")}
            alt=""
          />
          <h1>Book Face</h1>
          <a href="/log-in">
            <input className="homepage-button" type="button" value="Login" />
          </a>
          <br />
          <br />
          <a href="/sign-up">
            <input className="homepage-button" type="button" value="Sign Up" />
          </a>
        </form>
      </div>
    );
  }
}

export default Home;

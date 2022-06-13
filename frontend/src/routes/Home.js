import React from "react";
import "./Login.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <form id="login-from" action="">
          <h1>Home Page</h1>
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

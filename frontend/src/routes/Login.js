import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Login.css";

const validatePassword = (input1) => {
  if (input1.length < 8) {
    return false;
  }

  let containsNumber = false;
  let containsUpperCase = false;
  let containsLowerCase = false;

  for (let i = 0; i < input1.length; i++) {
    if (parseInt(input1[i])) {
      containsNumber = true;
    } else if (input1[i] === input1[i].toUpperCase()) {
      containsUpperCase = true;
    } else if (input1[i] === input1[i].toLowerCase()) {
      containsLowerCase = true;
    }
  }

  if (containsNumber && containsUpperCase && containsLowerCase) {
    return true;
  }
  return false;
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
  }

  changeLogin() {
    this.setState({ isLoggedIn: true });
  }

  formSubmit(e) {
    if (!validatePassword(this.state.password)) {
      e.preventDefault();
      alert("invalid password");
      return;
    }

    e.preventDefault();
    // POST request to the server
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (!body.success) {
          alert("Failed to login!");
        } else {
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3001/",
            age: 60 * 60,
            sameSite: "lax",
          });

          localStorage.setItem("id", body.id);
          localStorage.setItem("email", body.email);
          localStorage.setItem("firstname", body.firstname);
          localStorage.setItem("lastname", body.lastname);

          this.changeLogin();
        }
      });
  }

  inputHandler(e) {
    switch (e.target.id) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/feed" />;
    }

    return (
      <div>
        <form id="login-from" action="" onSubmit={this.formSubmit}>
          <h1>LOGIN</h1>
          <label className="label">Email:</label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={this.state.email}
            onChange={this.inputHandler}
            required={true}
          />
          <br />
          <label className="label">Password:</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={this.state.password}
            onChange={this.inputHandler}
            required={true}
          />
          <br />
          <input className="homepage-button" type="submit" value="Login" />
          <a className="login" href="/sign-up">
            Sign up now
          </a>
        </form>
      </div>
    );
  }
}

export default Login;

import React from "react";
import "../App.css";

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
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  formSubmit(e) {
    if (!validatePassword(this.state.password)) {
      e.preventDefault();
      alert("invalid password");
      return;
    }
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
    return (
      <div>
        <form action="" onSubmit={this.formSubmit}>
          <label className="label">Email:</label>
          <input
            type="email"
            id="email"
            className="input"
            value={this.state.email}
            onChange={this.inputHandler}
            required={true}
          />
          <br />
          <label className="label">Password:</label>
          <input
            type="password"
            id="password"
            className="input"
            value={this.state.password}
            onChange={this.inputHandler}
            required={true}
          />
          <br />
          <input id="btnSignUp" type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default Login;

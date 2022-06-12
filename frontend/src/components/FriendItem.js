import React from "react";

class FriendItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.data.id,
      email: this.props.data.email,
      DisplayData: [],
    };
  }

  componentDidMount() {
    // Send post request to get feed
    fetch("http://localhost:3001/get/friends", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        id: this.state.id,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        this.setState({ DisplayData: body });
        console.log(body);
      });
  }

  parseDisplayData(data) {
    try {
      return data.requester_id.firstname + " " + data.requester_id.lastname;
    } catch (err) {
      return data.receiver_id.firstname + " " + data.receiver_id.lastname;
    }
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
      <li>
        {this.state.DisplayData.map((data) => {
          return (
            <div className="sidebar-item">
              <span>
                <img src={this.parseImagefile(data.imageFilename)} alt="" />
              </span>
              <span>{this.parseDisplayData(data)}</span>
            </div>
          );
        })}
      </li>
    );
  }
}

export default FriendItem;

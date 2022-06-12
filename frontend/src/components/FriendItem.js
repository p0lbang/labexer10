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

  render() {
    return (
      <li>
        {this.state.DisplayData.map((data) => {
          return (
            <div className="sidebar-item">
              <span>
                <img
                  src={'require("../images/" + data.imageFilename)'}
                  alt=""
                />
              </span>
              <span>{data.receiver_id.firstname + " " + data.receiver_id.lastname}</span>
            </div>
          );
        })}
      </li>
    );
  }
}

export default FriendItem;

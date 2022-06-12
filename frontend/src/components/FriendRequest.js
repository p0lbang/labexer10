import React from "react";

class FriendRequest extends React.Component {
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
    fetch("http://localhost:3001/get/friendrequest/recieved", {
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
              <div>
              <span>
                <img
                  src={'require("../images/" + data.imageFilename)'}
                  alt=""
                />
              </span>
              <span>{data.requester_id}</span>
              </div>
              <div>
                <input type="button" value="Accept" />
                <input type="button" value="Reject" />
              </div>
            </div>
          );
        })}
      </li>
    );
  }
}

export default FriendRequest;

import React from "react";

class FriendRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.data.id,
      email: this.props.data.email,
      DisplayData: [],
    };

    this.acceptRequest = this.acceptRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }
  acceptRequest(e) {
    fetch("http://localhost:3001/accept/friendrequest/recieved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requester_id: e,
        receiver_id: this.state.id,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (!body.success) {
          console.log("Failed to accept fr!");
        }
        window.location.reload(false);
      });
  }

  rejectRequest(e) {
    fetch("http://localhost:3001/reject/friendrequest/recieved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requester_id: e,
        receiver_id: this.state.id,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (!body.success) {
          console.log("Failed to reject fr!");
        }
        window.location.reload(false);
      });
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
      });
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
            <div className="sidebar-item-group">
              <div className="sidebar-item-group-user">
                <span>
                  <img
                    className="sidebar-item-image"
                    src={this.parseImagefile(data.imageFilename)}
                    alt=""
                  />
                </span>
                <span>
                  {data.requester_id.firstname +
                    " " +
                    data.requester_id.lastname}
                </span>
              </div>
              <div className="sidebar-item-group-buttons">
                <input
                  type="button"
                  value="Accept"
                  onClick={(e) => {
                    this.acceptRequest(data.requester_id._id);
                  }}
                />
                <input
                  type="button"
                  value="Reject"
                  onClick={(e) => {
                    this.rejectRequest(data.requester_id._id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </li>
    );
  }
}

export default FriendRequest;

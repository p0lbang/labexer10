import React from "react";

class FriendRequestSent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.data.id,
      email: this.props.data.email,
      DisplayData: [],
    };

    this.cancelRequest = this.cancelRequest.bind(this);
  }

  cancelRequest(e) {
    fetch("http://localhost:3001/cancel/friendrequest/sent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requester_id: this.state.id,
        receiver_id: e,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (!body.success) {
          alert("Failed to cancel fr!");
        }
      });
  }

  componentDidMount() {
    // Send post request to get feed
    fetch("http://localhost:3001/get/friendrequest/sent", {
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
            <div className="sidebar-item">
              <div>
                <span>
                  <img
                  className="sidebar-item-image"
                    src={this.parseImagefile(data.imageFilename)}
                    alt=""
                  />
                </span>
                <span>
                  {data.receiver_id.firstname + " " + data.receiver_id.lastname}
                </span>
              </div>
              <div>
                <input
                  type="button"
                  value="Reject"
                  onClick={() => this.cancelRequest(data.receiver_id._id)}
                />
              </div>
            </div>
          );
        })}
      </li>
    );
  }
}

export default FriendRequestSent;

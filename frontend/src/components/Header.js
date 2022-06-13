import React from "react";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem("id"),
      search: "",
      results: [],
    };

    this.searchHandler = this.searchHandler.bind(this);
    this.friendRequest = this.friendRequest.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }

  friendRequest(e) {
    fetch("http://localhost:3001/send/friendrequest", {
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
          alert(body.message);
        } else {
          alert(body.message);
        }
      });
  }

  searchHandler(e) {
    this.setState({ search: e.target.value });
    if (e.target.value === "") {
      return;
    }

    fetch("http://localhost:3001/find/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.length === 0) {
          document.getElementById("listofitem").style.display = "none";
        } else {
          document.getElementById("listofitem").style.display = "block";
          this.setState({ results: body });
          console.log(body);
        }
      });
  }

  hideSearch() {
    document.getElementById("listofitem").style.display = "none";
  }

  addbtn(user) {
    if (user._id !== this.state.id) {
      return (
        <input
          className="btnaddfriend"
          type="button"
          value="Add Friend"
          onClick={() => {
            this.friendRequest(user._id);
          }}
        />
      );
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
    const USERS = this.state.results;
    return (
      <div>
        <header>
          <div id="header-left" className="header-group">
            <div className="search-group sidebar-item">
              <span>
                <img src={require("../images/icons/bookface.jpg")} alt="" />
              </span>
              <span>
                <div>
                  <span id="search-icon">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      className="a8c37x1j ms05siws l3qrxjdp b7h9ocf4 py1f6qlh gl3lb2sf hhz5lgdu"
                    >
                      <g fillRule="evenodd" transform="translate(-448 -544)">
                        <g fillRule="nonzero">
                          <path
                            d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                            transform="translate(448 544)"
                          ></path>
                          <path
                            d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                            transform="translate(448 544)"
                          ></path>
                          <path
                            d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                            transform="translate(448 544)"
                          ></path>
                          <path
                            d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                            transform="translate(448 544)"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <span>
                    <input
                      type="text"
                      name=""
                      id="searchInput"
                      className="input"
                      placeholder="Search Facebook"
                      onChange={this.searchHandler}
                      // onBlur={this.hideSearch}
                    />
                  </span>
                  <ol id="listofitem">
                    {USERS.map((user) => {
                      return (
                        <li>
                          <div>
                            {user.firstname} {user.lastname}
                          </div>
                          <div>{user.email}</div>
                          <div>{this.addbtn(user)}</div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </span>
            </div>
          </div>
          <div id="header-center" className="header-group"></div>
          <div id="header-right" className="header-group">
            <div className="header-group">
              <div className="profile-group">
                <span>
                  <img
                    src={this.parseImagefile(this.props.data.imageFilename)}
                    alt=""
                  />
                </span>
                <span>{this.props.data.name}</span>
              </div>
              <span>
                <div className="icon-svg" onClick={this.props.handleClick}>
                  <i className="icon2 icon-logout"></i>
                </div>
              </span>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;

import React from "react";

class FriendItem extends React.Component {
  render() {
    const VALUES = this.props.data;
    return (
      <li>
        {VALUES.map((data) => {
          return (
            <div className="sidebar-item">
              <span>
                <img src={require("../images/"+data.imageFilename)} alt="" />
              </span>
              <span>{data.name}</span>
            </div>
          );
        })}
      </li>
    );
  }
}

export default FriendItem;

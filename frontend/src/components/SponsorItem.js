import React from "react";

class SponsorItem extends React.Component {
  render() {
    const VALUES = this.props.data;
    return (
      <div>
        {VALUES.map((data) => {
          return (
            <div className="divider-div">
              <img
                className="sponsorImage"
                src={require("../images/" + data.image)}
                alt=""
              />
              <p>{data.text}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SponsorItem;

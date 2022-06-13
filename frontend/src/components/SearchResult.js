import React from "react";

class SearchResult extends React.Component {
  render() {
    const VALUES = this.state.data;
    return (
      <li>
        {VALUES.map((data) => {
          return <li>{data._id}</li>;
        })}
      </li>
    );
  }
}

export default SearchResult;

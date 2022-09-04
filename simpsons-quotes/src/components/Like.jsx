import React, { Component } from "react";

class Like extends Component {
  //   state = { liked: false }; << removed this as need to raise the state to get total number of likes
  render() {
    return (
      <button onClick={() => this.props.onLike(this.props.id)}>
        {this.props.liked ? "Dislike" : "Like"}
      </button>
    );
  }
}

export default Like;

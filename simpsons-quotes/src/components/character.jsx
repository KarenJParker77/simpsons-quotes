import React, { Component } from "react";
// This is a component that makes a character. A character component only knows about one character
import Name from "./name";
import Image from "./image";
import Quote from "./quote";
import Like from "./Like";

// props (below) from parent to child only
class Character extends Component {
  // receives a title and makes a div with the title for each iteration/version
  render() {
    // good to destructure as below - makes life easier! Pulling things out of an object
    const { quote, image, characterDirection, character, id, liked } =
      this.props.item;
    const { onLike, onDelete } = this.props;

    if (characterDirection === "Right") {
      return (
        <div className="character">
          <Name name={character} />
          <Quote quote={quote} />
          <Image image={image} />
          <Like onLike={onLike} liked={liked} id={id} />
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      );
    }
    // don't need "else" because we've returned above so nothing else will run
    return (
      <div className="character">
        <Name name={character} />
        <Image image={image} />
        <Quote quote={quote} />
        <Like onLike={onLike} liked={liked} id={id} />
        {/* anonymous function below so that () don't call function until click*/}
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    );
  }
}

export default Character;

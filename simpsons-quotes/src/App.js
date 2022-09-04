import React, { Component } from "react";
import Character from "./components/character";
import axios from "axios";
import "./App.css";
import Simpsons from "./simpsons.json";

class App extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
  }

  state = { searchTerm: "" };

  // componentDidMount is where we ask for API data
  async componentDidMount() {
    try {
      const apiData = await axios.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes?count=50"
      );

      // this.searchInput.current.focus();

      //the forEach gives each item a unique ID
      apiData.data.forEach((element, index) => {
        element.id = index;
      });

      this.searchInput.current.focus();

      // could be in utils file
      apiData.data.sort((char1, char2) => {
        if (char1.character > char2.character) return 1;
        if (char1.character < char2.character) return -1;

        return 0;
      });
      // put data from api in state
      this.setState({ apiData: apiData.data });
    } catch (error) {
      Simpsons.forEach((element, index) => {
        element.id = index;
      });

      this.setState({ apiData: Simpsons });
    }
  }

  onLike = (id) => {
    const index = this.state.apiData.findIndex((item) => {
      return item.id === id;
    });

    const apiData = [...this.state.apiData];
    // each time clicked will update data by giving it the property 'liked'
    if (apiData[index].liked === true) {
      apiData[index].liked = false;
    } else {
      apiData[index].liked = true;
    }

    this.setState({ apiData });
  };

  onDelete = (id) => {
    // finds position of data in array
    const index = this.state.apiData.findIndex((item) => {
      return item.id === id;
    });

    const apiData = [...this.state.apiData];
    // array, minus the item just found
    apiData.splice(index, 1);
    //below, keys and values can be the same in ES6 so the below is saying put copy called apiData back into itself
    this.setState({ apiData });
  };

  render() {
    const { apiData, searchTerm } = this.state;

    if (apiData === undefined) {
      return <h1>Loading.....</h1>;
    }

    let total = 0;
    apiData.forEach((item) => {
      if (item.liked === true) {
        console.log(item);
        total += 1;
      }
    });

    // search
    const filtered = [...this.state.apiData].filter((item) => {
      return item.character.toLowerCase().includes(searchTerm.toLowerCase());
    });
    // below gives all data if the search is empty, or some data if user has typed in search
    const results = filtered.length > 0 ? filtered : apiData;

    return (
      <>
        <input
          ref={this.searchInput}
          type="text"
          onInput={(e) => {
            this.setState({ searchTerm: e.target.value });
          }}
        />
        <h1>Total: {total}</h1>
        {results.map((item) => (
          <Character
            className="character"
            // ideally keys and values have the same name
            item={item}
            key={item.id}
            onDelete={this.onDelete}
            onLike={this.onLike}
          />
        ))}
        ;
      </>
    );
  }
}

export default App;

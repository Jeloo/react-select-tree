import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./multistep-select/MultistepSelect";

import MultistepSelect from "./multistep-select/MultistepSelect";

class App extends Component {
  constructor(props) {
    super(props);
    // some dummy data for testing purposes
    this.state = {
      data: [
        { id: 1, parentId: 0, children: [2, 3, 4], name: "Transport" },
        { id: 2, parentId: 1, children: [], name: "Cars" },
        { id: 3, parentId: 1, children: [], name: "Moto" },
        { id: 4, parentId: 1, children: [], name: "Trucks" },
        { id: 5, parentId: 1, children: [], name: "Buses" },
        { id: 6, parentId: 1, children: [], name: "Water transport" },
        { id: 7, parentId: 1, children: [], name: "Other transport" },

        { id: 8, parentId: 0, children: [], name: "Electronics" },
        { id: 9, parentId: 8, children: [], name: "Electronics" },
        { id: 10, parentId: 8, children: [], name: "Electronics" },
        { id: 11, parentId: 8, children: [], name: "Electronics" },
        { id: 12, parentId: 8, children: [], name: "Electronics" },
        { id: 13, parentId: 8, children: [], name: "Electronics" },

        { id: 14, parentId: 0, children: [], name: "Jobs" }
      ],
      selection: [1]
    };
  }

  addItem(itemId) {
    this.setState({ selection: [...this.state.selection, ...[itemId]] });
  }

  removeItem(item) {
    const index = this.state.selection.indexOf(item.id);

    if (index > -1) {
      const selection = [...this.state.selection];
      selection.splice(index, 1);
      this.setState({ selection });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Turn-based react select component</h1>
        </header>
        <p className="App-intro">
          The component helps you to select elements of tree-like data structure
          step by step, level by level
        </p>

        <p>
          Example usage: you are using the marketplace and you are looking for
          the ads from some specific categories or subcategories.
        </p>

        <MultistepSelect
          data={this.state.data}
          selection={this.state.selection}
          onConfirm={this.addItem.bind(this)}
          onRemove={this.removeItem.bind(this)}
        />

        {this.state.error}
      </div>
    );
  }
}

export default App;

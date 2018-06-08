import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MultipleSelectedListNested from "./multistep-select/MultipleSelectedListNested";
import dummyData from "./data.json";
import MultistepSelect from "./multistep-select/MultistepSelect";
import classnames from "classnames";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dummyData,
      selection: [1]
    };
  }

  addItem(itemId) {
    this.setState({ selection: [...this.state.selection, ...[itemId]] });
  }

  removeItem(itemId) {
    const index = this.state.selection.indexOf(itemId);

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
        <div className={classnames("row")}>
          <MultistepSelect
            data={this.state.data}
            selection={this.state.selection}
            onConfirm={this.addItem.bind(this)}
            onRemove={this.removeItem.bind(this)}
            selectedListComponent={MultipleSelectedListNested}
            classNamesConfig={{
              selectContainer: ["App-container"],
              select: ["App-select"],
              confirmBtn: ["Button Button--success"],
              resetBtn: ["Button Button--danger"],
              buttonsContainer: ["ButtonGroup-container"]
            }}
            maxCount={3}
          />
        </div>

        <p>
          You can pass the specific component to customize rendering of selected
          items:
        </p>
      </div>
    );
  }
}

export default App;

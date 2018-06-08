import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MultipleSelectedListNested from "./multistep-select/MultipleSelectedListNested";
import dummyData from "./data.json";
import MultistepSelect from "./multistep-select/MultistepSelect";
import MultipleSelectConsumer from "./MultistepSelectConsumer";
import classnames from "classnames";

class App extends Component {
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
          <MultipleSelectConsumer initialSelection={[1, 2]}>
            {(addItem, removeItem, selection) => (
              <MultistepSelect
                data={dummyData}
                selection={selection}
                onConfirm={addItem}
                onRemove={removeItem}
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
            )}
          </MultipleSelectConsumer>
        </div>

        <p>
          It provides ability to limit the selection (limited to 2 items, so you
          are not able to select anymore):
        </p>

        <div className={classnames("row")}>
          <MultipleSelectConsumer initialSelection={[1, 2]}>
            {(addItem, removeItem, selection) => (
              <MultistepSelect
                data={dummyData}
                selection={selection}
                onConfirm={addItem}
                onRemove={removeItem}
                selectedListComponent={MultipleSelectedListNested}
                classNamesConfig={{
                  selectContainer: ["App-container"],
                  select: ["App-select"],
                  confirmBtn: ["Button Button--success"],
                  resetBtn: ["Button Button--danger"],
                  buttonsContainer: ["ButtonGroup-container"]
                }}
                maxCount={2}
              />
            )}
          </MultipleSelectConsumer>
        </div>

        <p>
          You can pass the specific component to customize rendering of selected
          items:
        </p>

        <div className={classnames("row")}>
          <MultipleSelectConsumer initialSelection={[1, 2]}>
            {(addItem, removeItem, selection) => (
              <MultistepSelect
                data={dummyData}
                selection={selection}
                onConfirm={addItem}
                onRemove={removeItem}
                selectedListComponent={props => {
                  return (
                    <ul>
                      {props.selection.map(item => (
                        <li key={item.id}>
                          {item.name}{" "}
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={props.onRemove.bind(null, item.id)}
                          >
                            [X]
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }}
                classNamesConfig={{
                  selectContainer: ["App-container"],
                  select: ["App-select"],
                  confirmBtn: ["Button Button--success"],
                  resetBtn: ["Button Button--danger"],
                  buttonsContainer: ["ButtonGroup-container"]
                }}
              />
            )}
          </MultipleSelectConsumer>
        </div>
      </div>
    );
  }
}

export default App;

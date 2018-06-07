import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './multistep-select/MultistepSelect';
import MultistepSelect from "./multistep-select/MultistepSelect";

class App extends Component {

  constructor(props) {
    super(props);
    // some dummy data for testing purposes
    this.state = {
      data: [
        {id: 1, parentId: 0, children: [], name: 'Root'}
      ],
      //selection: [1]
    }
  }

  addItem(item) {
    this.setState({selection: [...this.state.selection, ...[item]]})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <MultistepSelect
          data={this.state.data}
          selection={this.state.selection}
          onConfirm={this.addItem.bind(this)}
        />
      </div>
    );
  }
}

export default App;

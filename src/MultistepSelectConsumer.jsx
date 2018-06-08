import { Component } from "react";

class MultistepSelectConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: this.props.initialSelection || []
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
    return this.props.children(
      this.addItem.bind(this),
      this.removeItem.bind(this),
      this.state.selection
    );
  }
}

export default MultistepSelectConsumer;

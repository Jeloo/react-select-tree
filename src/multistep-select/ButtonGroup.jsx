import React, { Component } from "react";
import PropTypes from "prop-types";

class ButtonGroup extends Component {
  renderConfirmButton() {
    const { readyToConfirm, confirmText = "Add" } = this.props;

    if (!readyToConfirm) {
      return null;
    }

    return (
      <input type="button" value={confirmText} onClick={this.props.onConfirm} />
    );
  }

  renderResetButton() {
    if (this.props.readyToConfirm) {
      return <button onClick={this.props.onReset}>Reset</button>;
    }
  }

  render() {
    return (
      <div>
        {this.renderConfirmButton()}
        {this.renderResetButton()}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  onReset: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  selectedItemName: PropTypes.string,
  itemHasChildren: PropTypes.bool,
  readyToConfirm: PropTypes.bool,
  confirmText: PropTypes.string
};

export default ButtonGroup;

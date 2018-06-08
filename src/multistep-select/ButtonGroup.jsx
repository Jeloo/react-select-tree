import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class ButtonGroup extends Component {
  renderConfirmButton() {
    const {
      readyToConfirm,
      confirmText = "Add",
      classNamesConfirmBtn
    } = this.props;

    if (!readyToConfirm) {
      return null;
    }

    return (
      <input
        type="button"
        value={confirmText}
        onClick={this.props.onConfirm}
        className={classnames(classNamesConfirmBtn)}
      />
    );
  }

  renderResetButton() {
    if (this.props.readyToConfirm) {
      return (
        <button
          onClick={this.props.onReset}
          className={classnames(this.props.classNamesResetBtn)}
        >
          Reset
        </button>
      );
    }
  }

  render() {
    return (
      <div className={classnames(this.props.classNamesButtonsContainer)}>
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import NestedUtils from "./../multistep-select/NestedUtils";

class MultipleSelectedListNested extends Component {
  generateItemName(item) {
    const data = this.props.nestedUtils.orderFromParentsToChildren(item.id);

    const names = data.map(item => item.name);

    return names.join(" \u2023 ");
  }

  onRemove(item) {
    this.props.onRemove(item);
  }

  render() {
    const items = this.props.nestedUtils.findByIds(this.props.selection);

    const list = items.map(item => {
      return (
        <span key={item.id} className="Select-multi-value-wrapper">
          <div className="Select-value">
            <span
              className="Select-value-icon"
              aria-hidden
              onClick={this.onRemove.bind(this, item.id)}
            >
              ×
            </span>
            <span
              className="Select-value-label"
              role="option"
              aria-selected
              id="react-select-3--value-1"
            >
              {this.generateItemName(item)}
              <span className="Select-aria-only">&nbsp;</span>
            </span>
          </div>
        </span>
      );
    });

    if (items.length) {
      return <div className="Select--multi">{list}</div>;
    } else {
      return null;
    }
  }
}

MultipleSelectedListNested.propTypes = {
  nestedUtils: PropTypes.instanceOf(NestedUtils).isRequired,
  selection: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  deleteButtonText: PropTypes.string
};

export default MultipleSelectedListNested;

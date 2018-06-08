import React, { Component } from "react";
import NestedUtils from "./NestedUtils";
import Select, { Creatable } from "react-select";
import classNames from "classnames";
import "react-select/dist/react-select.css";

/**
 * @property {array}               data
 * @property {number}              selectedItemId
 */
export class InputGroup extends Component {
  constructor(props) {
    super(props);
    this.nestedUtils = new NestedUtils(props.data);
    this.placeholder = this.props.placeholder || "Start to type...";

    this.state = {
      maxLengthError: null
    };
  }

  componentDidMount() {
    if (this.activeSelect) {
      this.activeSelect.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    // set data to utility when the component data prop is updated
    this.nestedUtils.data = nextProps.data;
  }

  onSelect(option) {
    // check if event handler is not called by clearance
    if (option) {
      // value will contain the item id
      this.props.onSelect(option.value);
    }
  }

  onInputChange(value) {
    if (!this.props.creatable || !this.props.maxCreatableLength) {
      this.setState({ maxLengthError: null });
      return value;
    }

    if (this.props.maxCreatableLength < value.length) {
      this.setState({ maxLengthError: "You've reached your limit." });
      return value.substring(0, this.props.maxCreatableLength);
    } else {
      this.setState({ maxLengthError: null });
      return value;
    }
  }

  getDataForNewSelection() {
    const itemId = this.props.currentItemId;

    let data = [];

    if (!itemId) {
      data = this.nestedUtils.getRootItems();
    } else if (this.nestedUtils.hasChildren(itemId)) {
      data = this.nestedUtils.getChildren(itemId);
    }

    return data;
  }

  getDataForSelectedItem(itemId) {
    return this.nestedUtils.getNeighbours(itemId);
  }

  getOptions(data) {
    return data.map(item => {
      return { value: item.id, label: item.name + this.getIcon(item) };
    });
  }

  getIcon(item) {
    const nonBreakSpace = "\u00A0";

    return this.nestedUtils.hasChildren(item.id)
      ? `${nonBreakSpace}\u2023`
      : "";
  }

  renderInputs() {
    const itemId = this.props.currentItemId;

    if (this.props.data.length < 1 || !itemId) {
      return null;
    }

    if (itemId instanceof Object && itemId.custom) {
      return this.renderCustomInput(itemId);
    }

    const items = this.nestedUtils.orderFromParentsToChildren(itemId);

    return items.map(item => {
      const data = this.getDataForSelectedItem(item.id);
      const options = this.getOptions(data);

      return (
        <div className="col-xs-12 col-sm mb-2" key={item.id}>
          <Select
            className="select-success select-no-x clickable"
            value={item.id}
            options={options}
            placeholder={this.placeholder}
            onChange={this.onSelect.bind(this)}
          />
        </div>
      );
    });
  }

  renderCustomInput(item) {
    return (
      <div className="col-xs-12 col-sm mb-2" key={item.id}>
        <Select
          className="select-success select-no-x clickable"
          value={item.id}
          options={this.getOptions(this.nestedUtils.getRootItems())}
          placeholder={this.placeholder}
          autosize={false}
          onChange={this.onSelect.bind(this)}
          disabled={this.props.selectionDisabled}
        />
      </div>
    );
  }

  renderError() {
    if (!this.props.error || this.props.currentItemId) {
      return null;
    }

    return (
      <div className={classNames("form-control-feedback", "error-block")}>
        {this.props.error}
      </div>
    );
  }

  onNewOption(newOption) {
    return {
      value: {
        id: newOption.label,
        name: newOption.label,
        custom: true
      },
      label: newOption.label,
      className: "Select-create-option-placeholder"
    };
  }

  renderInputForNewSelection() {
    const itemId = this.props.currentItemId;

    //console.log(itemId, !this.nestedUtils.hasChildren(itemId));
    if (itemId && !this.nestedUtils.hasChildren(itemId)) {
      return null;
    }

    const data = this.getDataForNewSelection();
    const options = this.getOptions(data);

    const SelectComponent = this.props.creatable ? Creatable : Select;

    return (
      <div className={classNames("col-xs-12 col-sm mb-2")}>
        <SelectComponent
          options={options}
          placeholder={this.placeholder}
          role="button"
          onChange={this.onSelect.bind(this)}
          onInputChange={this.onInputChange.bind(this)}
          autoFocus={true}
          newOptionCreator={this.onNewOption}
          autoBlur
          onBlur={() => this.setState({ maxLengthError: null })}
          autosize={false}
          openOnFocus={!!itemId}
          disabled={this.props.selectionDisabled}
        />
        {this.renderMaxLengthError()}
      </div>
    );
  }

  renderMaxLengthError() {
    if (!this.state.maxLengthError) {
      return null;
    }

    return <div className="text-danger mt-5">{this.state.maxLengthError}</div>;
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            {this.renderInputs()}
            {this.renderInputForNewSelection()}
          </div>
          {this.renderError()}
        </div>
      </div>
    );
  }
}

export default InputGroup;

import React, { Component } from "react";
import InputGroup from "./InputGroup";
import NestedUtils from "./NestedUtils";
import ButtonGroup from "./ButtonGroup";
import PropTypes from "prop-types";
import MultipleSelectedList from "./MultipleSelectedList";

//@TODO
// * Refactor from className to classnames
// * Use styled components
// * Get rid of intl - DONE
// * Get rid of function declarations in the render methods
// * Make the example working - DONE
// * Tests at least for nested utils
// * Reformat - DONE

/**
 * @property {Array }           data                   The data containing hierarchy of strings to find
 * @property {Array}            selection              Ids of the (initially) selected data
 *                                                     Hint system will try to find object properties according
 *                                                     to specified entry keys.
 * @property {string}
 */
export class MultistepSelect extends Component {
  constructor(props) {
    super(props);
    this.nestedUtils = new NestedUtils(this.props.data);
    this.state = { currentItemId: null, selectionDisabled: false };
  }

  componentWillReceiveProps(nextProps) {
    // set data to utility when the component data prop is updated
    this.nestedUtils.data = nextProps.data;
  }

  onConfirm() {
    const { onConfirm, selection } = this.props;
    const currentItemId = this.state.currentItemId;

    if (selection.indexOf(currentItemId) === -1) {
      onConfirm(currentItemId);
    }

    this.setState({ currentItemId: null, selectionDisabled: false });
  }

  onSelect(currentItemId) {
    this.setState({ currentItemId });
    if (this.props.onSelect) {
      this.props.onSelect(currentItemId);
    }
  }

  onRemove(value) {
    this.props.onRemove(value);
  }

  onReset() {
    this.setState({ currentItemId: null, selectionDisabled: false });
    this.props.onReset && this.props.onReset();
  }

  renderSelectedItems() {
    const SelectedItemsComponent =
      this.props.selectedListComponent || MultipleSelectedList;
    const selectedItems = this.props.selection.map(itemId =>
      this.nestedUtils.findItemById(itemId)
    );

    return (
      <SelectedItemsComponent
        nestedUtils={this.nestedUtils}
        selection={selectedItems}
        onRemove={this.onRemove.bind(this)}
        deleteButtonText={this.props.deleteButtonText || "Remove"}
      />
    );
  }

  renderSelects() {
    if (this.isMaxCount()) {
      return null;
    }

    let error = this.props.meta.touched && this.props.meta.error;

    return (
      <InputGroup
        data={this.props.data}
        currentItemId={this.state.currentItemId}
        onSelect={this.onSelect.bind(this)}
        onRemove={this.onRemove.bind(this)}
        error={error}
        placeholder={this.props.placeholder}
        creatable={this.props.creatable}
        maxCreatableLength={this.props.maxCreatableLength}
        selectionDisabled={this.state.selectionDisabled}
      />
    );
  }

  formatConfirmBtnText(item) {
    const rootItemConfirmText = this.props.confirmBtnRootMsg || "Confirm";
    const subItemConfirmText = this.props.confirmBtnSubMsg || "Confirm";

    return this.nestedUtils.hasParent(item.id)
      ? rootItemConfirmText
      : subItemConfirmText;
  }

  renderButtons() {
    const item = this.state.currentItemId;

    if (!item) {
      return null;
    }

    let selectedItem, itemHasChildren;

    if (!item.custom) {
      //@TODO Refactor. [item] contains item id in this case / branch.
      selectedItem = this.nestedUtils.findItemById(item);
      itemHasChildren = this.nestedUtils.hasChildren(item);
    } else {
      selectedItem = item;
      itemHasChildren = false;
    }

    const confirmText = this.formatConfirmBtnText(selectedItem);

    return (
      <ButtonGroup
        onReset={this.onReset.bind(this)}
        onConfirm={this.onConfirm.bind(this)}
        selectedItemName={selectedItem.name}
        itemHasChildren={itemHasChildren}
        readyToConfirm={!!item}
        confirmText={confirmText}
      />
    );
  }

  render() {
    return (
      <div>
        {typeof this.props.children === "function" ? (
          this.props.children(
            this.renderSelects(),
            this.renderSelectedItems(),
            this.renderButtons(),
            (customItem, selectionDisabled = true) => {
              this.setState({ current: customItem, selectionDisabled });
            }
          )
        ) : (
          <div>
            {this.renderSelects()}
            {this.renderButtons()}
            {this.renderSelectedItems()}
          </div>
        )}
      </div>
    );
  }

  componentDidUpdate() {
    const {
      maxCount,
      input: { value }
    } = this.props;

    if (this.isMaxCount() && maxCount < value.length) {
      this.props.input.onChange(
        this.props.selection.slice(0, this.props.maxCount)
      );
    }
  }

  isMaxCount() {
    const {
      maxCount,
      input: { value }
    } = this.props;

    return !!(maxCount && Array.isArray(value) && maxCount <= value.length);
  }
}

MultistepSelect.defaultProps = {
  buttonPosition: "top",
  data: [],
  input: {},
  meta: {}
};

export const itemShape = {
  id: PropTypes.number,
  name: PropTypes.string,
  parentId: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.number)
};

MultistepSelect.propTypes = {
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  buttonPosition: PropTypes.oneOf(["top", "bottom"]),
  data: PropTypes.arrayOf(PropTypes.shape(itemShape)),
  maxCount: PropTypes.number,
  onConfirm: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  confirmBtnRootMsg: PropTypes.string,
  confirmBtnSubMsg: PropTypes.string,
  deleteButtonText: PropTypes.string
};

export default MultistepSelect;

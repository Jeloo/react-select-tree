import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MultipleSelectedList extends Component {

  render() {
    const items = this.props.selection;

    const list = items.map(item => {
      return (
        <span key={item.id} className='Select-multi-value-wrapper'>
                    <div className="Select-value">
                        <span className="Select-value-icon" aria-hidden="true"
                              onClick={() => this.props.onRemove(item)}>×</span>
                        <span className="Select-value-label"
                              role="option" aria-selected="true"
                              id="react-select-3--value-1">
                            {item.name}
                          <span className="Select-aria-only">&nbsp;</span>
                        </span>
                    </div>
                </span>
      )
    });

    if (items.length) {
      return (
        <div className="Select--multi Select--multi-badges">
          {list}
        </div>
      );
    }

    return null;
  }
}

MultipleSelectedList.propTypes = {
  selection: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  deleteButtonText: PropTypes.string,
};

export default MultipleSelectedList;
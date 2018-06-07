import React, {Component} from 'react';

/**
 * @property {Array.<object>}    data              The data containing strings to find
 * @property {String}            selected          Selected item / list option
 */
export class MultistepInput extends Component {

  onSelected(e) {
    return this.props.onSelected(e.target.value);
  }

  onTyping(e) {
    return this.props.onTyping(e.target.value);
  }

  renderOptions() {
    return this.props.data.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });
  }

  render() {
    const props = this.props;

    if (!this.props.data.length) {
      return null;
    }

    return (
      <div>
        <select defaultValue={props.selected} onChange={this.onSelected.bind(this)}>
          <option key={0} default={!props.selected} value={this.props.defaultValue || ''}/>
          {this.renderOptions()}
        </select>

        {/*<input type="text"*/}
        {/*placeholder={props.placeholder}*/}
        {/*value={this.props.name}*/}
        {/*onChange={this.onTyping.bind(this)} />*/}
      </div>

    );
  }

}

export default MultistepInput;
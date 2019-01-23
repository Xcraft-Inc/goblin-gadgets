import React from 'react';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');

import CheckButton from 'gadgets/check-button/widget';

/******************************************************************************/

class RadioList extends Widget {
  constructor() {
    super(...arguments);

    this.onRadioClicked = this.onRadioClicked.bind(this);
    this.onCheckClicked = this.onCheckClicked.bind(this);
    this.getItem = this.getItem.bind(this);
  }

  onRadioClicked(index) {
    const x = this.props.selectionChanged;
    if (x) {
      x(index);
    }
  }

  onCheckClicked() {
    const x = this.props.selectionChanged;
    if (x) {
      const index = this.props.selectedIndex ^ 1; // swap (0 <-> 1)
      x(index);
    }
  }

  // Indicates whether the list of radio buttons can be reduced to a single check button.
  get isBool() {
    return (
      this.props.list.length === 2 &&
      ((this.props.list[0] === 'no' && this.props.list[1] === 'yes') ||
        (this.props.list[0] === 'false' && this.props.list[1] === 'true'))
    );
  }

  getItem(item) {
    if (typeof item === 'string') {
      return item;
    } else {
      if (item.text) {
        return item.text;
      }
      console.warn(`malformed radio item: ${JSON.stringify(item)}`);
    }
  }

  /******************************************************************************/

  // Render a single check button, with the text of the second option (yes/true).
  renderCheck() {
    return (
      <CheckButton
        kind="check"
        heightStrategy={this.props.heightStrategy}
        text={this.props.list[1]}
        focusable="true"
        checked={Bool.toString(this.props.selectedIndex === 1)}
        onClick={() => this.onCheckClicked()}
      />
    );
  }

  // Render a single radio button.
  renderRow(text, index) {
    return (
      <CheckButton
        key={index}
        kind={this.props.kind || 'radio'}
        width={this.props.buttonWidth}
        heightStrategy={this.props.heightStrategy}
        justify="left"
        text={this.getItem(text)}
        focusable="true"
        checked={Bool.toString(index === this.props.selectedIndex)}
        onClick={() => this.onRadioClicked(index)}
      />
    );
  }

  // Render a list of radio buttons.
  renderRows() {
    const result = [];
    let index = 0;
    for (const row of this.props.list) {
      result.push(this.renderRow(row, index++));
    }
    return result;
  }

  render() {
    const boxClass = this.styles.classNames.box;
    return (
      <div className={boxClass}>
        {this.isBool ? this.renderCheck() : this.renderRows()}
      </div>
    );
  }
}

/******************************************************************************/
export default RadioList;

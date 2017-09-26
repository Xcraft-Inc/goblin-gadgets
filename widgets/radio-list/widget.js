import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from '../helpers/boolean-helpers.js';

import Container from 'gadgets/container/widget';
import CheckButton from 'gadgets/check-button/widget';

/******************************************************************************/

class RadioList extends Widget {
  constructor () {
    super (...arguments);

    this.onButtonClicked = this.onButtonClicked.bind (this);
  }

  onButtonClicked (index) {
    const x = this.props.selectionChanged;
    if (x) {
      x (index);
    }
  }

  renderRow (text, index) {
    return (
      <CheckButton
        key={index}
        kind="radio"
        text={text}
        focusable="true"
        checked={Bool.toString (index === this.props.selectedIndex)}
        onClick={() => this.onButtonClicked (index)}
      />
    );
  }

  renderRows () {
    const result = [];
    let index = 0;
    for (const row of this.props.list) {
      result.push (this.renderRow (row, index++));
    }
    return result;
  }

  render () {
    const boxClass = this.styles.classNames.box;
    return (
      <div className={boxClass}>
        {this.renderRows ()}
      </div>
    );
  }
}

/******************************************************************************/
export default RadioList;

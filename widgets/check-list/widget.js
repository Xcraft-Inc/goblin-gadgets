import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import Container from 'gadgets/container/widget';
import CheckButton from 'gadgets/check-button/widget';

/******************************************************************************/

class CheckList extends Widget {
  constructor () {
    super (...arguments);

    this.onButtonClicked = this.onButtonClicked.bind (this);
  }

  getNewValue (name) {
    if (this.props.value) {
      const array = this.props.value.split (',');
      const index = array.indexOf (name);
      if (index === -1) {
        array.push (name);
      } else {
        array.splice (index, 1);
      }
      const orderedArray = [];
      for (const item of this.props.list) {
        if (array.indexOf (item.name) !== -1) {
          orderedArray.push (item.name);
        }
      }
      return orderedArray.join (',');
    } else {
      return name;
    }
  }

  onButtonClicked (name) {
    const x = this.props.selectionChanged;
    if (x) {
      x (this.getNewValue (name));
    }
  }

  isChecked (name) {
    if (this.props.value) {
      const array = this.props.value.split (',');
      if (array.indexOf (name) !== -1) {
        return true;
      }
    }
    return false;
  }

  renderRow (row, index) {
    return (
      <CheckButton
        key={index}
        kind={this.props.kind || 'check'}
        heightStrategy={this.props.heightStrategy}
        text={row.description}
        focusable="true"
        checked={Bool.toString (this.isChecked (row.name))}
        onClick={() => this.onButtonClicked (row.name)}
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
export default CheckList;

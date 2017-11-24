import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import Container from 'gadgets/container/widget';
import CheckButton from 'gadgets/check-button/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class CheckList extends Widget {
  constructor () {
    super (...arguments);

    this.onButtonClicked = this.onButtonClicked.bind (this);
    this.onSetAll = this.onSetAll.bind (this);
    this.onClearAll = this.onClearAll.bind (this);
  }

  getNewValue (name) {
    if (this.props.value) {
      const array = this.props.value.split (',');
      const index = array.indexOf (name);
      if (index === -1) {
        array.push (name); // add name if it's not present
      } else {
        array.splice (index, 1); // remove name if it's present
      }
      // Return a value in same order that props.list.
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

  get allValue () {
    const array = [];
    for (const item of this.props.list) {
      array.push (item.name);
    }
    return array.join (',');
  }

  onButtonClicked (name) {
    const x = this.props.selectionChanged;
    if (x) {
      x (this.getNewValue (name));
    }
  }

  onSetAll () {
    const x = this.props.selectionChanged;
    if (x) {
      x (this.allValue);
    }
  }

  onClearAll () {
    const x = this.props.selectionChanged;
    if (x) {
      x (null);
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

  renderButtons () {
    if (Bool.isTrue (this.props.showHeader)) {
      const headerClass = this.styles.classNames.header;
      if (this.props.value === this.allValue) {
        return (
          <div className={headerClass}>
            <CheckButton
              kind={this.props.kind || 'check'}
              text="Enlève tout"
              checked="false"
              onClick={this.onClearAll}
            />
          </div>
        );
      } else {
        return (
          <div className={headerClass}>
            <CheckButton
              kind={this.props.kind || 'check'}
              text="Met tout"
              checked="true"
              onClick={this.onSetAll}
            />
          </div>
        );
      }
    } else {
      return null;
    }
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
    const rowsClass = this.styles.classNames.rows;
    return (
      <div className={boxClass}>
        {this.renderButtons ()}
        <div className={rowsClass}>
          {this.renderRows ()}
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default CheckList;

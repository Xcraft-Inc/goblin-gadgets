//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';
import Checkbox from 'goblin-gadgets/widgets/checkbox/widget';
import * as styles from './styles';

/******************************************************************************/

class CheckList extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.onSetAll = this.onSetAll.bind(this);
    this.onClearAll = this.onClearAll.bind(this);
  }

  get value() {
    if (this.props.value) {
      if (this.props.value._state) {
        return this.props.value.toArray();
      } else {
        return this.props.value.split(',');
      }
    } else {
      return null;
    }
  }

  get allValue() {
    const array = [];
    for (const item of this.props.list) {
      array.push(item.name);
    }
    return array.join(',');
  }

  getNewValue(name) {
    if (this.props.value) {
      const array = this.value;
      const index = array.indexOf(name);
      if (index === -1) {
        array.push(name); // add name if it's not present
      } else {
        array.splice(index, 1); // remove name if it's present
      }
      // Return a value in same order that props.list.
      const orderedArray = [];
      for (const item of this.allValue.split(',')) {
        if (array.indexOf(item) !== -1) {
          orderedArray.push(item);
        }
      }
      return orderedArray.join(',');
    } else {
      return name;
    }
  }

  onButtonClicked(name) {
    const x = this.props.selectionChanged;
    if (x) {
      x(this.getNewValue(name));
    }
  }

  onSetAll() {
    const x = this.props.selectionChanged;
    if (x) {
      x(this.allValue);
    }
  }

  onClearAll() {
    const x = this.props.selectionChanged;
    if (x) {
      x(null);
    }
  }

  isChecked(name) {
    if (this.props.value) {
      const array = this.value;
      if (array.indexOf(name) !== -1) {
        return true;
      }
    }
    return false;
  }

  renderButtons() {
    if (Bool.isTrue(this.props.showHeader)) {
      const headerClass = this.styles.classNames.header;
      if (this.props.value === this.allValue) {
        return (
          <div className={headerClass}>
            <Checkbox
              kind={this.props.kind}
              text={T('Enlève tout')}
              checked="false"
              readonly={this.props.readonly}
              onChange={this.onClearAll}
            />
          </div>
        );
      } else {
        return (
          <div className={headerClass}>
            <Checkbox
              kind={this.props.kind}
              text={T('Met tout')}
              checked="true"
              readonly={this.props.readonly}
              onChange={this.onSetAll}
            />
          </div>
        );
      }
    } else {
      return null;
    }
  }

  renderRow(row, index) {
    return (
      <Checkbox
        key={index}
        kind={this.props.kind}
        heightStrategy={this.props.heightStrategy}
        text={row.description}
        focusable="true"
        checked={Bool.toString(this.isChecked(row.name))}
        readonly={this.props.readonly}
        onChange={() => this.onButtonClicked(row.name)}
      />
    );
  }

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
    const rowsClass = this.styles.classNames.rows;
    return (
      <div className={boxClass}>
        {this.renderButtons()}
        <div className={rowsClass}>{this.renderRows()}</div>
      </div>
    );
  }
}

/******************************************************************************/
export default CheckList;

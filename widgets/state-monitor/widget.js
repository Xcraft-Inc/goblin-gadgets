import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import Tree from 'goblin-gadgets/widgets/tree/widget';
import Checkbox from 'goblin-gadgets/widgets/checkbox/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Combo from 'goblin-gadgets/widgets/combo/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
import {Unit} from 'electrum-theme';
import Shredder from 'xcraft-core-shredder';
import {ColorManipulator} from 'electrum-theme';
import T from 't';

/******************************************************************************/

function getRows(state) {
  const rows = [];

  const orderedKeys = Array.from(state.keys()).sort();

  for (const key of orderedKeys) {
    const value = state.get(key);

    const row = {
      id: key,
      key: key,
    };

    if (value !== null) {
      if (typeof value === 'object') {
        row.rows = getRows(value);
      } else {
        row.value = value.toString();
      }
    }

    rows.push(row);
  }

  return rows;
}

/******************************************************************************/

export default class StateMonitor extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      activeFilter: '',
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  //#region get/set
  get activeFilter() {
    return this.state.activeFilter;
  }
  set activeFilter(value) {
    this.setState({
      activeFilter: value,
    });
  }
  //#endregion

  onChangeFilter(e) {
    this.activeFilter = e.target.value;
  }

  onClearFilter() {
    this.activeFilter = '';
  }

  getTreeData(state) {
    const data = {
      header: [
        {
          name: 'key',
          //? description: 'Key',
          width: '400px',
          textAlign: 'left',
        },
        {
          name: 'value',
          //? description: 'Value',
          grow: '1',
          textAlign: 'left',
          indent: 'space',
        },
      ],
      rows: [],
    };

    if (this.activeFilter) {
      const s = state.get(this.activeFilter);
      if (s) {
        data.rows = getRows(s);
      }
    }

    return data;
  }

  /******************************************************************************/

  renderListOption(key) {
    return (
      <option key={key} value={key}>
        {key}
      </option>
    );
  }

  renderListOptions(state) {
    const result = [];

    const orderedKeys = Array.from(state.keys()).sort();
    for (const key of orderedKeys) {
      result.push(this.renderListOption(key));
    }

    return result;
  }

  renderFilter(state) {
    if (!this.props.showed) {
      return null;
    }

    const inputStyle = {
      width: '600px',
      border: 'none',
      padding: '5px',
      color: '#0f0',
      backgroundColor: '#333',
      fontSize: '1em',
      fontWeight: 900,
    };

    const listStyle = {
      zIndex: 100,
    };

    return (
      <div className={this.styles.classNames.filter}>
        <Label text={T('Key in the backend state')} />
        <input
          style={inputStyle}
          value={this.activeFilter}
          type="text"
          list="keysOfState"
          autoFocus={true}
          onChange={this.onChangeFilter}
        />
        <datalist id="keysOfState" style={listStyle}>
          {this.renderListOptions(state)}
        </datalist>
        <Button
          border="none"
          glyph="solid/times"
          onClick={this.onClearFilter}
        />
      </div>
    );
  }

  renderState(state) {
    if (!this.props.showed) {
      return null;
    }

    return (
      <div className={this.styles.classNames.tree}>
        <Tree
          data={this.getTreeData(state)}
          width="960px"
          height="410px"
          headerWithoutHorizontalSeparator={true}
          darkTheme={true}
          hoverBackgroundColor="#444"
          selectedBackgroundColor="#666"
          hasButtons={true}
        />
      </div>
    );
  }

  render() {
    const state = this.props.showed ? this.props.state : null;

    return (
      <div className={this.styles.classNames.stateMonitor}>
        {this.renderFilter(state)}
        {this.renderState(state)}
      </div>
    );
  }
}

/******************************************************************************/

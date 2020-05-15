import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import Tree from 'goblin-gadgets/widgets/tree/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import T from 't';

/******************************************************************************/

function getRows(state, parentKey) {
  const rows = [];

  const orderedKeys = Array.from(state.keys()).sort();

  for (const key of orderedKeys) {
    const value = state.get(key);
    const id = `${parentKey}.${key}`;

    const row = {id, key};

    if (value !== null) {
      if (typeof value === 'object') {
        row.rows = getRows(value, id);
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
    this.onTreeClick = this.onTreeClick.bind(this);
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

  onTreeClick(key) {
    const item = this.props.state.get(key);
    const link = this.props.state.get(item);
    if (link) {
      this.activeFilter = link.get('id');
    }
  }

  getTreeData(state) {
    const data = {
      header: [
        {
          name: 'key',
          width: '400px',
          textAlign: 'left',
        },
        {
          name: 'value',
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
        data.rows = getRows(s, this.activeFilter);
      }
    }

    return data;
  }

  /******************************************************************************/

  renderTitle() {
    return (
      <div className={this.styles.classNames.title}>
        <Label text="Radar ― Backend State Monitor" grow="1" justify="center" />
        <Button
          border="none"
          glyph="solid/times"
          onClick={this.props.onClose}
        />
      </div>
    );
  }

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
      padding: '5px 10px',
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
          glyph="solid/eraser"
          onClick={this.onClearFilter}
        />
      </div>
    );
  }

  renderTree(state) {
    if (!this.props.showed) {
      return null;
    }

    const data = this.getTreeData(state);

    if (data.rows.length === 0) {
      return (
        <div className={this.styles.classNames.emptyTree}>
          <Label
            glyph="light/radar"
            glyphSize="1200%"
            glyphPosition="center"
            justify="center"
          />
        </div>
      );
    } else {
      return (
        <div className={this.styles.classNames.tree}>
          <Tree
            data={data}
            width="960px"
            height="364px"
            headerWithoutHorizontalSeparator={true}
            darkTheme={true}
            hoverBackgroundColor="#444"
            selectedBackgroundColor="#666"
            hasButtons={true}
            onClick={this.onTreeClick}
          />
        </div>
      );
    }
  }

  render() {
    const state = this.props.showed ? this.props.state : null;

    return (
      <div className={this.styles.classNames.stateMonitor}>
        {this.renderTitle(state)}
        {this.renderFilter(state)}
        {this.renderTree(state)}
      </div>
    );
  }
}

/******************************************************************************/

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

function debugLogHistory(oper, history, historyIndex) {
  // console.log(`${oper}: history=${history.join(', ')} index=${historyIndex}`);
}

/******************************************************************************/

export default class StateMonitor extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      activeFilter: '',
      history: [],
      historyIndex: -1,
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
    this.onTreeClick = this.onTreeClick.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onForward = this.onForward.bind(this);
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

  get history() {
    return this.state.history;
  }
  set history(value) {
    this.setState({
      history: value,
    });
  }

  get historyIndex() {
    return this.state.historyIndex;
  }
  set historyIndex(value) {
    this.setState({
      historyIndex: value,
    });
  }
  //#endregion

  changeActiveFilter(filter, doPush = true) {
    this.activeFilter = filter;
    if (doPush) {
      this.pushActiveFilter(filter);
    }
  }

  pushActiveFilter(filter) {
    if (!filter) {
      // Never push empty key.
      return;
    }

    const item = this.props.state.get(filter);
    if (!item) {
      // If key to push don't match to a existing key in the state, don't push.
      return;
    }

    const history = this.history;
    let historyIndex = this.historyIndex;

    // Truncate keys after the current index in the history.
    history.splice(historyIndex + 1);
    historyIndex = history.length - 1;

    // If key already exist in the history, remove it.
    const i = history.indexOf(filter);
    if (i !== -1) {
      history.splice(i, 1);
      historyIndex = history.length - 1;
    }

    // Insert the new key to the end of the history.
    history.push(filter);

    debugLogHistory('PUSH', history, history.length - 1);
    this.history = history;
    this.historyIndex = history.length - 1;
  }

  get historyBackEnabled() {
    return this.historyIndex > 0;
  }

  get historyForwardEnabled() {
    return this.historyIndex < this.history.length - 1;
  }

  getBackFilter() {
    if (!this.historyBackEnabled) {
      return null;
    }
    debugLogHistory('BACK', this.history, this.historyIndex - 1);
    const filter = this.history[this.historyIndex - 1];
    this.historyIndex = this.historyIndex - 1;
    return filter;
  }

  getForwardFilter() {
    if (!this.historyForwardEnabled) {
      return null;
    }
    debugLogHistory('FORWARD', this.history, this.historyIndex + 1);
    const filter = this.history[this.historyIndex + 1];
    this.historyIndex = this.historyIndex + 1;
    return filter;
  }

  onChangeFilter(e) {
    this.changeActiveFilter(e.target.value);
  }

  onClearFilter() {
    this.changeActiveFilter('');
  }

  onTreeClick(key) {
    const item = this.props.state.get(key);
    const link = this.props.state.get(item);
    if (link) {
      this.changeActiveFilter(link.get('id'));
    }
  }

  onPaste() {
    //
  }

  onBack() {
    const filter = this.getBackFilter();
    if (filter) {
      this.changeActiveFilter(filter, false);
    }
  }

  onForward() {
    const filter = this.getForwardFilter();
    if (filter) {
      this.changeActiveFilter(filter, false);
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
          tooltip={T('Close')}
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
          tooltip={T('Erase field')}
          onClick={this.onClearFilter}
        />
        <Button
          border="none"
          glyph="solid/paste"
          onClick={this.onPaste}
          tooltip={T('Paste')}
        />
        <Button
          border="none"
          glyph="solid/arrow-left"
          disabled={!this.historyBackEnabled}
          onClick={this.onBack}
          tooltip={T('Back')}
        />
        <Button
          border="none"
          glyph="solid/arrow-right"
          disabled={!this.historyForwardEnabled}
          onClick={this.onForward}
          tooltip={T('Forward')}
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

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

class StateMonitor extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      activeFilter: '',
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

    this.doAs('desktop', 'add-state-monitor', {key: filter});
  }

  get historyBackEnabled() {
    return this.props.history.get('index') > 0;
  }

  get historyForwardEnabled() {
    const stack = this.props.history.get('stack');
    return this.props.history.get('index') < stack.length - 1;
  }

  getBackFilter() {
    if (!this.historyBackEnabled) {
      return null;
    }
    const index = this.props.history.get('index');
    const filter = this.props.history.get('stack').get(index - 1);
    this.doAs('desktop', 'back-state-monitor');
    return filter;
  }

  getForwardFilter() {
    if (!this.historyForwardEnabled) {
      return null;
    }
    const index = this.props.history.get('index');
    const filter = this.props.history.get('stack').get(index + 1);
    this.doAs('desktop', 'forward-state-monitor');
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
            height="464px"
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

export default Widget.connect((state, props) => {
  const desktopState = state.get(`backend.${props.id}`);
  const backendState = state.get('backend');
  return {
    showed: desktopState.get('showStateMonitor'),
    history: desktopState.get('stateMonitorHistory'),
    state: backendState,
  };
})(StateMonitor);

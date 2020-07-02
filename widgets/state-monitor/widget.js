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

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
    this.onTreeClick = this.onTreeClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onForward = this.onForward.bind(this);
  }

  addStateMonitor(filter, doPush = true) {
    const item = filter ? this.props.state.get(filter) : null;
    if (!item) {
      // If key to push don't match to a existing key in the state, don't push.
      doPush = false;
    }

    this.doAs('desktop', 'add-state-monitor', {key: filter, doPush});
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
    this.addStateMonitor(e.target.value);
  }

  onClearFilter() {
    this.addStateMonitor('');
  }

  onTreeClick(key) {
    const item = this.props.state.get(key);
    if (item) {
      const link = this.props.state.get(item);
      if (link) {
        const id = link.get('id');
        if (id) {
          this.addStateMonitor(id);
        }
      }
    }
  }

  onBack() {
    const filter = this.getBackFilter();
    if (filter) {
      this.addStateMonitor(filter, false);
    }
  }

  onForward() {
    const filter = this.getForwardFilter();
    if (filter) {
      this.addStateMonitor(filter, false);
    }
  }

  getTreeData(state) {
    const data = {
      header: [
        {
          name: 'key',
          grow: '1',
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

    const current = this.props.history.get('current');
    if (current) {
      const s = state.get(current);
      if (s) {
        data.rows = getRows(s, current);
      }
    }

    return {data, current};
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

    const current = this.props.history.get('current');

    const inputStyle = {
      flexGrow: 1,
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
        <Label text={T('Key')} />
        <input
          style={inputStyle}
          value={current}
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

    const result = this.getTreeData(state);

    if (result.data.rows.length === 0) {
      return (
        <div className={this.styles.classNames.emptyTree}>
          <Label
            height="230px"
            glyph="light/radar"
            glyphSize="1200%"
            glyphColor="rgba(0,255,0,0.2)"
            glyphPosition="center"
            justify="center"
          />
          {result.current ? (
            <Label
              text={T('Does not exist in the backend state')}
              textColor="#0f0"
              fontSize="150%"
            />
          ) : null}
        </div>
      );
    } else {
      return (
        <div className={this.styles.classNames.tree}>
          <Tree
            data={result.data}
            width="960px"
            grow="1"
            headerWithoutHorizontalSeparator={true}
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

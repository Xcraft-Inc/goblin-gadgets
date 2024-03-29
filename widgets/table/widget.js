import React from 'react';
import PropTypes from 'prop-types';
import Widget from 'goblin-laboratory/widgets/widget';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import TableNC from '../table-nc/widget';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';

/******************************************************************************/

class SelectionUpdaterNC extends Widget {
  UNSAFE_componentWillMount() {
    if (this.props.selectedIds) {
      this.doAs('table-gadget', 'syncSelect', {
        selectedIds: this.props.selectedIds,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedIds &&
      (!this.props.selectedIds.equals ||
        !this.props.selectedIds.equals(prevProps.selectedIds))
    ) {
      this.doAs('table-gadget', 'syncSelect', {
        selectedIds: this.props.selectedIds,
      });
    }
  }

  render() {
    return null;
  }
}

const SelectionUpdater = Widget.connectWidget((state) => ({
  selectedIds: state.get('selectedIds'),
}))(SelectionUpdaterNC);

/******************************************************************************/

class Table extends Widget {
  constructor() {
    super(...arguments);

    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onSortingChanged = this.onSortingChanged.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onDeselectAll = this.onDeselectAll.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  static get contextTypes() {
    return {
      ...Widget.contextTypes,
      id: PropTypes.string,
    };
  }

  static get wiring() {
    return {
      id: 'id',
      data: 'data',
    };
  }

  initialiseData() {
    if (this.props.data) {
      let selectedIds = [];
      if (this.props.id) {
        selectedIds = this.getBackendState().get('selectedIds');
      }
      this.dispatch({
        type: 'INITIALISE',
        data: this.props.data,
        sortingColumns: this.props.selectedIds,
        selectedIds,
        id: this.props.id,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.data &&
      (!this.props.data.equals || !this.props.data.equals(prevProps.data))
    ) {
      this.initialiseData();
    }
  }

  UNSAFE_componentWillMount() {
    this.initialiseData();
  }

  componentDidMount() {
    if (this.props.useKeyUpDown) {
      KeyTrap.bind('ArrowUp', this.onKeyUp);
      KeyTrap.bind('ArrowDown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.props.useKeyUpDown) {
      KeyTrap.unbind('ArrowUp');
      KeyTrap.unbind('ArrowDown');
    }
  }

  setFilter(value) {
    this.dispatch({
      type: 'FILTER',
      value,
    });
  }

  setSortingColumns(value) {
    this.dispatch({
      type: 'SORT_COLUMN',
      value,
    });
  }

  changeSelection(direction) {
    this.dispatch({
      type: 'MOVE_SELECTION',
      direction,
      mode: this.props.selectionMode,
    });
  }

  onKeyUp() {
    this.changeSelection(-1);
  }

  onKeyDown() {
    this.changeSelection(1);
  }

  onFilterChanged(value) {
    this.setFilter(value);
  }

  onSortingChanged(columnName) {
    let sortingColumns = this.props.sortingColumns.valueSeq().toArray();
    if (sortingColumns.length > 0 && sortingColumns[0] === columnName) {
      sortingColumns[0] = '!' + columnName;
      sortingColumns = sortingColumns.concat();
    } else if (
      sortingColumns.length > 0 &&
      sortingColumns[0] === '!' + columnName
    ) {
      sortingColumns[0] = columnName;
      sortingColumns = sortingColumns.concat();
    } else {
      let i = sortingColumns.indexOf(columnName);
      if (i === -1) {
        i = sortingColumns.indexOf('!' + columnName);
      }
      if (i !== -1) {
        sortingColumns.splice(i, 1);
      }
      sortingColumns = [columnName].concat(sortingColumns);
    }
    this.setSortingColumns(sortingColumns);
  }

  onSelectionChanged(id) {
    if (!this.props.id && !this.context.id) {
      return;
    }
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(id);
    } else {
      this.dispatch({
        type: 'SELECT',
        mode: this.props.selectionMode,
        rowId: id,
      });
    }
  }

  onSelectAll() {
    this.dispatch({type: 'SELECT-ALL'});
  }

  onDeselectAll() {
    this.dispatch({type: 'DESELECT-ALL'});
  }

  onDoubleClick(id) {
    if (!this.props.id && !this.context.id) {
      return;
    }
    this.doAs('table-gadget', 'doubleClick', {
      rowId: id,
    });
  }

  /******************************************************************************/

  render() {
    if (this.props.id) {
      return (
        <>
          <SelectionUpdater id={this.props.id} />
          <TableNC
            {...this.props}
            onFilterChanged={this.onFilterChanged}
            onSortingChanged={this.onSortingChanged}
            onSelectionChanged={this.onSelectionChanged}
            onDoubleClick={this.onDoubleClick}
            onSelectAll={this.onSelectAll}
            onDeselectAll={this.onDeselectAll}
          />
        </>
      );
    } else {
      return (
        <TableNC
          {...this.props}
          onFilterChanged={this.onFilterChanged}
          onSortingChanged={this.onSortingChanged}
          onSelectionChanged={this.onSelectionChanged}
          onDoubleClick={this.onDoubleClick}
          onSelectAll={this.onSelectAll}
          onDeselectAll={this.onDeselectAll}
        />
      );
    }
  }
}

/******************************************************************************/

const ConnectedTable = Widget.connectWidget((state) => {
  if (!state) {
    return {};
  }

  return {
    sortingColumns: state.get('sortingColumns'),
    filter: state.get('filter'),
    sortedRows: state.get('sortedRows'),
    isAllSelected: state.get('isAllSelected'),
    isAllDeselected: state.get('isAllDeselected'),
  };
})(Table);

export default ConnectedTable;

/******************************************************************************/

ConnectedTable.displayName = 'Table';
registerWidget(ConnectedTable, props, scenarios);

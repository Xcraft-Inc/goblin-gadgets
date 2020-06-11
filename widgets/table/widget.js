import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import TableNC from '../table-nc/widget';
import MouseTrap from 'mousetrap';

/******************************************************************************/

class SelectionUpdaterNC extends Widget {
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

  componentWillMount() {
    this.initialiseData();

    if (this.props.useKeyUpDown) {
      MouseTrap.bind('up', this.onKeyUp, 'keydown');
      MouseTrap.bind('down', this.onKeyDown, 'keydown');
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.props.useKeyUpDown) {
      MouseTrap.unbind('up');
      MouseTrap.unbind('down');
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
    let sortingColumns = this.props.sortingColumns.toArray();
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
        <React.Fragment>
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
        </React.Fragment>
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

export default Widget.connectWidget((state) => {
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

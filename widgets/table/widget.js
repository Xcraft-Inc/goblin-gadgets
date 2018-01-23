import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import TableRow from 'gadgets/table-row/widget';
import TableCell from 'gadgets/table-cell/widget';

/******************************************************************************/
class Table extends Widget {
  constructor () {
    super (...arguments);

    this.state = {
      selectedRow: null,
      selectedRows: [],
    };

    this.onSelectionChanged = this.onSelectionChanged.bind (this);
  }

  get selectedRow () {
    return this.state.selectedRow;
  }

  set selectedRow (value) {
    this.setState ({
      selectedRow: value,
    });
  }

  get selectedRows () {
    return this.state.selectedRows;
  }

  set selectedRows (value) {
    this.setState ({
      selectedRows: value,
    });
  }

  onSelectionChanged (id) {
    if (this.props.selectionMode === 'single') {
      if (id === this.selectedRow) {
        id = null; // deselect the selected row
      }
      this.selectedRow = id;

      const x = this.props.onSelectionChanged;
      if (x) {
        x (id);
      }
    } else if (this.props.selectionMode === 'multi') {
      const i = this.selectedRows.indexOf (id);
      if (i === -1) {
        this.selectedRows.push (id);
      } else {
        this.selectedRows.splice (i, 1);
      }
      this.forceUpdate ();

      const x = this.props.onSelectionChanged;
      if (x) {
        x (this.selectedRows);
      }
    }
  }

  isSelected (id) {
    if (this.props.selectionMode === 'single') {
      return this.selectedRow === id;
    } else if (this.props.selectionMode === 'multi') {
      return this.selectedRows.indexOf (id) !== -1;
    } else {
      return false;
    }
  }

  hasHeader (header) {
    return header.linq.where (column => column.get ('description')).any ();
  }

  /******************************************************************************/

  renderHeaderCell (column, isLast, index) {
    return (
      <TableCell
        key={index}
        index={index}
        width={column.get ('width')}
        grow={column.get ('grow')}
        textAlign={column.get ('textAlign')}
        isLast={Bool.toString (isLast)}
        isHeader="true"
        text={column.get ('description')}
      />
    );
  }

  renderHeaderCells (header) {
    let index = 0;
    return header.linq
      .select (column => {
        const isLast = index === header.size - 1;
        return this.renderHeaderCell (column, isLast, index++);
      })
      .toList ();
  }

  renderHeader (header) {
    if (this.hasHeader (header)) {
      const styleClass = this.styles.classNames.header;
      return (
        <div className={styleClass}>
          {this.renderHeaderCells (header)}
        </div>
      );
    } else {
      return null;
    }
  }

  renderRow (header, row, count, index) {
    return (
      <TableRow
        header={header.state}
        row={row}
        key={index}
        index={index}
        count={count}
        selected={Bool.toString (this.isSelected (row.get ('id', null)))}
        selectionChanged={this.onSelectionChanged}
      />
    );
  }

  renderRows (data) {
    let index = 0;
    const rows = data.get ('rows');
    const count = rows.count ();
    const header = data.get ('header');
    return rows.linq
      .select (row => this.renderRow (header, row, count, index++))
      .toList ();
  }

  render () {
    const data = Widget.shred (this.props.data);
    const styleClass = this.styles.classNames.table;

    return (
      <div className={styleClass}>
        {this.renderHeader (data.get ('header'))}
        {this.renderRows (data)}
      </div>
    );
  }
}

/******************************************************************************/
export default Table;

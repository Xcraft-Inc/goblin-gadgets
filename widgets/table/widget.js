import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import TableRow from 'gadgets/table-row/widget';
import TableCell from 'gadgets/table-cell/widget';

/******************************************************************************/
class Table extends Widget {
  constructor() {
    super(...arguments);

    //???? this.state = {
    //????   selectedRow: null,
    //????   selectedRows: [],
    //???? };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      data: 'data',
      selectedIds: 'selectedIds',
    };
  }

  //???? get selectedRow() {
  //????   return this.state.selectedRow;
  //???? }
  //????
  //???? set selectedRow(value) {
  //????   this.setState({
  //????     selectedRow: value,
  //????   });
  //???? }
  //????
  //???? get selectedRows() {
  //????   if (this.props.selected) {
  //????     return this.props.selected.toArray();
  //????   } else {
  //????     return this.state.selectedRows;
  //????   }
  //???? }
  //????
  //???? set selectedRows(value) {
  //????   this.setState({
  //????     selectedRows: value,
  //????   });
  //???? }

  onSelectionChanged(id) {
    //???? if (this.props.selectionMode === 'single') {
    //????   if (id === this.selectedRow) {
    //????     id = null; // deselect the selected row
    //????   }
    //????   this.selectedRow = id;
    //????
    //????   const x = this.props.onSelectionChanged;
    //????   if (x) {
    //????     x(id);
    //????   }
    //???? } else if (this.props.selectionMode === 'multi') {
    //????   const rows = this.selectedRows.slice();
    //????   const i = rows.indexOf(id);
    //????   if (i === -1) {
    //????     rows.push(id);
    //????   } else {
    //????     rows.splice(i, 1);
    //????   }
    //????   this.selectedRows = rows;
    //????
    //????   const x = this.props.onSelectionChanged;
    //????   if (x) {
    //????     x(rows);
    //????   }
    //???? }

    this.doAs('table-gadget', 'select', {
      mode: this.props.selectionMode,
      rowId: id,
    });
  }

  isSelected(id) {
    //???? if (this.props.selectionMode === 'single') {
    //????   return this.selectedRow === id;
    //???? } else if (this.props.selectionMode === 'multi') {
    //????   return this.selectedRows.indexOf(id) !== -1;
    //???? } else {
    //????   return false;
    //???? }
    return this.props.selectedIds && this.props.selectedIds.includes(id);
  }

  hasHeader(header) {
    return header.linq.where(column => column.get('description')).any();
  }

  /******************************************************************************/

  renderHeaderCell(column, isLast, index) {
    return (
      <TableCell
        key={index}
        index={index}
        width={column.get('width')}
        grow={column.get('grow')}
        textAlign={column.get('textAlign')}
        isLast={Bool.toString(isLast)}
        isHeader="true"
        text={column.get('description')}
        wrap="no"
      />
    );
  }

  renderHeaderCells(header) {
    let index = 0;
    return header.linq
      .select(column => {
        const isLast = index === header.size - 1;
        return this.renderHeaderCell(column, isLast, index++);
      })
      .toList();
  }

  renderHeader(header) {
    if (this.hasHeader(header)) {
      const styleClass = this.styles.classNames.header;
      return <div className={styleClass}>{this.renderHeaderCells(header)}</div>;
    } else {
      return null;
    }
  }

  renderRow(header, row, count, index) {
    return (
      <TableRow
        header={header.state}
        row={row}
        key={index}
        index={index}
        count={count}
        selected={Bool.toString(this.isSelected(row.get('id', null)))}
        selectionChanged={this.onSelectionChanged}
      />
    );
  }

  renderRows(data) {
    let index = 0;
    const rows = data.get('rows');
    const count = rows.count();
    const header = data.get('header');
    return rows.linq
      .select(row => this.renderRow(header, row, count, index++))
      .toList();
  }

  render() {
    const data = Widget.shred(this.props.data);
    const tableClass = this.styles.classNames.table;
    const bodyClass = this.styles.classNames.body;

    return (
      <div className={tableClass}>
        {this.renderHeader(data.get('header'))}
        <div className={bodyClass}>{this.renderRows(data)}</div>
      </div>
    );
  }
}

/******************************************************************************/
export default Table;

import React from 'react';
import Widget from 'laboratory/widget';

import TableRow from 'gadgets/table-row/widget';
import TableCell from 'gadgets/table-cell/widget';

/******************************************************************************/
class Table extends Widget {
  constructor (props) {
    super (props);
    this.state = {
      selectedRow: null,
    };
  }

  get selectedRow () {
    return this.state.selectedRow;
  }

  set selectedRow (value) {
    this.setState ({
      selectedRow: value,
    });
  }

  onSelectionChanged (id) {
    if (this.props.enableSelection === 'true') {
      if (id === this.selectedRow) {
        this.selectedRow = null; // deselect the selected row
      } else {
        this.selectedRow = id; // select the row
      }
    }
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
        isLast={isLast ? 'true' : 'false'}
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
    const styleClass = this.styles.classNames.header;
    return (
      <div className={styleClass}>
        {this.renderHeaderCells (header)}
      </div>
    );
  }

  renderRow (header, row, index) {
    return (
      <TableRow
        header={header.state}
        row={row}
        key={index}
        index={index}
        selected={this.selectedRow === row.get ('id', null) ? 'true' : 'false'}
        selectionChanged={::this.onSelectionChanged}
      />
    );
  }

  renderRows (data) {
    let index = 0;
    const rows = data.get ('rows');
    const header = data.get ('header');
    return rows.linq
      .select (row => this.renderRow (header, row, index++))
      .toList ();
  }

  render () {
    const data = this.shred (this.props.data);
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

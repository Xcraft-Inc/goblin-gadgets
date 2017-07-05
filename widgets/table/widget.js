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
      const currentId = this.selectedRow;
      if (id === currentId) {
        id = null;
      }
      this.selectedRow = id;
    }
  }

  /******************************************************************************/

  renderHeaderCell (column, isLast, index) {
    return (
      <TableCell
        index={index}
        width={column.width}
        grow={column.grow}
        textAlign={column.textAlign}
        isLast={isLast ? 'true' : 'false'}
        isHeader="true"
        text={column.description}
      />
    );
  }

  renderHeaderCells (header) {
    const result = [];
    let index = 0;
    for (var column of header) {
      const isLast = index === header.length - 1;
      result.push (this.renderHeaderCell (column, isLast, index++));
    }
    return result;
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
        header={header}
        row={row}
        index={index}
        selected={this.selectedRow === row.id ? 'true' : 'false'}
        selectionChanged={::this.onSelectionChanged}
      />
    );
  }

  renderRows (data) {
    const result = [];
    let index = 0;
    for (var row of data.rows) {
      result.push (this.renderRow (data.header, row, index++));
    }
    return result;
  }

  render () {
    const data = this.read ('data');
    const styleClass = this.styles.classNames.table;

    return (
      <div className={styleClass}>
        {this.renderHeader (data.header)}
        {this.renderRows (data)}
      </div>
    );
  }
}

/******************************************************************************/
export default Table;

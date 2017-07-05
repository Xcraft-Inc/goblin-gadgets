import React from 'react';
import Widget from 'laboratory/widget';

import TableRow from 'gadgets/table-row/widget';

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
    const currentId = this.selectedRow;
    if (id === currentId) {
      id = null;
    }
    this.selectedRow = id;
  }

  /******************************************************************************/

  renderHeaderColumn (column, last, index) {
    const styleClass = this.styles.classNames.cell;
    const style = Object.assign ({}, this.styles.props.cell);

    if (column.Width) {
      style.minWidth = column.Width;
      style.maxWidth = column.Width;
    } else if (column.Grow) {
      style.flexGrow = column.Grow;
      style.flexShrink = '0';
      style.flexBasis = '0%';
      style.minWidth = '0px';
      style.overflow = 'hidden';
    }
    style.textAlign = column.TextAlign;

    if (!last) {
      style.marginRight = this.context.theme.shapes.tablePadding;
    }

    return (
      <div key={index} className={styleClass} style={style}>
        {column.Description}
      </div>
    );
  }

  renderHeaderColumns (header) {
    const result = [];
    let index = 0;
    for (var column of header) {
      const last = index === header.length - 1;
      result.push (this.renderHeaderColumn (column, last, index++));
    }
    return result;
  }

  renderHeader (header) {
    const styleClass = this.styles.classNames.header;
    return (
      <div className={styleClass}>
        {this.renderHeaderColumns (header)}
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
    for (var row of data.Rows) {
      result.push (this.renderRow (data.Header, row, index++));
    }
    return result;
  }

  render () {
    const data = this.read ('data');
    const styleClass = this.styles.classNames.table;

    return (
      <div className={styleClass}>
        {this.renderHeader (data.Header)}
        {this.renderRows (data)}
      </div>
    );
  }
}

/******************************************************************************/
export default Table;

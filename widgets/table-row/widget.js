import React from 'react';
import Widget from 'laboratory/widget';

import TableCell from 'gadgets/table-cell/widget';

/******************************************************************************/

class TableRow extends Widget {
  constructor (props) {
    super (props);
  }

  renderRowCell (rowId, width, grow, textAlign, isLast, text, index) {
    return (
      <TableCell
        rowId={rowId}
        index={index}
        width={width}
        grow={grow}
        textAlign={textAlign}
        isLast={isLast ? 'true' : 'false'}
        isHeader="false"
        text={text}
        selectionChanged={::this.props.selectionChanged}
      />
    );
  }

  renderRowCells (header, row) {
    const result = [];
    let index = 0;
    for (var column of header) {
      const text = row[column.Name];
      const isLast = index === header.length - 1;
      result.push (
        this.renderRowCell (
          row.id,
          column.Width,
          column.Grow,
          column.TextAlign,
          isLast,
          text,
          index++
        )
      );
    }
    return result;
  }

  render () {
    const header = this.props.header;
    const row = this.props.row;
    const index = this.props.index;
    const selected = this.props.selected;

    var styleName = selected === 'true' ? 'rowSelected' : 'row';
    const rowStyleClass = this.styles.classNames[styleName];

    return (
      <div key={index} className={rowStyleClass}>
        {this.renderRowCells (header, row)}
      </div>
    );
  }
}

/******************************************************************************/
export default TableRow;

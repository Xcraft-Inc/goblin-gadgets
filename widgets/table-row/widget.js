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
        key={index}
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
    let index = 0;
    const h = this.shred (header);
    return h.linq
      .select (column => {
        const text = row.get (column.get ('name'));
        const isLast = index === h.size - 1;

        return this.renderRowCell (
          row.get ('id'),
          column.get ('width'),
          column.get ('grow'),
          column.get ('textAlign'),
          isLast,
          text,
          index++
        );
      })
      .toList ();
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
        {this.renderRowCells (header.toArray (), row)}
      </div>
    );
  }
}

/******************************************************************************/
export default TableRow;

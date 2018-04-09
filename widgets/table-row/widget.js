import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import TableCell from 'gadgets/table-cell/widget';

/******************************************************************************/

class TableRow extends Widget {
  constructor() {
    super(...arguments);

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  onSelectionChanged(id) {
    const x = this.props.selectionChanged;
    if (x) {
      x(id);
    }
  }

  renderRowCell(rowId, width, grow, textAlign, isLast, text, index) {
    return (
      <TableCell
        rowId={rowId}
        key={index}
        index={index}
        width={width}
        grow={grow}
        textAlign={textAlign}
        verticalSpacing={this.props.verticalSpacing}
        isLast={Bool.toString(isLast)}
        isHeader="false"
        text={text}
        selectionChanged={() => this.onSelectionChanged(rowId)}
      />
    );
  }

  renderRowCells(header, row) {
    let index = 0;
    const h = Widget.shred(header);
    return h.linq
      .select(column => {
        const text = row.get(column.get('name'));
        const isLast = index === h.size - 1;

        return this.renderRowCell(
          row.get('id'),
          column.get('width'),
          column.get('grow'),
          column.get('textAlign'),
          isLast,
          text,
          index++
        );
      })
      .toList();
  }

  render() {
    var styleName = Bool.isTrue(this.props.selected) ? 'rowSelected' : 'row';
    const rowStyleClass = this.styles.classNames[styleName];

    return (
      <div key={this.props.index} className={rowStyleClass}>
        {this.renderRowCells(this.props.header.toArray(), this.props.row)}
      </div>
    );
  }
}

/******************************************************************************/
export default TableRow;

//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';
import TableCell from 'goblin-gadgets/widgets/table-cell/widget';
import * as styles from './styles';

/******************************************************************************/

class TableRow extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
  }

  onSelectionChanged(id) {
    const x = this.props.selectionChanged;
    if (x) {
      x(id);
    }
  }

  onDoubleClick(id) {
    const x = this.props.onDoubleClick;
    if (x) {
      x(id);
    }
  }

  renderRowCell(
    rowId,
    width,
    grow,
    textAlign,
    type,
    indent,
    isLast,
    text,
    index
  ) {
    return (
      <TableCell
        rowId={rowId}
        key={index}
        index={index}
        width={width}
        grow={grow}
        level={this.props.level}
        textAlign={textAlign}
        type={type}
        indent={indent}
        fontSizeStrategy={this.props.fontSizeStrategy}
        isLast={Bool.toString(isLast)}
        isHeader={false}
        text={text}
        selectionChanged={() => this.onSelectionChanged(rowId)}
        onDoubleClick={() => this.onDoubleClick(rowId)}
      />
    );
  }

  renderRowCells(header, row) {
    let index = 0;
    const h = Widget.shred(header);
    return h
      .map(column => {
        const text = row.get(column.get('name'));
        const isLast = index === h.size - 1;

        return this.renderRowCell(
          row.get('id'),
          column.get('width'),
          column.get('grow'),
          column.get('textAlign'),
          column.get('type'),
          column.get('indent'),
          isLast,
          text,
          index++
        );
      })
      .toArray();
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

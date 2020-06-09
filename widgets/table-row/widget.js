import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import TableCell from 'goblin-gadgets/widgets/table-cell/widget';
import * as styles from './styles';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

/******************************************************************************/

export default class TableRow extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.useKeyUpDown && this._ref && this.props.selected) {
      scrollIntoViewIfNeeded(this._ref, {
        duration: 100,
      });
    }
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
        cellFormat={this.props.cellFormat}
        isLast={isLast}
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
      .map((column) => {
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
    var styleName = this.props.selected ? 'rowSelected' : 'row';
    const rowStyleClass = this.styles.classNames[styleName];

    return (
      <div
        ref={(node) => {
          this._ref = node;
        }}
        key={this.props.index}
        className={rowStyleClass}
      >
        {this.renderRowCells(this.props.header.toArray(), this.props.row)}
      </div>
    );
  }
}

/******************************************************************************/

TableRow.propTypes = makePropTypes(Props);
TableRow.defaultProps = makeDefaultProps(Props);

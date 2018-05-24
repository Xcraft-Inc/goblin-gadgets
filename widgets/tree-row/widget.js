import React from 'react';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');

import TreeCell from 'gadgets/tree-cell/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class TreeRow extends Widget {
  constructor() {
    super(...arguments);

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  onSelectionChanged(id) {
    if (Bool.isTrue(this.props.selection)) {
      const x = this.props.selectionChanged;
      if (x) {
        x(id);
      }
    } else {
      this.onExpand();
    }
  }

  onDoubleClick(id) {
    const x = this.props.onDoubleClick;
    if (x) {
      x(id);
    }
  }

  onExpand() {
    const x = this.props.onExpand;
    if (x) {
      x();
    }
  }

  /******************************************************************************/

  renderExpandButton() {
    const styleClass = this.styles.classNames.expandButton;
    const glyph = this.props.hasChildren
      ? 'solid/chevron-right'
      : 'solid/circle';
    const glyphSize = this.props.hasChildren ? null : '30%';

    return (
      <div className={styleClass}>
        <Button
          kind="tree-expand"
          glyph={glyph}
          glyphSize={glyphSize}
          onClick={this.onExpand}
        />
      </div>
    );
  }

  renderRowCell(rowId, width, grow, textAlign, indent, text, index) {
    return (
      <TreeCell
        rowId={rowId}
        key={index}
        index={index}
        width={width}
        grow={grow}
        level={this.props.level}
        textAlign={textAlign}
        indent={indent}
        verticalSpacing={this.props.verticalSpacing}
        isHeader="false"
        text={text}
        selectionChanged={() => this.onSelectionChanged(rowId)}
        onDoubleClick={() => this.onDoubleClick(rowId)}
      />
    );
  }

  renderRowCells(header, row) {
    let index = 0;
    const h = Widget.shred(header);
    return h.linq
      .select(column => {
        const text = row.get(column.get('name'));

        return this.renderRowCell(
          row.get('id'),
          column.get('width'),
          column.get('grow'),
          column.get('textAlign'),
          column.get('indent'),
          text,
          index++
        );
      })
      .toList();
  }

  render() {
    var styleName = Bool.isTrue(this.props.selected) ? 'rowSelected' : 'row';
    const rowClass = this.styles.classNames[styleName];

    return (
      <div
        key={this.props.index}
        className={`${rowClass} ${this.props.hoverClass}`}
      >
        {this.renderExpandButton()}
        {this.renderRowCells(this.props.header.toArray(), this.props.row)}
      </div>
    );
  }
}

/******************************************************************************/
export default TreeRow;

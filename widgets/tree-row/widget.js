import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import TreeCell from 'gadgets/tree-cell/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class TreeRow extends Widget {
  constructor() {
    super(...arguments);

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
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

  onExpand() {
    const x = this.props.onExpand;
    if (x) {
      x();
    }
  }

  /******************************************************************************/

  renderExpandButton() {
    const styleClass = this.styles.classNames.expandButton;
    const glyph = this.props.hasChildren ? 'solid/chevron-right' : null;

    return (
      <div className={styleClass}>
        <Button kind="tree-expand" glyph={glyph} onClick={this.onExpand} />
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
    const rowStyleClass = this.styles.classNames[styleName];

    return (
      <div key={this.props.index} className={rowStyleClass}>
        {this.renderExpandButton()}
        {this.renderRowCells(this.props.header.toArray(), this.props.row)}
      </div>
    );
  }
}

/******************************************************************************/
export default TreeRow;

//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import TreeCell from 'goblin-gadgets/widgets/tree-cell/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import * as styles from './styles';

/******************************************************************************/

export default class TreeRow extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  onSelectionChanged(id) {
    if (this.props.selection) {
      const x = this.props.selectionChanged;
      if (x) {
        x(id);
      }
    } else {
      if (this.props.hasChildren) {
        this.onExpand();
      } else {
        const x = this.props.onClick;
        if (x) {
          x(id);
        }
      }
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
      .valueSeq()
      .toArray();
  }

  render() {
    var styleName = this.props.selected ? 'rowSelected' : 'row';
    const rowClass = this.styles.classNames[styleName];

    return (
      <div
        key={this.props.index}
        className={`${this.props.hoverClass} ${rowClass}`}
      >
        {this.renderExpandButton()}
        {this.renderRowCells(
          this.props.header.valueSeq().toArray(),
          this.props.row
        )}
      </div>
    );
  }
}

/******************************************************************************/

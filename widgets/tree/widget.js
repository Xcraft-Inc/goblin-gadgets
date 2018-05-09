import React from 'react';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');

import TreeRow from 'gadgets/tree-row/widget';
import TreeCell from 'gadgets/tree-cell/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function pushIds(ids, row) {
  if (row) {
    for (const item of row.toArray()) {
      ids.push(item.get('id'));
      const subRows = item.get('rows');
      if (subRows) {
        pushIds(ids, subRows);
      }
    }
  }
}

/******************************************************************************/
class Tree extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      expand: '',
    };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.compactAll = this.compactAll.bind(this);
    this.expandAll = this.expandAll.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      data: 'data',
      selectedIds: 'selectedIds',
    };
  }

  //#region get/set
  get expand() {
    return this.state.expand;
  }

  set expand(value) {
    this.setState({
      expand: value,
    });
  }
  //#endregion

  swapExpand(id) {
    const a = this.expand === '' ? [] : this.expand.split(',');
    const i = a.indexOf(id);
    if (i === -1) {
      a.push(id);
    } else {
      a.splice(i, 1);
    }
    this.expand = a.join(',');
  }

  getExpand(id) {
    const a = this.expand === '' ? [] : this.expand.split(',');
    return a.indexOf(id) !== -1;
  }

  getAllExpandIds(data) {
    const ids = [];
    pushIds(ids, data.get('rows'));
    return ids;
  }

  onSelectionChanged(id) {
    this.doAs('tree-gadget', 'select', {
      mode: this.props.selectionMode,
      rowId: id,
    });

    const x = this.props.selectionChanged;
    if (x) {
      x(id);
    }
  }

  onExpand(id) {
    this.swapExpand(id);
  }

  selectAll() {
    this.doAs('tree-gadget', 'selectAll');
  }

  deselectAll() {
    this.doAs('tree-gadget', 'deselectAll');
  }

  compactAll() {
    this.expand = '';
  }

  expandAll(data) {
    this.expand = this.getAllExpandIds(data).join(',');
  }

  isAllSelected(data) {
    const rows = data
      .get('rows')
      .toArray()
      .map(row => row.get('id'));
    const uniques = rows.filter(onlyUnique);

    return (
      this.props.selectedIds && this.props.selectedIds.size === uniques.length
    );
  }

  isAllDeselected() {
    return !this.props.selectedIds || this.props.selectedIds.size === 0;
  }

  isSelected(id) {
    return this.props.selectedIds && this.props.selectedIds.includes(id);
  }

  isAllExpanded(data) {
    const ids = this.getAllExpandIds(data);
    const a = this.expand === '' ? [] : this.expand.split(',');
    return ids.length === a.length;
  }

  isAllCompacted() {
    return this.expand === '';
  }

  hasHeader(header) {
    return header.linq.where(column => column.get('description')).any();
  }

  /******************************************************************************/

  renderHeaderCell(column, isLast, index) {
    return (
      <TreeCell
        key={index}
        index={index}
        width={column.get('width')}
        grow={column.get('grow')}
        textAlign={column.get('textAlign')}
        isLast={Bool.toString(isLast)}
        isHeader="true"
        text={column.get('description')}
        wrap="no"
      />
    );
  }

  renderHeaderCells(header) {
    let index = 0;
    return header.linq
      .select(column => {
        const isLast = index === header.size - 1;
        return this.renderHeaderCell(column, isLast, index++);
      })
      .toList();
  }

  renderHeader(header) {
    if (this.hasHeader(header)) {
      const styleClass = this.styles.classNames.header;
      return <div className={styleClass}>{this.renderHeaderCells(header)}</div>;
    } else {
      return null;
    }
  }

  renderRow(header, level, row, index) {
    const rows = row.get('rows');
    const id = row.get('id');
    return (
      <TreeRow
        header={header.state}
        row={row}
        key={index}
        index={index}
        level={level}
        selected={Bool.toString(this.isSelected(id))}
        isExpanded={this.getExpand(id)}
        hasChildren={rows && rows.size > 0}
        selection={this.props.selection}
        selectionChanged={this.onSelectionChanged}
        onExpand={() => this.onExpand(id)}
      />
    );
  }

  renderIndentRows(header, rows, level) {
    const result = [];
    for (let i = 0; i < rows.size; i++) {
      const row = rows.get(i);
      result.push(this.renderRow(header, level, row, i));
      const subRows = row.get('rows');
      if (subRows) {
        const subExpanded = this.getExpand(row.get('id'));
        result.push(this.renderIndent(header, subRows, subExpanded, level + 1));
      }
    }
    return result;
  }

  renderIndent(header, rows, expanded, level) {
    const indentClass = expanded
      ? this.styles.classNames.indentExpanded
      : this.styles.classNames.indentHidden;

    return (
      <div className={indentClass}>
        {this.renderIndentRows(header, rows, level)}
      </div>
    );
  }

  renderRows(data) {
    const rows = data.get('rows');
    const header = data.get('header');
    return this.renderIndent(header, rows, true, 0);
  }

  renderButton(data, existingButton, index, existingIndex, existingCount) {
    let glyph, text, onClick;
    switch (index) {
      case 0:
        glyph = 'solid/check';
        text = 'Tout sélectionner';
        onClick = this.selectAll;
        break;
      case 1:
        glyph = 'solid/ban';
        text = 'Tout désélectionner';
        onClick = this.deselectAll;
        break;
      case 2:
        glyph = 'solid/angle-double-down';
        text = 'Tout étendre';
        onClick = () => this.expandAll(data);
        break;
      case 3:
        glyph = 'solid/angle-double-left';
        text = 'Tout compacter';
        onClick = this.compactAll;
        break;
    }

    return (
      <Button
        kind={
          Bool.isTrue(this.props.frame) ? 'table-action-frame' : 'table-action'
        }
        place={`${existingIndex + 1}/${existingCount}`}
        grow={existingButton ? '1' : '0'}
        spacing={
          existingButton && existingIndex < existingCount - 1
            ? Bool.isTrue(this.props.frame)
              ? 'overlap'
              : 'tiny'
            : null
        }
        glyph={glyph}
        text={text}
        onClick={onClick}
      />
    );
  }

  renderButtons(data) {
    const size = data.get('rows').size;
    if (Bool.isTrue(this.props.hasButtons) && size > 0) {
      // Search existing buttons (array of true/false).
      const existingButtons = [];
      existingButtons.push(
        Bool.isTrue(this.props.selection) && !this.isAllSelected(data)
      );
      existingButtons.push(
        Bool.isTrue(this.props.selection) && !this.isAllDeselected()
      );
      existingButtons.push(!this.isAllExpanded(data));
      existingButtons.push(!this.isAllCompacted());

      // Count existing buttons.
      let existingCount = 0;
      for (const existingButton of existingButtons) {
        if (existingButton) {
          existingCount++;
        }
      }

      // Render all buttons.
      const result = [];
      let existingIndex = 0;
      for (let index = 0; index < existingButtons.length; index++) {
        const existingButton = existingButtons[index];
        result.push(
          this.renderButton(
            data,
            existingButton,
            index,
            existingIndex,
            existingCount
          )
        );
        if (existingButton) {
          existingIndex++;
        }
      }
      return result;
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    const data = Widget.shred(this.props.data);
    const boxClass = this.styles.classNames.box;
    const treeClass = this.styles.classNames.tree;
    const bodyClass = this.styles.classNames.body;
    const verticalSeparatorClass = this.styles.classNames.verticalSeparator;
    const buttonsClass = this.styles.classNames.buttons;

    return (
      <div className={boxClass}>
        <div className={treeClass}>
          {this.renderHeader(data.get('header'))}
          <div className={bodyClass}>{this.renderRows(data)}</div>
          <div className={verticalSeparatorClass} />
        </div>
        <div className={buttonsClass}>{this.renderButtons(data)}</div>
      </div>
    );
  }
}

/******************************************************************************/
export default Tree;

import T from 't';
import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';

import TreeRow from 'goblin-gadgets/widgets/tree-row/widget';
import TreeCell from 'goblin-gadgets/widgets/tree-cell/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import * as styles from './styles';

/******************************************************************************/

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function pushIds(ids, row) {
  if (row) {
    for (const item of row.valueSeq().toArray()) {
      ids.push(item.get('id'));
      const subRows = item.get('rows');
      if (subRows) {
        pushIds(ids, subRows);
      }
    }
  }
}

/******************************************************************************/
export default class Tree extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      expand: '',
    };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
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

  onDoubleClick(id) {
    this.doAs('tree-gadget', 'doubleClick', {
      rowId: id,
    });
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
      .valueSeq()
      .toArray()
      .map((row) => row.get('id'));
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
    return header.map((column) => column.get('description')).length > 0
      ? true
      : false;
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
        isLast={isLast}
        isHeader={true}
        text={column.get('description')}
        wrap="no"
      />
    );
  }

  renderHeaderCells(header) {
    let index = 0;
    return header
      .map((column) => {
        const isLast = index === header.size - 1;
        return this.renderHeaderCell(column, isLast, index++);
      })
      .valueSeq()
      .toArray();
  }

  renderHeader(header) {
    if (this.hasHeader(header)) {
      return (
        <div className={this.styles.classNames.header}>
          {this.renderHeaderCells(header)}
        </div>
      );
    } else {
      return null;
    }
  }

  renderRow(header, level, row, index) {
    const rows = row.get('rows');
    const id = row.get('id');
    return (
      <TreeRow
        hoverClass={this.styles.classNames.hover}
        header={header.state}
        row={row}
        key={index}
        index={index}
        level={level}
        selected={this.isSelected(id)}
        isExpanded={this.getExpand(id)}
        hasChildren={rows && rows.size > 0}
        selection={this.props.selection}
        selectionChanged={this.onSelectionChanged}
        onClick={this.props.onClick}
        onDoubleClick={this.onDoubleClick}
        onExpand={() => this.onExpand(id)}
      />
    );
  }

  renderIndentRows(header, rows, level) {
    const result = [];
    for (let i = 0; i < rows.size; i++) {
      const row = rows.get(i);
      const subRows = row.get('rows');
      const id = row.get('id');

      result.push(this.renderRow(header, level, row, i));
      if (subRows) {
        result.push(
          this.renderIndent(
            header,
            subRows,
            this.getExpand(id),
            level + 1,
            id + i
          )
        );
      }
    }
    return result;
  }

  renderIndent(header, rows, expanded, level, uniqueKey) {
    const indentClass = expanded
      ? this.styles.classNames.indentExpanded
      : this.styles.classNames.indentHidden;

    return (
      <div key={uniqueKey} className={`tree-hover ${indentClass}`}>
        {this.renderIndentRows(header, rows, level)}
      </div>
    );
  }

  renderRows(data) {
    const rows = data.get('rows');
    const header = data.get('header');
    return this.renderIndent(header, rows, true, 0, 0);
  }

  renderButton(data, existingButton, index, existingIndex, existingCount) {
    let glyph, text, onClick;
    switch (index) {
      case 0:
        glyph = 'solid/check';
        text = T('Tout sélectionner');
        onClick = this.selectAll;
        break;
      case 1:
        glyph = 'solid/ban';
        text = T('Tout désélectionner');
        onClick = this.deselectAll;
        break;
      case 2:
        glyph = 'solid/angle-double-down';
        text = T('Tout étendre');
        onClick = () => this.expandAll(data);
        break;
      case 3:
        glyph = 'solid/angle-double-left';
        text = T('Tout compacter');
        onClick = this.compactAll;
        break;
    }

    return (
      <Button
        key={index}
        kind={this.props.frame ? 'table-action-frame' : 'table-action'}
        place={`${existingIndex + 1}/${existingCount}`}
        grow={existingButton ? '1' : '0'}
        horizontalSpacing={
          existingButton && existingIndex < existingCount - 1
            ? this.props.frame
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
    if (this.props.hasButtons && size > 0) {
      // Search existing buttons (array of true/false).
      const existingButtons = [];
      existingButtons.push(this.props.selection && !this.isAllSelected(data));
      existingButtons.push(this.props.selection && !this.isAllDeselected());
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

    return (
      <div className={this.styles.classNames.box}>
        <div className={this.styles.classNames.tree}>
          {this.renderHeader(data.get('header'))}
          <div className={this.styles.classNames.body}>
            {this.renderRows(data)}
          </div>
        </div>
        <div className={this.styles.classNames.buttons}>
          {this.renderButtons(data)}
        </div>
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(Tree, props, scenarios);

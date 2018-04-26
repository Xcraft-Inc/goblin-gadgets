import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import TableRow from 'gadgets/table-row/widget';
import TableCell from 'gadgets/table-cell/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

/******************************************************************************/
class Table extends Widget {
  constructor() {
    super(...arguments);

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      data: 'data',
      selectedIds: 'selectedIds',
    };
  }

  onSelectionChanged(id) {
    this.doAs('table-gadget', 'select', {
      mode: this.props.selectionMode,
      rowId: id,
    });
  }

  selectAll() {
    this.doAs('table-gadget', 'selectAll');
  }

  deselectAll() {
    this.doAs('table-gadget', 'deselectAll');
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

  hasHeader(header) {
    return header.linq.where(column => column.get('description')).any();
  }

  /******************************************************************************/

  renderHeaderCell(column, isLast, index) {
    return (
      <TableCell
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

  renderRow(header, level, row, isLast, index) {
    return (
      <TableRow
        header={header.state}
        row={row}
        key={index}
        index={index}
        isLast={isLast}
        level={level}
        horizontalSeparator={row.get('horizontalSeparator')}
        verticalSpacingAfterLast={row.get('verticalSpacingAfterLast')}
        verticalSpacing={row.get('verticalSpacing')}
        selected={Bool.toString(this.isSelected(row.get('id', null)))}
        selectionChanged={this.onSelectionChanged}
      />
    );
  }

  pushRow(result, level, header, row, isLast, index) {
    result.push(this.renderRow(header, level, row, isLast, index++));

    const subRows = row.get('rows');
    if (subRows) {
      for (let i = 0; i < subRows.size; i++) {
        const subRow = subRows.get(i);
        const subIsLast = i === subRows.size - 1;
        index = this.pushRow(
          result,
          level + 1,
          header,
          subRow,
          subIsLast,
          index
        );
      }
    }

    return index;
  }

  renderRows(data) {
    let index = 0;
    const rows = data.get('rows');
    const header = data.get('header');

    const result = [];
    for (let i = 0; i < rows.size; i++) {
      const row = rows.get(i);
      const isLast = i === rows.size - 1;
      index = this.pushRow(result, 0, header, row, isLast, index);
    }
    return result;
  }

  renderButtons(data) {
    const size = data.get('rows').size;
    if (Bool.isTrue(this.props.hasButtons) && size > 0) {
      const buttonsClass = this.styles.classNames.buttons;
      const isAllSelected = this.isAllSelected(data);
      const isAllDeselected = this.isAllDeselected();
      return (
        <div className={buttonsClass}>
          <Button
            kind={
              Bool.isTrue(this.props.frame)
                ? 'table-action-frame'
                : 'table-action'
            }
            place={isAllDeselected ? '1/1' : '1/2'}
            glyph="solid/check"
            text="Tout sélectionner"
            grow={isAllSelected ? '0' : '1'}
            spacing={isAllDeselected ? null : 'overlap'}
            onClick={this.selectAll}
          />
          <Button
            kind={
              Bool.isTrue(this.props.frame)
                ? 'table-action-frame'
                : 'table-action'
            }
            place={isAllSelected ? '1/1' : '2/2'}
            glyph="solid/ban"
            text="Tout désélectionner"
            grow={isAllDeselected ? '0' : '1'}
            onClick={this.deselectAll}
          />
        </div>
      );
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
    const tableClass = this.styles.classNames.table;
    const bodyClass = this.styles.classNames.body;
    const verticalSeparatorClass = this.styles.classNames.verticalSeparator;

    return (
      <div className={boxClass}>
        <div className={tableClass}>
          {this.renderHeader(data.get('header'))}
          <div className={bodyClass}>{this.renderRows(data)}</div>
          <div className={verticalSeparatorClass} />
        </div>
        {this.renderButtons(data)}
      </div>
    );
  }
}

/******************************************************************************/
export default Table;

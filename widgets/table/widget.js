import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

import TableRow from 'gadgets/table-row/widget';
import TableCell from 'gadgets/table-cell/widget';
import Button from 'gadgets/button/widget';
import ScrollableContainer from 'gadgets/scrollable-container/widget';

/******************************************************************************/

function getSortingColumn(row, columnName, type) {
  let content = row.get(columnName);
  if (type === 'price') {
    const i = parseInt(content);
    if (isNaN(i) || !content) {
      content = Number.MIN_SAFE_INTEGER;
    } else {
      content = i;
    }
  }
  return content;
}

function getColumnType(header, columnName) {
  for (const column of header) {
    if (column.get('name') === columnName) {
      return column.get('type');
    }
  }
  return null;
}

function sort(rows, header, sortingColumns) {
  return rows.sort(function(a, b) {
    for (let columnName of sortingColumns) {
      let e = 1;
      if (columnName.startsWith('!')) {
        columnName = columnName.substring(1);
        e = -1;
      }
      const type = getColumnType(header, columnName);
      const ka = getSortingColumn(a, columnName, type);
      const kb = getSortingColumn(b, columnName, type);
      if (ka < kb) {
        return -e;
      } else if (ka > kb) {
        return e;
      }
    }
    return 0;
  });
}

/******************************************************************************/

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// Recursively traverses rows to generate a flat list containing levels.
function flatten(list, rows, level) {
  for (let i = 0; i < rows.size; i++) {
    const row = rows.get(i);
    const horizontalSeparator = row.get('horizontalSeparator');
    list.push({
      row: row,
      level: level,
      topSeparator:
        horizontalSeparator === 'up' ||
        horizontalSeparator === 'top' ||
        horizontalSeparator === 'both',
      bottomSeparator:
        horizontalSeparator === 'down' ||
        horizontalSeparator === 'bottom' ||
        horizontalSeparator === 'both',
    });

    const subRows = row.get('rows');
    if (subRows) {
      flatten(list, subRows, level + 1);
    }
  }
}

// Distributes the adjacent line separators.
// An upper horizontal separator must be mentioned as a lower separator in the previous line.
// A lower horizontal separator must be mentioned as upper separator in the following line.
// When a row is drawn, it is always only its top separator that is drawn.
function diffuseSeparators(list) {
  for (let i = 0; i < list.length; i++) {
    const prev = i > 0 ? list[i - 1] : null;
    const current = list[i];
    const next = i < list.length - 1 ? list[i + 1] : null;

    if (prev && current.topSeparator) {
      prev.bottomSeparator = true;
    }

    if (next && current.bottomSeparator) {
      next.topSeparator = true;
    }

    current.isLast = i === list.length - 1; // Is this the last line of the table?
    current.index = i;
  }
}

// Return a unique id for memorize scroller position.
function getUniqueId(data) {
  const header = data.get('header');
  const names = header.linq
    .select(column => {
      return column.get('name');
    })
    .toList();
  const rowsCount = data.get('rows').size;
  return `Table:${names.join('/')}:${rowsCount}`;
}

/******************************************************************************/
class Table extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      sortingColumns: [],
    };

    this.onSortingChanged = this.onSortingChanged.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
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

  //#region get/set
  get sortingColumns() {
    return this.state.sortingColumns;
  }

  set sortingColumns(value) {
    this.setState({
      sortingColumns: value,
    });
  }
  //#endregion

  componentWillMount() {
    const defaultSortingColumns = this.props.data
      ? this.props.data.get('defaultSortingColumns')
      : null;
    if (defaultSortingColumns) {
      this.sortingColumns = defaultSortingColumns.toArray();
    }
  }

  onSortingChanged(columnName) {
    let sortingColumns = this.sortingColumns;
    if (sortingColumns.length > 0 && sortingColumns[0] === columnName) {
      sortingColumns[0] = '!' + columnName;
      sortingColumns = sortingColumns.concat();
    } else if (
      sortingColumns.length > 0 &&
      sortingColumns[0] === '!' + columnName
    ) {
      sortingColumns[0] = columnName;
      sortingColumns = sortingColumns.concat();
    } else {
      let i = sortingColumns.indexOf(columnName);
      if (i === -1) {
        i = sortingColumns.indexOf('!' + columnName);
      }
      if (i !== -1) {
        sortingColumns.splice(i, 1);
      }
      sortingColumns = [columnName].concat(sortingColumns);
    }
    this.sortingColumns = sortingColumns;
  }

  onSelectionChanged(id) {
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(id);
    } else {
      this.doAs('table-gadget', 'select', {
        mode: this.props.selectionMode,
        rowId: id,
      });
    }
  }

  onDoubleClick(id) {
    this.doAs('table-gadget', 'doubleClick', {
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

  renderHeaderCellBase(column, isSortable, isLast, width, grow, index) {
    let glyph = null;
    if (this.sortingColumns.length > 0) {
      const columnName = column.get('name');
      if (this.sortingColumns[0] === columnName) {
        glyph = 'solid/caret-down';
      } else if (this.sortingColumns[0] === '!' + columnName) {
        glyph = 'solid/caret-up';
      }
    }
    return (
      <TableCell
        key={index}
        index={index}
        width={width}
        grow={grow}
        textAlign={column.get('textAlign')}
        isSortable={isSortable}
        isLast={Bool.toString(isLast)}
        isHeader="true"
        text={column.get('description')}
        glyph={glyph}
        spacing="compact"
        wrap="no"
        selectionChanged={() => this.onSortingChanged(column.get('name'))}
      />
    );
  }

  renderPostHeaderCell(column, header, isSortable, isLast, index) {
    // Compute the width and grow of the included columns.
    let width = '0px';
    let grow = 0;
    for (const name of column.get('names')) {
      const c = header.linq.where(x => name === x.get('name')).firstOrDefault();
      if (c) {
        const w = c.get('width');
        if (w) {
          width = Unit.add(width, w);
        }
        let g = c.get('grow');
        if (g) {
          if (typeof g === 'string') {
            g = parseInt(g);
          }
          grow += g;
        }
      } else {
        console.log(
          `WARNING in Table: post-header uses an unknown column name (${name}).`
        );
      }
    }
    if (width !== '0px' && grow !== 0) {
      console.log(
        `WARNING in Table: post-header with mix of width (${width}) and grow (${grow}) is not supported.`
      );
    }
    return this.renderHeaderCellBase(
      column,
      isSortable,
      isLast,
      width === '0px' ? null : width,
      grow === 0 ? null : grow,
      index
    );
  }

  renderPostHeaderCells(postHeader, header, isSortable) {
    let index = 0;
    return postHeader.linq
      .select(column => {
        const isLast = index === postHeader.size - 1;
        return this.renderPostHeaderCell(
          column,
          header,
          isSortable,
          isLast,
          index++
        );
      })
      .toList();
  }

  renderPostHeader(postHeader, header, isSortable) {
    return (
      <div className={this.styles.classNames.postHeader}>
        {this.renderPostHeaderCells(postHeader, header, isSortable)}
      </div>
    );
  }

  renderHeaderCell(column, isSortable, isLast, index) {
    return this.renderHeaderCellBase(
      column,
      isSortable,
      isLast,
      column.get('width'),
      column.get('grow'),
      index
    );
  }

  renderHeaderCells(header, isSortable) {
    let index = 0;
    return header.linq
      .select(column => {
        const isLast = index === header.size - 1;
        return this.renderHeaderCell(column, isSortable, isLast, index++);
      })
      .toList();
  }

  renderHeader(header, isSortable) {
    if (this.hasHeader(header)) {
      return (
        <div className={this.styles.classNames.header}>
          {this.renderHeaderCells(header, isSortable)}
        </div>
      );
    } else {
      return null;
    }
  }

  renderHeaders(data, isSortable) {
    const postHeader = data.get('post-header');
    const header = data.get('header');
    if (!header) {
      throw new Error('Table without header');
    }

    if (postHeader) {
      return (
        <div>
          {this.renderPostHeader(postHeader, header, isSortable)}
          {this.renderHeader(header, isSortable)}
        </div>
      );
    } else {
      return this.renderHeader(header, isSortable);
    }
  }

  renderRow(header, item) {
    return (
      <TableRow
        header={header.state}
        row={item.row}
        key={item.index}
        index={item.index}
        level={item.level}
        topSeparator={item.topSeparator}
        bottomSeparator={item.bottomSeparator}
        isLast={item.isLast}
        fontSizeStrategy={this.props.fontSizeStrategy}
        selected={Bool.toString(this.isSelected(item.row.get('id', null)))}
        selectionChanged={this.onSelectionChanged}
        onDoubleClick={this.onDoubleClick}
      />
    );
  }

  renderRows(data, isSortable) {
    const list = [];
    let rows = data.get('rows');
    if (isSortable) {
      const header = data.get('header');
      rows = sort(rows, header, this.sortingColumns);
    }
    flatten(list, rows, 0);
    diffuseSeparators(list);

    const result = [];
    const header = data.get('header');
    for (const item of list) {
      result.push(this.renderRow(header, item));
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
    const isSortable = data.get('sorting') === 'enable';
    const scrollableId = getUniqueId(data);

    return (
      <div className={this.styles.classNames.box}>
        <div className={this.styles.classNames.table}>
          {this.renderHeaders(data, isSortable)}
          <ScrollableContainer
            kind="table-body"
            id={scrollableId}
            height={this.props.height}
          >
            {this.renderRows(data, isSortable)}
          </ScrollableContainer>
          <div className={this.styles.classNames.verticalSeparator} />
        </div>
        {this.renderButtons(data)}
      </div>
    );
  }
}

/******************************************************************************/
export default Table;

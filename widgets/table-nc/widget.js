//T:2019-02-27
import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import {Unit} from 'electrum-theme';

import {
  date as DateConverters,
  time as TimeConverters,
  price as PriceConverters,
} from 'xcraft-core-converters';

import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

import TableRow from 'goblin-gadgets/widgets/table-row/widget';
import TableCell from 'goblin-gadgets/widgets/table-cell/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import TextInputNC from 'goblin-gadgets/widgets/text-input-nc/widget';
import ScrollableContainer from 'goblin-gadgets/widgets/scrollable-container/widget';
import T from 't';
import * as styles from './styles';

/******************************************************************************/

function getFilterContent(row, columnName, type) {
  let content = row.get(columnName);
  switch (type) {
    case 'date':
      content = DateConverters.getDisplayed(content);
      break;
    case 'time':
      content = TimeConverters.getDisplayed(content);
      break;
    case 'price':
      content = PriceConverters.getDisplayed(content);
      break;
  }
  return typeof content === 'string' ? content.toUpperCase() : '';
}

function filterRow(row, header, filter) {
  for (const column of header) {
    const columnName = column.get('name');
    const type = column.get('type');
    const content = getFilterContent(row, columnName, type);
    if (content.includes(filter)) {
      return true;
    }
  }
  return false;
}

function filter(rows, header, filter) {
  if (!filter || filter === '') {
    return rows;
  } else {
    return rows.filter((row) => filterRow(row, header, filter.toUpperCase()));
  }
}

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
  } else {
    content = typeof content === 'string' ? content.toUpperCase() : '';
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
  if (sortingColumns) {
    return rows.sort(function (a, b) {
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
  } else {
    return rows;
  }
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
  const names = header
    .map((column) => {
      return column.get('name');
    })
    .toArray();
  const rowsCount = data.get('rows').size;
  return `Table:${names.join('/')}:${rowsCount}`;
}

/******************************************************************************/
export default class TableNC extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onUpdateFilter = this.onUpdateFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
    this.onSortingChanged = this.onSortingChanged.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
  }

  setFilter(value) {
    this.dispatch({
      type: 'SET_VALUE',
      field: 'filter',
      value: value,
    });
  }

  setSortingColumns(value) {
    this.dispatch({
      type: 'SET_VALUE',
      field: 'sortingColumns',
      value: value,
    });
  }

  componentWillMount() {
    if (this.props.data) {
      const data = Widget.shred(this.props.data);
      const defaultSortingColumns = data.get('defaultSortingColumns');
      if (defaultSortingColumns) {
        this.setSortingColumns(defaultSortingColumns.toArray());
      }
    }
  }

  onChangeFilter(value) {
    this.setFilter(value);
  }

  onClearFilter() {
    this.setFilter('');
  }

  onUpdateFilter() {}

  onSortingChanged(columnName) {
    let sortingColumns = this.props.sortingColumns.toArray();
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
    this.setSortingColumns(sortingColumns);
  }

  onSelectionChanged(id) {
    if (!this.props.id && !this.context.id) {
      return;
    }
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
    if (!this.props.id && !this.context.id) {
      return;
    }
    this.doAs('table-gadget', 'doubleClick', {
      rowId: id,
    });
  }

  selectAll() {
    if (!this.props.id && !this.context.id) {
      return;
    }
    this.doAs('table-gadget', 'selectAll');
  }

  deselectAll() {
    if (!this.props.id && !this.context.id) {
      return;
    }
    this.doAs('table-gadget', 'deselectAll');
  }

  isAllSelected(data) {
    const rows = data
      .get('rows')
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

  hasHeader(header) {
    return header.map((column) => column.get('description')).length > 0
      ? true
      : false;
  }

  /******************************************************************************/

  renderFilter(isFilterable) {
    if (isFilterable) {
      if (this.props.filter) {
        const glyph = {
          glyph: 'solid/filter',
          color: this.context.theme.palette.textColor,
        };
        return (
          <div className={this.styles.classNames.filter}>
            <TextInputNC
              border="none"
              grow="1"
              shape="left-smooth"
              glyph={glyph}
              hintText={T('Filtre')}
              value={this.props.filter}
              onChange={this.onChangeFilter}
              horizontalSpacing="overlap"
            />
            <Button
              border="none"
              glyph="solid/times"
              tooltip={T('Supprime le filtre (donc montre tout)')}
              shape="right-smooth"
              onClick={this.onClearFilter}
            />
          </div>
        );
      } else {
        const glyph = {
          glyph: 'solid/filter',
          color: this.context.theme.palette.hintTextColor,
        };
        return (
          <div className={this.styles.classNames.filter}>
            <TextInputNC
              border="none"
              grow="1"
              shape="smooth"
              glyph={glyph}
              hintText={T('Filtre')}
              value={this.props.filter}
              onChange={this.onChangeFilter}
            />
          </div>
        );
      }
    } else {
      return null;
    }
  }

  renderHeaderCellBase(column, isSortable, isLast, width, grow, index) {
    let glyph = null;
    if (this.props.sortingColumns && this.props.sortingColumns.length > 0) {
      const columnName = column.get('name');
      if (this.props.sortingColumns.get(0) === columnName) {
        glyph = 'solid/caret-down';
      } else if (this.props.sortingColumns.get(0) === '!' + columnName) {
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
        isLast={isLast}
        isHeader={true}
        simpleHeader={this.props.simpleHeader}
        text={column.get('description')}
        glyph={glyph}
        horizontalSpacing="compact"
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
      const c =
        header.map((x) => {
          if (name === x.get('name')) {
            return x;
          }
        })[0] || null;
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
    return postHeader
      .map((column) => {
        const isLast = index === postHeader.size - 1;
        return this.renderPostHeaderCell(
          column,
          header,
          isSortable,
          isLast,
          index++
        );
      })
      .toArray();
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
    return header
      .map((column) => {
        const isLast = index === header.size - 1;
        return this.renderHeaderCell(column, isSortable, isLast, index++);
      })
      .toArray();
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
        compactMargins={this.props.compactMargins}
        cellFormat={this.props.cellFormat}
        selectionMode={this.props.selectionMode}
        selected={this.isSelected(item.row.get('id', null))}
        selectionChanged={this.onSelectionChanged}
        onDoubleClick={this.onDoubleClick}
      />
    );
  }

  renderRows(data, isFilterable, isSortable) {
    const list = [];
    let rows = data.get('rows');
    if (isFilterable) {
      const header = data.get('header');
      rows = filter(rows, header, this.props.filter);
    }
    if (isSortable) {
      const header = data.get('header');
      rows = sort(rows, header, this.props.sortingColumns);
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
    if (this.props.hasButtons && size > 0) {
      const buttonsClass = this.styles.classNames.buttons;
      const isAllSelected = this.isAllSelected(data);
      const isAllDeselected = this.isAllDeselected();
      return (
        <div className={buttonsClass}>
          <Button
            kind={this.props.frame ? 'table-action-frame' : 'table-action'}
            place={isAllDeselected ? '1/1' : '1/2'}
            glyph="solid/check"
            text={T('Tout sélectionner')}
            grow={isAllSelected ? '0' : '1'}
            horizontalSpacing={isAllDeselected ? null : 'overlap'}
            onClick={this.selectAll}
          />
          <Button
            kind={this.props.frame ? 'table-action-frame' : 'table-action'}
            place={isAllSelected ? '1/1' : '2/2'}
            glyph="solid/ban"
            text={T('Tout désélectionner')}
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
    const isFilterable = data.get('filtering') === 'enable';
    const isSortable = data.get('sorting') === 'enable';
    const scrollableId = getUniqueId(data);

    return (
      <div className={this.styles.classNames.box}>
        <div className={this.styles.classNames.table}>
          {this.renderFilter(isFilterable)}
          {this.renderHeaders(data, isSortable)}
          <ScrollableContainer
            kind="table-body"
            id={scrollableId}
            height={this.props.height}
            restoreScroll={false}
          >
            {this.renderRows(data, isFilterable, isSortable)}
          </ScrollableContainer>
        </div>
        {this.renderButtons(data)}
      </div>
    );
  }
}

/******************************************************************************/

TableNC.propTypes = makePropTypes(Props);
TableNC.defaultProps = makeDefaultProps(Props);

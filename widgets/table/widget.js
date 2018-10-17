import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

import TableRow from 'gadgets/table-row/widget';
import TableCell from 'gadgets/table-cell/widget';
import Button from 'gadgets/button/widget';
import ScrollableContainer from 'gadgets/scrollable-container/widget';

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

  onSelectionChanged(id) {
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(id);
    } else {
      if (this.props.selectionMode !== 'none') {
        this.doAs('table-gadget', 'select', {
          mode: this.props.selectionMode,
          rowId: id,
        });
      }
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

  renderCoHeaderCell(column, header, isLast, index) {
    // Compute the width and grow of the included columns.
    let width = '0';
    let grow = 0;
    for (const name of column.get('names')) {
      const h = header.linq.where(x => name === x.get('name')).firstOrDefault();
      if (h) {
        const w = h.get('width');
        if (w) {
          if (width === '0') {
            // We have to detect the width unit
            const unitPattern = /^[0-9\.]+(.+)$/g;
            const match = unitPattern.exec(w);
            width = '0' + match[1];
          }
          width = Unit.add(width, w);
        }
        let g = h.get('grow');
        if (g) {
          if (typeof g === 'string') {
            g = parseInt(g);
          }
          grow += g;
        }
      } else {
        console.log(
          `WARNING in Table: co-header uses an unknown column name (${name}).`
        );
      }
    }
    if (width !== '0' && grow !== 0) {
      console.log(
        `WARNING in Table: co-header with mix of width (${width}) and grow (${grow}) is not supported.`
      );
    }
    return (
      <TableCell
        key={index}
        index={index}
        width={width === '0' ? null : width}
        grow={grow === 0 ? null : grow}
        textAlign={column.get('textAlign')}
        hasBorderRight="true"
        isLast={Bool.toString(isLast)}
        isHeader="true"
        text={column.get('description')}
        wrap="no"
      />
    );
  }

  renderCoHeaderCells(coHeader, header) {
    let index = 0;
    return coHeader.linq
      .select(column => {
        const isLast = index === coHeader.size - 1;
        return this.renderCoHeaderCell(column, header, isLast, index++);
      })
      .toList();
  }

  renderCoHeader(coHeader, header, styleClass) {
    return (
      <div className={styleClass}>
        {this.renderCoHeaderCells(coHeader, header)}
      </div>
    );
  }

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

  renderHeaders(data) {
    const preHeader = data.get('pre-header');
    const postHeader = data.get('post-header');
    const header = data.get('header');
    if (!header) {
      throw new Error('Table without header');
    }

    if (preHeader && !postHeader) {
      return (
        <div>
          {this.renderCoHeader(
            preHeader,
            header,
            this.styles.classNames.preHeader
          )}
          {this.renderHeader(header)}
        </div>
      );
    } else if (!preHeader && postHeader) {
      return (
        <div>
          {this.renderHeader(header)}
          {this.renderCoHeader(
            postHeader,
            header,
            this.styles.classNames.postHeader
          )}
        </div>
      );
    } else if (preHeader && postHeader) {
      return (
        <div>
          {this.renderCoHeader(
            preHeader,
            header,
            this.styles.classNames.preHeader
          )}
          {this.renderHeader(header)}
          {this.renderCoHeader(
            postHeader,
            header,
            this.styles.classNames.postHeader
          )}
        </div>
      );
    } else {
      return this.renderHeader(header);
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

  renderRows(data) {
    const list = [];
    const rows = data.get('rows');
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
    const boxClass = this.styles.classNames.box;
    const tableClass = this.styles.classNames.table;
    const verticalSeparatorClass = this.styles.classNames.verticalSeparator;

    const scrollableId = getUniqueId(data);

    return (
      <div className={boxClass}>
        <div className={tableClass}>
          {this.renderHeaders(data)}
          <ScrollableContainer
            kind="table-body"
            id={scrollableId}
            height={this.props.height}
          >
            {this.renderRows(data)}
          </ScrollableContainer>
          <div className={verticalSeparatorClass} />
        </div>
        {this.renderButtons(data)}
      </div>
    );
  }
}

/******************************************************************************/
export default Table;

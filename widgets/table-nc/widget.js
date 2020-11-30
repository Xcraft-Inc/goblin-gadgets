//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {Unit} from 'goblin-theme';
import TableRow from 'goblin-gadgets/widgets/table-row/widget';
import TableCell from 'goblin-gadgets/widgets/table-cell/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import TextInputNC from 'goblin-gadgets/widgets/text-input-nc/widget';
import T from 't';
import * as styles from './styles';

/******************************************************************************/

export default class TableNC extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
    this.onSortingChanged = this.onSortingChanged.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onDeselectAll = this.onDeselectAll.bind(this);
  }

  onFilterChanged(value) {
    const f = this.props.onFilterChanged;
    if (f) {
      f(value);
    }
  }

  onClearFilter() {
    const f = this.props.onFilterChanged;
    if (f) {
      f('');
    }
  }

  onSortingChanged(columnName) {
    const f = this.props.onSortingChanged;
    if (f) {
      f(columnName);
    }
  }

  onSelectionChanged(id) {
    const f = this.props.onSelectionChanged;
    if (f) {
      f(id);
    }
  }

  onDoubleClick(id) {
    const f = this.props.onDoubleClick;
    if (f) {
      f(id);
    }
  }

  onSelectAll() {
    const f = this.props.onSelectAll;
    if (f) {
      f();
    }
  }

  onDeselectAll() {
    const f = this.props.onDeselectAll;
    if (f) {
      f();
    }
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
              onChange={this.onFilterChanged}
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
              onChange={this.onFilterChanged}
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
        onClick={() => this.onSortingChanged(column.get('name'))}
      />
    );
  }

  renderPostHeaderCell(column, header, isSortable, isLast, index) {
    // Compute the width and grow of the included columns.
    let width = '0px';
    let grow = 0;
    for (const name of column.get('names')) {
      const cc = header.filter((x) => name === x.get('name'));
      const c = cc ? cc.get(0) : null;
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
      .valueSeq()
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
      .valueSeq()
      .toArray();
  }

  renderHeader(data, header, isSortable) {
    if (this.hasHeader(header)) {
      const style = {};
      const headerStyle = data.get('headerStyle');
      if (headerStyle) {
        style.backgroundColor = headerStyle.get('backgroundColor');
        style.color = headerStyle.get('color');
      }

      return (
        <div className={this.styles.classNames.header} style={style}>
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
      if (this.props.widgetDocPreview) {
        return (
          <Label
            glyph="solid/exclamation-triangle"
            text="Table: Without header"
            glyphColor="red"
            textColor="red"
          />
        );
      } else {
        throw new Error('Table without header');
      }
    }

    if (postHeader) {
      return (
        <div>
          {this.renderPostHeader(postHeader, header, isSortable)}
          {this.renderHeader(data, header, isSortable)}
        </div>
      );
    } else {
      return this.renderHeader(data, header, isSortable);
    }
  }

  renderRow(header, rowIndex) {
    return (
      <TableRow
        key={rowIndex}
        widgetId={this.props.widgetId}
        rowIndex={rowIndex}
        header={header.state}
        fontSizeStrategy={this.props.fontSizeStrategy}
        compactMargins={this.props.compactMargins}
        cellFormat={this.props.cellFormat}
        selectionMode={this.props.selectionMode}
        useKeyUpDown={this.props.useKeyUpDown}
        selectionChanged={this.onSelectionChanged}
        onDoubleClick={this.onDoubleClick}
      />
    );
  }

  renderRows(data) {
    if (!this.props.sortedRows) {
      return null;
    }

    const result = [];
    const header = data.get('header');
    for (var index = 0; index < this.props.sortedRows.length; index++) {
      result.push(this.renderRow(header, index));
    }
    return result;
  }

  renderButtons(data) {
    const size = data.get('rows').size;
    if (this.props.hasButtons && size > 0) {
      const buttonsClass = this.styles.classNames.buttons;
      const isAllSelected = this.props.isAllSelected;
      const isAllDeselected = this.props.isAllDeselected;
      return (
        <div className={buttonsClass}>
          <Button
            kind={this.props.frame ? 'table-action-frame' : 'table-action'}
            place={isAllDeselected ? '1/1' : '1/2'}
            glyph="solid/check"
            text={T('Tout sélectionner')}
            grow={isAllSelected ? '0' : '1'}
            horizontalSpacing={isAllDeselected ? null : 'overlap'}
            onClick={this.onSelectAll}
          />
          <Button
            kind={this.props.frame ? 'table-action-frame' : 'table-action'}
            place={isAllSelected ? '1/1' : '2/2'}
            glyph="solid/ban"
            text={T('Tout désélectionner')}
            grow={isAllDeselected ? '0' : '1'}
            onClick={this.onDeselectAll}
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

    return (
      <div className={this.styles.classNames.table}>
        <div className={this.styles.classNames.tableContent}>
          {this.renderFilter(isFilterable)}
          {this.renderHeaders(data, isSortable)}
          <div className={this.styles.classNames.body}>
            {this.renderRows(data, isFilterable, isSortable)}
          </div>
        </div>
        {this.renderButtons(data)}
      </div>
    );
  }
}

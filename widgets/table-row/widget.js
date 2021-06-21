import React from 'react';
import props from './props';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import TableCell from 'goblin-gadgets/widgets/table-cell/widget';
import * as styles from './styles';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

/******************************************************************************/

//TODO: Make a better styling
class CopyButton extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      showIcon: false,
    };

    this.copyToClipBoard = this.copyToClipBoard.bind(this);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  copyToClipBoard() {
    Widget.copyTextToClipboard(this.props.content);
    this.setState({showIcon: true});
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({showIcon: false});
    }, 1000);
  }

  render() {
    return (
      <div ref={this.button} onClick={this.copyToClipBoard}>
        {this.props.content}
        {this.state.showIcon && `✅`}
      </div>
    );
  }
}

class TableRow extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.useKeyUpDown && this._ref && this.props.selected) {
      scrollIntoViewIfNeeded(this._ref, {
        duration: 100,
      });
    }
  }

  onSelectionChanged(id) {
    const x = this.props.selectionChanged;
    if (x) {
      x(id);
    }
  }

  onDoubleClick(id) {
    const x = this.props.onDoubleClick;
    if (x) {
      x(id);
    }
  }

  renderRowCell(
    rowId,
    width,
    grow,
    textAlign,
    type,
    indent,
    isLast,
    text,
    index
  ) {
    return (
      <TableCell
        rowId={rowId}
        key={index}
        index={index}
        width={width}
        grow={grow}
        level={this.props.level}
        textAlign={textAlign}
        type={type}
        indent={indent}
        fontSizeStrategy={this.props.fontSizeStrategy}
        cellFormat={this.props.cellFormat}
        isLast={isLast}
        isHeader={false}
        text={text}
      />
    );
  }

  renderRowCells(header, row) {
    let index = 0;
    const h = Widget.shred(header);
    return h
      .map((column) => {
        let text = row.get(column.get('name'));
        const action = column.get('action', null);
        if (action) {
          switch (action) {
            case 'copy':
              {
                const content = row.get(column.get('name'));
                text = () => <CopyButton content={content} />;
              }
              break;
          }
        }
        const isLast = index === h.size - 1;

        return this.renderRowCell(
          row.get('id'),
          column.get('width'),
          column.get('grow'),
          column.get('textAlign'),
          column.get('type'),
          column.get('indent'),
          isLast,
          text,
          index++
        );
      })
      .valueSeq()
      .toArray();
  }

  render() {
    if (!this.props.row) {
      return null;
    }

    const rowId = this.props.row.get('id');

    return (
      <div
        ref={(node) => {
          this._ref = node;
        }}
        key={this.props.index}
        className={this.styles.classNames.row}
        onClick={() => this.onSelectionChanged(rowId)}
        onDoubleClick={() => this.onDoubleClick(rowId)}
      >
        {this.renderRowCells(
          this.props.header.valueSeq().toArray(),
          this.props.row
        )}
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connectWidget((state, props) => {
  if (!state) {
    return {};
  }

  const row = state.get(`sortedRows.${props.rowIndex}`);
  if (!row) {
    return {};
  }
  const id = row.get('row').get('id');
  const selectedIds = state.get('selectedIds');
  const selected = selectedIds ? selectedIds.includes(id) : false;

  if (props.displaySelectedOnly && !selected) {
    return {};
  }
  return {
    row: row.get('row'),
    index: props.rowIndex,
    level: row.get('level'),
    topSeparator: row.get('topSeparator'),
    bottomSeparator: row.get('bottomSeparator'),
    isLast: row.get('isLast'),
    selected,
  };
})(TableRow);

/******************************************************************************/

registerWidget(TableRow, props, null, false);

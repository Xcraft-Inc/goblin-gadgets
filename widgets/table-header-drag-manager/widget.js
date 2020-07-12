//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

/******************************************************************************/

function getValue(px) {
  if (!px) {
    return 0;
  }
  return Unit.parse(px).value;
}

const buttonWidth = 40;
const markWidth = 8;
const minWidth = 30;

/******************************************************************************/

export default class TableHeaderDragManager extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      newWidth: null,
      dragColumnIndexDst: -1,
    };

    this.dragWidthInProcess = false;
    this.offsetX = null;

    this.dragColumnClicked = false;
    this.dragColumnInProcess = false;
    this.dragColumnStartX = null;
    this.dragColumnIndexSrc = null;

    this.onDragWidthStart = this.onDragWidthStart.bind(this);
    this.onDragWidthMove = this.onDragWidthMove.bind(this);
    this.onDragWidthEnd = this.onDragWidthEnd.bind(this);

    this.onDragColumnStart = this.onDragColumnStart.bind(this);
    this.onDragColumnMove = this.onDragColumnMove.bind(this);
    this.onDragColumnEnd = this.onDragColumnEnd.bind(this);

    this.onColumnClicked = this.onColumnClicked.bind(this);
  }

  //#region get/set
  get newWidth() {
    return this.state.newWidth;
  }

  set newWidth(value) {
    this.setState({
      newWidth: value,
    });
  }

  get dragColumnIndexDst() {
    return this.state.dragColumnIndexDst;
  }

  set dragColumnIndexDst(value) {
    this.setState({
      dragColumnIndexDst: value,
    });
  }
  //#endregion

  get marginRightPx() {
    return this.context.theme.shapes.tablePadding;
  }

  get marginRight() {
    return getValue(this.marginRightPx);
  }

  getColumn(index) {
    let left = getValue(this.props.marginLeft);
    let width = 0;
    for (const column of this.props.columns) {
      width = getValue(column.width) + this.marginRight;
      if (index === 0) {
        break;
      }
      index--;
      left += width;
    }

    return {left, width};
  }

  detectColumn(x) {
    let left = getValue(this.props.marginLeft);
    let width = 0;
    let index = 0;
    for (const column of this.props.columns) {
      width = getValue(column.width) + this.marginRight;
      if (x < left + width / 2) {
        return index;
      }
      index++;
      left += width;
    }
    return index;
  }

  isFixedColumn(index) {
    return this.props.fixedColumns && this.props.fixedColumns.includes(index);
  }

  get isValidDragColumn() {
    if (this.isFixedColumn(this.dragColumnIndexDst)) {
      return false;
    }

    return (
      this.dragColumnIndexDst < this.dragColumnIndexSrc ||
      this.dragColumnIndexDst > this.dragColumnIndexSrc + 1
    );
  }

  /******************************************************************************/

  onDragWidthStart(e, index) {
    const r = this.getColumn(index);
    this.startX = r.left;
    this.newWidth = r.width;
    this.index = index;

    this.offsetX = r.left + r.width - e.clientX;
    this.dragWidthInProcess = true;
  }

  onDragWidthMove(e) {
    if (!this.dragWidthInProcess) {
      return;
    }

    const mx = e.clientX + this.offsetX;
    this.newWidth = Math.max(mx - this.startX, minWidth);

    e.preventDefault();
    e.stopPropagation();
  }

  onDragWidthEnd() {
    const x = this.props.widthChanged;
    if (x) {
      const width = px(this.newWidth - this.marginRight);
      x(this.index, width);
    }

    this.newWidth = null;
    this.dragWidthInProcess = false;
  }

  /******************************************************************************/

  onDragColumnStart(e, index) {
    this.dragColumnClicked = true;
    this.dragColumnStartX = e.clientX;
    this.dragColumnIndexSrc = index;
    this.dragColumnIndexDst = -1;
  }

  onDragColumnMove(e) {
    if (!this.dragColumnClicked && !this.dragColumnInProcess) {
      return;
    }

    if (this.dragColumnClicked) {
      const delta = Math.abs(this.dragColumnStartX, e.clientX);
      if (delta >= 3) {
        this.dragColumnInProcess = true;
      }
    }

    if (this.dragColumnInProcess) {
      const r = this.componentNode.getBoundingClientRect();
      this.dragColumnIndexDst = this.detectColumn(e.clientX - r.left);
    }

    e.preventDefault();
    e.stopPropagation();
  }

  onDragColumnEnd() {
    const indexSrc = this.dragColumnIndexSrc;
    const indexDst = this.dragColumnIndexDst;

    if (this.dragColumnInProcess) {
      if (this.isValidDragColumn) {
        const x = this.props.columnMoved;
        if (x) {
          x(indexSrc, indexDst);
        }
      }
    } else if (this.dragColumnClicked) {
      const x = this.props.columnClicked;
      if (x) {
        x(indexSrc);
      }
    }

    this.dragColumnClicked = false;
    this.dragColumnInProcess = false;
    this.dragColumnIndexDst = -1;
  }

  onColumnClicked(index) {
    const x = this.props.columnClicked;
    if (x) {
      x(index);
    }
  }

  /******************************************************************************/

  // Display adding elements while dragging a column width.
  renderDraggingWidth() {
    if (!this.dragWidthInProcess) {
      return null;
    }

    const styleColumn = {
      left: this.startX - this.marginRight / 2,
      width: this.newWidth + markWidth / 2,
      minWidth: this.newWidth + markWidth / 2,
    };

    return (
      <React.Fragment>
        <div
          className={this.styles.classNames.fullscreen}
          onMouseMove={this.onDragWidthMove}
          onMouseUp={this.onDragWidthEnd}
        />
        <div
          className={this.styles.classNames.widthDragged}
          style={styleColumn}
        />
      </React.Fragment>
    );
  }

  // Display adding elements while dragging a column (re-order).
  renderDraggingColumn() {
    if (!this.dragColumnClicked) {
      return null;
    }

    let r = this.getColumn(this.dragColumnIndexSrc);
    const styleTraveling = {
      left: r.left - this.marginRight / 2,
      width: r.width,
      minWidth: r.width,
    };

    r = this.getColumn(this.dragColumnIndexDst);

    const styleInserting = {
      left: r.left - 15,
      opacity: this.isValidDragColumn ? 1 : 0,
    };

    return (
      <React.Fragment>
        <div
          className={this.styles.classNames.fullscreen}
          onMouseMove={this.onDragColumnMove}
          onMouseUp={this.onDragColumnEnd}
        />
        {this.dragColumnInProcess ? (
          <div
            className={this.styles.classNames.travelingColumn}
            style={styleTraveling}
          />
        ) : null}
        {this.dragColumnInProcess ? (
          <div
            className={this.styles.classNames.insertingColumn}
            style={styleInserting}
          />
        ) : null}
      </React.Fragment>
    );
  }

  // Draw a column with:
  //
  //          width=100     marginRight=10
  //     |<------------------->|<->|
  //      <------------1----------->
  // <--3-->      <--2-->    <--3-->
  //
  // 1) Button for sorting.
  // 2) Button for moving the column (change order).
  // 3) Button for resizing the column (change width).

  renderColumn(column, index) {
    let r = this.getColumn(index);

    const sortStyle = {
      zIndex: '8',
      position: 'absolute',
      top: '0px',
      height: this.props.height,
      left: r.left,
      width: r.width,
      minWidth: r.width,
    };

    const columnButtonStyle = {
      left:
        r.left + r.width - this.marginRight / 2 - r.width / 2 - buttonWidth / 2,
    };

    const widthButtonStyle = {
      left:
        r.left + r.width - this.marginRight / 2 - buttonWidth + markWidth / 2,
    };

    const columnMarkHoverStyle = {
      left: r.left - this.marginRight / 2,
      width: r.width,
      minWidth: r.width,
    };

    const widthMarkHoverStyle = {
      left: r.left - this.marginRight / 2,
      width: r.width + markWidth / 2,
      minWidth: r.width + markWidth / 2,
    };

    return (
      <React.Fragment key={index}>
        <div
          className={this.styles.classNames.sortButton}
          style={sortStyle}
          onClick={() => this.onColumnClicked(index)}
        />
        {this.isFixedColumn(index) ? null : (
          <div
            className={this.styles.classNames.columnButton}
            style={columnButtonStyle}
            onMouseDown={(e) => this.onDragColumnStart(e, index)}
            onMouseMove={this.onDragColumnMove}
            onMouseUp={this.onDragColumnEnd}
          />
        )}
        {this.isFixedColumn(index) ? null : (
          <div
            className={`column-mark-hover ${this.styles.classNames.columnMarkHover}`}
            style={columnMarkHoverStyle}
          />
        )}
        <div
          className={this.styles.classNames.widthButton}
          style={widthButtonStyle}
          onMouseDown={(e) => this.onDragWidthStart(e, index)}
        />
        <div
          className={`width-mark-hover ${this.styles.classNames.widthMarkHover}`}
          style={widthMarkHoverStyle}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div
          ref={(node) => (this.componentNode = node)}
          className={this.styles.classNames.tableHeaderDragManager}
        >
          {this.props.columns.map((c, i) => this.renderColumn(c, i))}
        </div>
        {this.renderDraggingWidth()}
        {this.renderDraggingColumn()}
      </React.Fragment>
    );
  }
}

/******************************************************************************/

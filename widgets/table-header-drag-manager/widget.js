//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import {Unit} from 'electrum-theme';

/******************************************************************************/

function getValue(px) {
  return Unit.parse(px).value;
}

const halfButtonWidth = 10;
const halfButtonWidthPx = halfButtonWidth + 'px';
const halfMarkWidth = 4;

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

    //? console.log(
    //?   `onDragWidthStart e.clientX=${e.clientX} index=${index} left=${r.left} width=${r.width} offsetX=${this.offsetX} newWidth=${this.newWidth}`
    //? );
  }

  onDragWidthMove(e) {
    if (!this.dragWidthInProcess) {
      return;
    }

    const mx = e.clientX + this.offsetX;
    let width = mx - this.startX;
    if (width <= halfButtonWidth * 2) {
      width = 0;
    }
    this.newWidth = width;
    //? console.log(`onDragWidthMove e.clientX=${e.clientX} newWidth=${width}`);

    e.preventDefault();
    e.stopPropagation();
  }

  onDragWidthEnd() {
    //? console.log(`onDragWidthEnd`);

    const x = this.props.widthChanged;
    if (x) {
      const width = Math.max(this.newWidth - this.marginRight, 0) + 'px';
      x(this.index, width);
    }

    this.newWidth = null;
    this.dragWidthInProcess = false;
  }

  /******************************************************************************/

  onDragColumnStart(e, index) {
    console.log(`onDragColumnStart`);
    this.dragColumnClicked = true;
    this.dragColumnStartX = e.clientX;
    this.dragColumnIndexSrc = index;
    this.dragColumnIndexDst = -1;
  }

  onDragColumnMove(e) {
    if (!this.dragColumnClicked && !this.dragColumnInProcess) {
      return;
    }

    console.log(
      `onDragColumnMove dragColumnIndexDst=${this.dragColumnIndexDst}`
    );
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
    console.log(`onDragColumnEnd`);
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

  /******************************************************************************/

  renderDraggingWidth() {
    if (!this.dragWidthInProcess) {
      return null;
    }

    const width = Math.max(this.newWidth, 0) + halfMarkWidth + 'px';
    const styleColumn = {
      left: this.startX,
      width: width,
      minWidth: width,
    };

    return (
      <React.Fragment>
        <div
          className={this.styles.classNames.fullscreen}
          onMouseMove={this.onDragWidthMove}
          onMouseUp={this.onDragWidthEnd}
        />
        <div
          className={this.styles.classNames.columnDragged}
          style={styleColumn}
        />
      </React.Fragment>
    );
  }

  renderDraggingColumn() {
    if (!this.dragColumnClicked) {
      return null;
    }

    let r = this.getColumn(this.dragColumnIndexSrc);
    const styleTraveling = {
      left: r.left,
      width: r.width - this.marginRight,
      minWidth: r.width - this.marginRight,
    };

    r = this.getColumn(this.dragColumnIndexDst);
    const styleInserting = {
      left: r.left - 10,
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

  renderColumn(column, index) {
    let width = Unit.add(column.width, this.marginRightPx);
    if (index > 0) {
      width = Unit.sub(width, halfButtonWidthPx);
    }
    width = Unit.sub(width, halfButtonWidthPx);
    const columnButtonStyle = {
      width: width,
      minWidth: width,
    };

    let r = this.getColumn(index);

    const columnMarkHoverStyle = {
      left: index === 0 ? 0 : -halfButtonWidth,
      width: r.width - this.marginRight,
      minWidth: r.width - this.marginRight,
    };

    const widthMarkHoverStyle = {
      left: -(r.width - this.marginRight),
      width: r.width + halfMarkWidth,
      minWidth: r.width + halfMarkWidth,
    };

    return (
      <React.Fragment key={index}>
        <div
          className={
            this.isFixedColumn(index)
              ? this.styles.classNames.columnButtonFixed
              : this.styles.classNames.columnButton
          }
          style={columnButtonStyle}
          onMouseDown={e => this.onDragColumnStart(e, index)}
          onMouseMove={this.onDragColumnMove}
          onMouseUp={this.onDragColumnEnd}
        >
          {this.isFixedColumn(index) ? null : (
            <div
              className={`column-mark-hover ${this.styles.classNames.columnMarkHover}`}
              style={columnMarkHoverStyle}
            />
          )}
        </div>
        <div
          className={this.styles.classNames.widthButton}
          onMouseDown={e => this.onDragWidthStart(e, index)}
        >
          <div
            className={`width-mark-hover ${this.styles.classNames.widthMarkHover}`}
            style={widthMarkHoverStyle}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div
          ref={node => (this.componentNode = node)}
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

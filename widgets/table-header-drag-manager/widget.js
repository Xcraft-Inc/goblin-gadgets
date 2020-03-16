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
const halfMarkWidth = 2;

/******************************************************************************/

export default class TableHeaderDragManager extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      newWidth: null,
    };

    this.dragWidthInProcess = false;

    this.onChangeWidthStart = this.onChangeWidthStart.bind(this);
    this.onChangeWidthMove = this.onChangeWidthMove.bind(this);
    this.onChangeWidthEnd = this.onChangeWidthEnd.bind(this);
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

  onChangeWidthStart(e, index) {
    const r = this.getColumn(index);
    this.startX = r.left;
    this.newWidth = r.width;
    this.index = index;

    this.offsetX = r.left + r.width - e.clientX;
    this.dragWidthInProcess = true;

    //? console.log(
    //?   `onChangeWidthStart e.clientX=${e.clientX} index=${index} left=${r.left} width=${r.width} offsetX=${this.offsetX} newWidth=${this.newWidth}`
    //? );
  }

  onChangeWidthMove(e) {
    if (!this.dragWidthInProcess) {
      return;
    }

    const mx = e.clientX + this.offsetX;
    let width = mx - this.startX;
    if (width <= halfButtonWidth * 2) {
      width = 0;
    }
    this.newWidth = width;
    //? console.log(`onChangeWidthMove e.clientX=${e.clientX} newWidth=${width}`);

    e.preventDefault();
    e.stopPropagation();
  }

  onChangeWidthEnd() {
    //? console.log(`onChangeWidthEnd`);

    const x = this.props.widthChanged;
    if (x) {
      const width = Math.max(this.newWidth - this.marginRight, 0) + 'px';
      x(this.index, width);
    }

    this.newWidth = null;
    this.dragWidthInProcess = false;
  }

  /******************************************************************************/

  renderChangingWidth() {
    if (!this.dragWidthInProcess) {
      return null;
    }

    const styleColumn = {
      left: this.startX,
      width: Math.max(this.newWidth, 0) + halfMarkWidth + 'px',
    };

    return (
      <React.Fragment>
        <div
          className={this.styles.classNames.fullscreen}
          onMouseMove={this.onChangeWidthMove}
          onMouseUp={this.onChangeWidthEnd}
        />
        <div
          className={this.styles.classNames.columnDragged}
          style={styleColumn}
        />
      </React.Fragment>
    );
  }

  renderColumn(column, index) {
    let width = Unit.add(column.width, this.marginRightPx);
    if (index > 0) {
      width = Unit.sub(width, halfButtonWidthPx);
    }
    width = Unit.sub(width, halfButtonWidthPx);

    const style = {width};

    return (
      <React.Fragment key={index}>
        <div className={this.styles.classNames.columnButton} style={style} />
        <div
          className={this.styles.classNames.widthButton}
          onMouseDown={e => this.onChangeWidthStart(e, index)}
        >
          <div
            className={`width-mark-hover ${this.styles.classNames.widthMarkHover}`}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.styles.classNames.tableHeaderDragManager}>
          {this.props.columns.map((c, i) => this.renderColumn(c, i))}
        </div>
        {this.renderChangingWidth()}
      </React.Fragment>
    );
  }
}

/******************************************************************************/

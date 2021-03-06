import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

/******************************************************************************/

function isInside(rect, x, y) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

/******************************************************************************/

export default class ResizableContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      size: this.getSize(this.props),
      dragging: null,
    };

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  //#region get/set
  get size() {
    return this.state.size;
  }

  set size(value) {
    this.setState({
      size: value,
    });
  }

  get dragging() {
    return this.state.dragging;
  }

  set dragging(value) {
    this.setState({
      dragging: value,
    });
  }
  //#endregion

  getSize(props) {
    return {
      dx: props.dx || 500,
      dy: props.dy || 500,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.size = this.getSize(nextProps);
  }

  onPointerDown(e) {
    // Mouse left button pressed ?
    if (e.buttons === 1) {
      e.target.setPointerCapture(e.pointerId);

      const cornerRect = this.buttonCornerNode.getBoundingClientRect();
      const heightRect = this.buttonHeightNode.getBoundingClientRect();
      const widthRect = this.buttonWidthNode.getBoundingClientRect();

      if (isInside(cornerRect, e.clientX, e.clientY)) {
        this.dragging = 'corner';
      } else if (isInside(heightRect, e.clientX, e.clientY)) {
        this.dragging = 'height';
      } else if (isInside(widthRect, e.clientX, e.clientY)) {
        this.dragging = 'width';
      }
    }
  }

  onPointerMove(e) {
    if (this.dragging) {
      const containerRect = this.containerNode.getBoundingClientRect();

      let dx = this.size.dx;
      let dy = this.size.dy;

      if (this.dragging === 'corner' || this.dragging === 'width') {
        dx = Math.floor(e.clientX - 20 - containerRect.left);
      }

      if (this.dragging === 'corner' || this.dragging === 'height') {
        dy = Math.floor(e.clientY - 20 - containerRect.top);
      }

      this.size = {dx, dy};
    }
  }

  onPointerUp(e) {
    if (this.dragging) {
      e.target.releasePointerCapture(e.pointerId);
      this.dragging = null;

      if (this.props.onChange) {
        this.props.onChange(this.size.dx, this.size.dy);
      }
    }
  }

  adjustButtonStyle(style, type) {
    if (type === this.dragging) {
      style.backgroundColor = '#ffb9b9';
      style.borderRadius = '0px';
      style.border = '2px solid #f00';
      style.transform = 'rotate(0deg) scale(1)';
    }
  }

  /******************************************************************************/

  // Button at bottom right, for resizing width and height.
  renderButtonCorner() {
    const style = {
      left: px(this.size.dx + 12),
      top: px(this.size.dy + 12),
    };
    this.adjustButtonStyle(style, 'corner');

    return (
      <div
        ref={(node) => (this.buttonCornerNode = node)}
        className={this.styles.classNames.buttonCorner}
        style={style}
        title="Resizes"
      />
    );
  }

  // Button at bottom left, for resizing height.
  renderButtonHeight() {
    const style = {
      left: '-10px',
      top: px(this.size.dy + 12),
    };
    this.adjustButtonStyle(style, 'height');

    return (
      <div
        ref={(node) => (this.buttonHeightNode = node)}
        className={this.styles.classNames.buttonHeight}
        style={style}
        title="Resize height"
      />
    );
  }

  // Button at top right, for resizing width.
  renderButtonWidth() {
    const style = {
      left: px(this.size.dx + 12),
      top: px(-10),
    };
    this.adjustButtonStyle(style, 'width');

    return (
      <div
        ref={(node) => (this.buttonWidthNode = node)}
        className={this.styles.classNames.buttonWidth}
        style={style}
        title="Resize width"
      />
    );
  }

  // Display size while dragging.
  renderSize() {
    if (!this.dragging) {
      return null;
    }

    const size = `${this.size.dx} × ${this.size.dy}`;

    return <div className={this.styles.classNames.size}>{size}</div>;
  }

  render() {
    const boxStyle = {
      width: px(this.size.dx),
      height: px(this.size.dy),
      // backgroundColor: this.dragging ? 'rgba(255,0,0,0.1)' : null,
    };

    return (
      <div
        ref={(node) => (this.containerNode = node)}
        className={this.styles.classNames.resizableContainer}
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
        onPointerLeave={this.onPointerUp}
      >
        <div
          className={
            this.dragging
              ? this.styles.classNames.boxDragging
              : this.styles.classNames.box
          }
          style={boxStyle}
        >
          <div className={this.styles.classNames.children}>
            {this.props.children}
          </div>
        </div>
        {this.renderButtonCorner()}
        {this.renderButtonHeight()}
        {this.renderButtonWidth()}
        {this.renderSize()}
      </div>
    );
  }
}

/******************************************************************************/

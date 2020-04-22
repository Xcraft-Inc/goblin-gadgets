import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {Unit} from 'electrum-theme';
import * as styles from './styles';

/******************************************************************************/

function detect(x, y, rect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

/******************************************************************************/

export default class ResizableContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      size: this.getSize(this.props),
    };

    this.dragging = null;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
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
  //#endregion

  getSize(props) {
    return {
      dx: props.dx ? Unit.parse(props.dx).value : 500,
      dy: props.dy ? Unit.parse(props.dy).value : 500,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.size = this.getSize(nextProps);
  }

  onMouseDown(e) {
    // Mouse left button pressed ?
    if (e.buttons === 1) {
      const cornerRect = this.buttonCornerNode.getBoundingClientRect();
      const heightRect = this.buttonHeightNode.getBoundingClientRect();
      const widthRect = this.buttonWidthNode.getBoundingClientRect();

      if (detect(e.clientX, e.clientY, cornerRect)) {
        this.dragging = 'corner';
      } else if (detect(e.clientX, e.clientY, heightRect)) {
        this.dragging = 'height';
      } else if (detect(e.clientX, e.clientY, widthRect)) {
        this.dragging = 'width';
      }
    }
  }

  onMouseMove(e) {
    if (this.dragging) {
      const containerRect = this.containerNode.getBoundingClientRect();

      let dx = this.size.dx;
      let dy = this.size.dy;

      if (this.dragging === 'corner' || this.dragging === 'width') {
        dx = e.clientX - containerRect.left;
      }

      if (this.dragging === 'corner' || this.dragging === 'height') {
        dy = e.clientY - containerRect.top;
      }

      this.size = {dx, dy};
    }
  }

  onMouseUp() {
    if (this.dragging) {
      this.dragging = null;
    }
  }

  /******************************************************************************/

  renderButtonCorner() {
    return (
      <div
        ref={(node) => (this.buttonCornerNode = node)}
        className={this.styles.classNames.buttonCorner}
        title="Resizes"
      />
    );
  }

  renderButtonHeight() {
    return (
      <div
        ref={(node) => (this.buttonHeightNode = node)}
        className={this.styles.classNames.buttonHeight}
        title="Resize height"
      />
    );
  }

  renderButtonWidth() {
    return (
      <div
        ref={(node) => (this.buttonWidthNode = node)}
        className={this.styles.classNames.buttonWidth}
        title="Resize width"
      />
    );
  }

  render() {
    const boxStyle = {
      width: this.size.dx + 'px',
      height: this.size.dy + 'px',
    };

    return (
      <div
        ref={(node) => (this.containerNode = node)}
        className={this.styles.classNames.resizableContainer}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <div className={this.styles.classNames.box} style={boxStyle}>
          {this.props.children}
          {this.renderButtonCorner()}
          {this.renderButtonHeight()}
          {this.renderButtonWidth()}
        </div>
      </div>
    );
  }
}

/******************************************************************************/

//T:2019-02-27
import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

export default class ComboContainer extends Widget {
  constructor() {
    super(...arguments);

    this.location = null;
    this.setChildrenDivRef = this.setChildrenDivRef.bind(this);
    this.comboState = 'close';
  }

  resetLocation() {
    this.side = null;
    this.location = null;
    this.positionInfo = null;
    this.safeAreaStyle = null;
  }

  setChildrenDivRef(node) {
    if (node) {
      this.childrenDivRef = node;
      const {height} = this.childrenDivRef.getBoundingClientRect();
      this.calculateLocationWithChildrenSize(height);
      this.comboState = 'render-combo';
      this.forceUpdate();
    }
  }

  calculateLocation() {
    const {centerX, centerY, top, bottom} = this.positionInfo;
    const windowCenterY = window.innerHeight / 2;
    // Combo under element
    if (centerY <= windowCenterY) {
      this.side = 'down';
      this.calculateSafeArea();
    }
  }

  calculateLocationWithChildrenSize(height) {
    if (height < window.innerHeight - this.positionInfo.bottom) {
      this.side = 'down';
    }
    // If no place under element, we place it above
    // TODO: Do better !
    else {
      this.side = 'up';
    }
    this.calculateSafeArea();
  }

  calculateSafeArea() {
    let justifyContent = '';

    if (this.positionInfo.centerX > window.innerWidth / 2) {
      this.horizontalPositionStyle = {
        width: (window.innerWidth - this.positionInfo.centerX) * 2,
      };

      justifyContent = 'flex-end';
    } else {
      this.horizontalPositionStyle = {width: this.positionInfo.centerX * 2};

      justifyContent = 'flex-start';
    }
    if (this.side === 'down') {
      this.safeAreaStyle = {
        top: this.positionInfo.bottom,
        justifyContent,
      };
    } else {
      this.safeAreaStyle = {
        bottom: this.positionInfo.top,
        justifyContent,
      };
    }
  }

  getPositionInfo() {
    if (this.props.positionRef) {
      const {
        bottom,
        height,
        left,
        top,
        width,
      } = this.props.positionRef.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;
      this.positionInfo = {
        centerX,
        centerY,
        top,
        bottom,
      };
    } else if (this.props.x !== undefined && this.props.y !== undefined) {
      this.positionInfo = {
        centerX: this.props.x,
        centerY: this.props.y,
        top: this.props.y,
        bottom: this.props.y,
      };
    } else {
      this.positionInfo = null;
    }
  }

  renderForSize() {
    return (
      <div
        ref={this.setChildrenDivRef}
        className={this.styles.classNames.childrenDiv}
      >
        {this.props.children}
      </div>
    );
  }

  renderCombo() {
    return (
      <div
        style={this.safeAreaStyle}
        className={this.styles.classNames.safeArea}
      >
        <div
          style={this.horizontalPositionStyle}
          className={this.styles.classNames.horizontalPosition}
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  render() {
    if (this.comboState === 'close' && this.props.show) {
      this.comboState = 'waiting-position';
    }
    if (this.comboState === 'waiting-position') {
      this.getPositionInfo();
      if (this.positionInfo) {
        this.comboState = 'calculate-side';
      }
    }
    if (this.comboState === 'calculate-side') {
      this.calculateLocation();
      if (!this.side) {
        this.comboState = 'get-children-size';
      } else {
        this.comboState = 'render-combo';
      }
    }
    if (this.comboState === 'get-children-size') {
      return this.renderForSize();
    }
    if (this.comboState === 'render-combo') {
      return this.renderCombo();
    }
    return null;
  }
}

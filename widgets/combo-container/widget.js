import React from 'react';
import Widget from 'laboratory/widget';
import Triangle from 'goblin-gadgets/widgets/triangle/widget';

/******************************************************************************/

export default class ComboContainer extends Widget {
  constructor() {
    super(...arguments);
    this.setChildrenDivRef = this.setChildrenDivRef.bind(this);
    this.reset();
    if (this.props.triangleSize) {
      const triangle = this.props.triangleSize.split('px');
      this.triangleSize = parseInt(triangle[0]);
    } else {
      this.triangleSize = 10;
    }
  }

  reset() {
    this.side = null;
    this.positionInfo = null;
    this.safeAreaStyle = null;
    this.horizontalPositionStyle = null;
    this.childrenDivRef = null;
    this.comboState = 'close';
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
      this.side = 'bottom';
      this.calculateSafeArea();
    }
  }

  calculateLocationWithChildrenSize(height) {
    // TODO: include also triangleSize
    if (
      height + this.triangleSize <
      window.innerHeight - this.positionInfo.bottom
    ) {
      this.side = 'bottom';
    }
    // If no place under element, we place it above
    // TODO: Do better !
    else {
      this.side = 'top';
    }
    this.calculateSafeArea();
  }

  calculateSafeArea() {
    let justifyContent = '';

    if (this.positionInfo.centerX > window.innerWidth / 2) {
      this.horizontalPositionStyle = {
        minWidth: (window.innerWidth - this.positionInfo.centerX) * 2,
      };

      justifyContent = 'flex-end';
    } else {
      this.horizontalPositionStyle = {minWidth: this.positionInfo.centerX * 2};
      justifyContent = 'flex-start';
    }
    if (this.side === 'bottom') {
      this.safeAreaStyle = {
        top: this.positionInfo.bottom + this.triangleSize,
        justifyContent,
        alignItems: 'flex-start',
      };
      this.triangleContainerStyle = {
        top: this.positionInfo.bottom,
        left: this.positionInfo.centerX,
      };
    } else {
      this.safeAreaStyle = {
        bottom: window.innerHeight - this.positionInfo.top + this.triangleSize,
        justifyContent,
        alignItems: 'flex-end',
      };
      this.triangleContainerStyle = {
        bottom: window.innerHeight - this.positionInfo.top,
        left: this.positionInfo.centerX,
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
      <React.Fragment>
        <div
          className={this.styles.classNames.fullScreen}
          onClick={this.props.onClose}
        ></div>
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
        <div
          style={this.triangleContainerStyle}
          className={this.styles.classNames.triangleContainer}
        >
          <Triangle position={this.side} size={this.props.triangleSize} />
        </div>
      </React.Fragment>
    );
  }

  render() {
    if (!this.props.show) {
      this.reset();
    } else if (this.comboState === 'close') {
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
    } else if (this.comboState === 'render-combo') {
      return this.renderCombo();
    }
    return null;
  }
}
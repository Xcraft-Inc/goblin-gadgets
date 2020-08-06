import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Triangle from 'goblin-gadgets/widgets/triangle/widget';
import * as styles from './styles';
import {Unit} from 'goblin-theme';
const n = Unit.toValue;

/******************************************************************************/

export default class ComboContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.reset();
    if (this.props.triangleSize) {
      this.triangleSize = n(this.props.triangleSize);
    } else {
      this.triangleSize = 10;
    }
    this.childrenProps = {};

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.onClose();
  }

  reset() {
    this.side = null;
    this.positionInfo = null;
    this.safeAreaStyle = null;
    this.horizontalPositionStyle = null;
    this.childrenDivRef = null;
    this.comboState = 'close';
  }

  calculateLocation() {
    const {centerX, centerY, top, bottom} = this.positionInfo;
    const windowCenterY = window.innerHeight / 2;
    // Combo placed above or under
    if (centerY <= windowCenterY) {
      this.side = 'bottom';
    } else {
      this.side = 'top';
    }
    this.calculateSafeArea();
  }

  calculateSafeArea() {
    let justifyContent = '';

    const offsetX = this.props.parentRect ? this.props.parentRect.left : 0;
    const offsetY = this.props.parentRect ? this.props.parentRect.top : 0;

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
        top: this.positionInfo.bottom + this.triangleSize - offsetY,
        left: -offsetX,
        justifyContent,
        alignItems: 'flex-start',
      };
      this.triangleContainerStyle = {
        top: this.positionInfo.bottom + 1 - offsetY,
        left: this.positionInfo.centerX - offsetX,
      };
      this.childrenProps.maxHeight =
        window.innerHeight - this.positionInfo.bottom + this.triangleSize;
    } else {
      this.safeAreaStyle = {
        bottom:
          window.innerHeight -
          this.positionInfo.top +
          this.triangleSize -
          offsetY,
        left: -offsetX,
        justifyContent,
        alignItems: 'flex-end',
      };
      this.triangleContainerStyle = {
        bottom: window.innerHeight - this.positionInfo.top + 1 - offsetY,
        left: this.positionInfo.centerX - offsetX,
      };
      this.childrenProps.maxHeight = this.positionInfo.top - this.triangleSize;
    }
    this.childrenProps.triangleSize = this.triangleSize;
    this.comboState = 'render-combo';
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

  renderCombo() {
    const childrenWithProps = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {...this.childrenProps})
    );
    return (
      <React.Fragment>
        <div
          className={this.styles.classNames.fullScreen}
          onClick={this.handleClose}
        ></div>
        <div
          style={this.safeAreaStyle}
          className={this.styles.classNames.safeArea}
        >
          <div
            style={this.horizontalPositionStyle}
            className={this.styles.classNames.horizontalPosition}
          >
            {childrenWithProps}
          </div>
        </div>
        <div
          style={this.triangleContainerStyle}
          className={this.styles.classNames.triangleContainer}
        >
          <Triangle
            position={this.side}
            size={this.props.triangleSize}
            color={this.context.theme.palette.comboItemBackground}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    if (this.props.show === false) {
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
    }
    if (this.comboState === 'render-combo') {
      return this.renderCombo();
    }
    return null;
  }
}

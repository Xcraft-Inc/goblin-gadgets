import React from 'react';
import * as styles from './styles';
import Widget from 'goblin-laboratory/widgets/widget';

/******************************************************************************/

function isInside(rect, x, y) {
  if (rect && rect.left < rect.right && rect.top < rect.bottom) {
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  } else {
    return true;
  }
}

/******************************************************************************/

export default class PopupContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
  }

  onBackgroundClick(e) {
    if (!this.props.enableBackgroundClickForCancel) {
      return;
    }

    const rect = this.divWindow.getBoundingClientRect();
    if (!isInside(rect, e.clientX, e.clientY)) {
      // If the mouse is outside the window, close it.
      this.props.onClose();
    }
  }

  renderTriangle() {
    if (!this.props.triangle) {
      return null;
    }

    return (
      <div className={this.styles.classNames.windowTriangle}>
        <div className={this.styles.classNames.triangle} />
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.styles.classNames.popupContainer}
        onMouseDown={this.onBackgroundClick}
        onTouchStart={this.onBackgroundClick}
      >
        <div
          ref={(node) => (this.divWindow = node)}
          className={this.styles.classNames.window}
        >
          {this.props.children}
        </div>
        {this.renderTriangle()}
      </div>
    );
  }
}

/******************************************************************************/

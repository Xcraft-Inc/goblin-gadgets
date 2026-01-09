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
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    // Use setTimeout to wait for React completes the render cycle
    setTimeout(() => {
      this.setState({mounted: true});
    }, 0);
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
    let containerClassName = this.styles.classNames.popupContainer;
    let windowClassName = this.styles.classNames.window;
    if (this.state.mounted) {
      containerClassName = `${this.styles.classNames.popupContainer} ${this.styles.classNames.popupContainerTransition}`;
      windowClassName = `${this.styles.classNames.window} ${this.styles.classNames.windowTransition}`;
    }

    return (
      <div
        className={containerClassName}
        onMouseDown={this.onBackgroundClick}
        onTouchStart={this.onBackgroundClick}
      >
        <div
          ref={(node) => (this.divWindow = node)}
          className={windowClassName}
        >
          {this.props.children}
        </div>
        {this.renderTriangle()}
      </div>
    );
  }
}

/******************************************************************************/

import React from 'react';
import props from './props';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

export default class FullScreen extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onBackgroundClick = this.onBackgroundClick.bind(this);
  }

  onBackgroundClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  /******************************************************************************/

  render() {
    return (
      <div
        className={this.styles.classNames.fullScreen}
        onMouseDown={this.onBackgroundClick}
        onTouchStart={this.onBackgroundClick}
      >
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(FullScreen, props, null, false);
